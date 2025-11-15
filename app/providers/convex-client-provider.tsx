"use client";

import { ReactNode, useEffect } from "react";
import { ConvexReactClient } from "convex/react";
import { authClient } from "../lib/auth-client"; 
import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react"; 
import { sdk } from '@farcaster/miniapp-sdk';

// Initialize Convex client
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = convexUrl && !convexUrl.includes('placeholder')
  ? new ConvexReactClient(convexUrl)
  : new ConvexReactClient('https://mock.convex.dev');

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    (async () => {
      try {
        if (await sdk.isInMiniApp()) await sdk.actions.ready({ disableNativeGestures: true });
      } catch (error) {
        console.error('Error initializing mini app:', error);
      }
    })();
  }, []);
  return <ConvexBetterAuthProvider client={convex} authClient={authClient}>{children}</ConvexBetterAuthProvider>;
}
