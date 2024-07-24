import * as Crypto from "expo-crypto";
import { Buffer } from "buffer";

interface StringMap {
  [key: string]: string;
}
function toQueryString(params: StringMap): string {
  return (
    "?" +
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&")
  );
}

function URLEncode(str: string): string {
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

async function sha256(buffer: string): Promise<string> {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    buffer,
    { encoding: Crypto.CryptoEncoding.BASE64 }
  );
}

/** Generate a PKCE challenge pair
 * @param length Length of the verifer (between 43-128). Defaults to 43.
 * @returns PKCE challenge pair
 */
export async function createPKCECodes(length?: number) {
  if (!length) length = 43;

  if (length < 43 || length > 128) {
    throw `Expected a length between 43 and 128. Received ${length}.`;
  }

  const randomBytes = await Crypto.getRandomBytesAsync(32);
  const base64String = Buffer.from(randomBytes).toString("base64");
  const code_verifier = URLEncode(base64String);
  const code_challenge = URLEncode(await sha256(code_verifier));
  const createdAt = new Date();
  const codePair = {
    codeVerifier: code_verifier,
    codeChallenge: code_challenge,
    createdAt,
  };
  return codePair;
}
