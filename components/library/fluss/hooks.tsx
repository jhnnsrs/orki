import { useFluss } from "@/components/arkitekt";
import {
  LazyQueryHookOptions,
  MutationHookOptions,
  QueryHookOptions,
  SubscriptionHookOptions,
  useLazyQuery as useApolloLazyQuery,
  useMutation as useApolloMutation,
  useQuery as useApolloQuery,
  useSubscription as useApolloSubscription,
} from "@apollo/client";

type MutationFuncType = typeof useApolloMutation;
type QueryFuncType = typeof useApolloQuery;
type LazyQueryFuncType = typeof useApolloLazyQuery;
type SubscriptionFuncType = typeof useApolloSubscription;

export type {
  LazyQueryHookOptions,
  MutationHookOptions,
  QueryHookOptions,
  SubscriptionHookOptions,
};

export const useMutation: MutationFuncType = (doc, options) => {
  const fluss = useFluss();

  return useApolloMutation(doc, { ...options, client: fluss });
};

export const useQuery: QueryFuncType = (doc, options) => {
  const fluss = useFluss();

  return useApolloQuery(doc, { ...options, client: fluss });
};

export const useSubscription: SubscriptionFuncType = (doc, options) => {
  const fluss = useFluss();

  return useApolloSubscription(doc, { ...options, client: fluss });
};

export const useLazyQuery: LazyQueryFuncType = (doc, options) => {
  const fluss = useFluss();

  return useApolloLazyQuery(doc, { ...options, client: fluss });
};
