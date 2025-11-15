"use client";

import { createConfig, http, WagmiProvider } from "wagmi";
import { base } from "wagmi/chains";
import { baseAccount, injected } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { farcasterMiniApp } from "@farcaster/miniapp-wagmi-connector";
import { APP_METADATA } from "../lib/utils";
import { useMemo, useState } from "react";

export function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 60 * 1000, retry: 1 } } }));
  const config = useMemo(() => createConfig({
    chains: [base],
    transports: { [base.id]: http('https://mainnet.base.org', { retryCount: 3, retryDelay: 1000 }) },
    connectors: [farcasterMiniApp(), baseAccount({ appName: APP_METADATA.title, appLogoUrl: APP_METADATA.splash.imageUrl }), injected()],
    ssr: true,
  }), []);
  return <WagmiProvider config={config}><QueryClientProvider client={queryClient}>{children}</QueryClientProvider></WagmiProvider>;
}
