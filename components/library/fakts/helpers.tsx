export interface ClearableSignal extends AbortSignal {
  clear: () => void;
}

/**
 * Takes an array of AbortSignals and returns a single signal.
 * If any signals are aborted, the returned signal will be aborted.
 */
export function anySignal(
  signals: Array<AbortSignal | undefined | null>
): ClearableSignal {
  const controller = new globalThis.AbortController();

  function onAbort(): void {
    controller.abort();

    for (const signal of signals) {
      if (signal?.removeEventListener != null) {
        signal.removeEventListener("abort", onAbort);
      }
    }
  }

  for (const signal of signals) {
    if (signal?.aborted === true) {
      onAbort();
      break;
    }

    if (signal?.addEventListener != null) {
      signal.addEventListener("abort", onAbort);
    }
  }

  function clear(): void {
    for (const signal of signals) {
      if (signal?.removeEventListener != null) {
        signal.removeEventListener("abort", onAbort);
      }
    }
  }

  const signal = controller.signal as ClearableSignal;
  signal.clear = clear;

  return signal;
}

function mstimeout(ms: number) {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject(Error(`Timeout after ${ms}`)), ms)
  );
}

export async function awaitWithTimeout<T>(
  promise: Promise<T>,
  ms: number
): Promise<T> {
  return (await Promise.race([promise, mstimeout(ms)])) as T;
}

type ExpandedRequestInit = RequestInit & {
  timeout: number;
  controller: AbortController;
};

export async function fetchWithTimeout(
  resource: RequestInfo,
  options: ExpandedRequestInit
) {
  let id: NodeJS.Timeout | undefined = undefined;
  let timeoutController: AbortController | undefined = undefined;
  if (options?.timeout) {
    timeoutController = new AbortController();

    id = setTimeout(
      () =>
        timeoutController &&
        timeoutController.abort(new Error("Timeout Error")),
      options.timeout
    );
    options.signal = anySignal([
      options.controller.signal,
      timeoutController.signal,
    ]);
  } else {
    options.signal = options?.controller.signal;
  }

  try {
    const response = await fetch(resource, {
      ...options,
    });
    if (id) {
      clearTimeout(id);
    }
    return response;
  } catch (e) {
    if (id) {
      clearTimeout(id);
    }

    if (options.controller.signal.aborted) {
      throw new Error("User Cancelled");
    }

    if (timeoutController) {
      if (timeoutController.signal.aborted) {
        throw new Error("Timeout Error");
      }
    }

    throw e;
  }
}
