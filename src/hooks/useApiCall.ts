import { useQuery, QueryKey, UseQueryOptions } from "@tanstack/react-query";

export const useAPICall = <TData, TError>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">
) => {
  return useQuery<TData, TError>({
    queryKey,
    queryFn,
    ...options,
    retry: false,
  });
};