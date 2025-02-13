"use client";
import { http } from "viem";
import { BiconomyProvider } from "@biconomy/use-aa";
import { polygonAmoy } from "viem/chains";
import { WagmiProvider, createConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: { children: React.ReactNode }) {
  const biconomyPaymasterApiKey =
    process.env.NEXT_PUBLIC_PAYMASTER_API_KEY || "";
  const bundlerUrl = process.env.NEXT_PUBLIC_BUNDLER_URL || "";

  const config = createConfig({
    chains: [polygonAmoy],
    transports: {
      [polygonAmoy.id]: http(),
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
            // Add your signer here if you don't want to use the metamask signer
          }}
          queryClient={queryClient}
        >
          {children}
        </BiconomyProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
