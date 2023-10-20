import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import {} from "react";
import { PACKAGE_ID } from "../../constants";

// React hook to fetch CounterNFT owned by connected wallet
// This hook is to demonstrate how to use `@mysten/dapp-kit` React hook to query data
// besides using SuiClient directly
export function useFetchCounterNft() {
  const account = useCurrentAccount();

  if (!account) {
    return { data: [] };
  }

  // Fetch CounterNFT owned by current connected wallet
  // Only fetch the 1st one
  const { data, isLoading, isError, error, refetch } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account.address,
      limit: 1,
      filter: {
        MatchAll: [
          {
            StructType: `${PACKAGE_ID}::counter_nft::Counter`,
          },
          {
            AddressOwner: account.address,
          },
        ],
      },
      options: {
        showOwner: true,
        showType: true,
      },
    },
    { queryKey: ["CounterNFT"] },
  );

  return {
    data: data && data.data.length > 0 ? data?.data : [],
    isLoading,
    isError,
    error,
    refetch,
  };
}
