"use client";
import { http } from "viem";
import { BiconomyProvider } from "@biconomy/use-aa";
import { mantle } from "viem/chains";
import { WagmiProvider, createConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: { children: React.ReactNode }) {
  const biconomyPaymasterApiKey =
    process.env.NEXT_PUBLIC_PAYMASTER_API_KEY ||
    "rFvBQsfza.4ffbe2ab-b78f-4711-8dbb-b6736fdecf57";
  const bundlerUrl =
    process.env.NEXT_PUBLIC_BUNDLER_URL ||
    "https://bundler.biconomy.io/api/v2/5000/0194855f-ce70-7a69-9e45-3a0d4b5ad6b2";

  const config = createConfig({
    chains: [mantle],
    transports: {
      [mantle.id]: http(),
    },
  });

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <BiconomyProvider
          config={{
            biconomyPaymasterApiKey,
            bundlerUrl,
          }}
          queryClient={queryClient}
        >
          {children}
        </BiconomyProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
