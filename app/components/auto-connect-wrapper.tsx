"use client";

import { ReactNode, useEffect, useState, createContext, useContext, useRef } from "react";
import { useAccount, useConnect } from "wagmi";
import { sdk } from '@farcaster/miniapp-sdk';
import { Loading } from "./loading";

interface FarcasterContextType {
  fid: number | null;
  isInMiniApp: boolean;
}

const FarcasterContext = createContext<FarcasterContextType>({
  fid: null,
  isInMiniApp: false,
});

export const useFarcaster = () => useContext(FarcasterContext);

interface AutoConnectWrapperProps {
  children: ReactNode;
}

export function AutoConnectWrapper({ children }: AutoConnectWrapperProps) {
  const { isConnected, isConnecting } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const [isInMiniApp, setIsInMiniApp] = useState(false);
  const [fid, setFid] = useState<number | null>(null);
  const autoConnectAttempted = useRef(false);

  useEffect(() => {
    let mounted = true;

    const attemptAutoConnect = async () => {
      // Prevent multiple attempts
      if (autoConnectAttempted.current || isConnected) {
        return;
      }

      try {
        // Check if we're in a Farcaster mini app
        const inFarcasterMiniApp = await sdk.isInMiniApp();
        
        if (inFarcasterMiniApp && mounted) {
          setIsInMiniApp(true);
          
          // Get Farcaster context and FID
          try {
            const context = await sdk.context;
            if (context?.user?.fid && mounted) {
              setFid(context.user.fid);
            }
          } catch (error) {
            console.warn('Failed to get Farcaster context:', error);
          }

          // Attempt to connect with Farcaster connector
          // Note: baseAccount connector auto-connects automatically in Base App,
          // so we only need to handle Farcaster mini app here
          if (!isConnected && !autoConnectAttempted.current && mounted) {
            autoConnectAttempted.current = true;
            const farcasterConnector = connectors.find(
              c => c.type === 'farcasterMiniApp' || c.id === 'farcasterMiniApp'
            );
            
            if (farcasterConnector) {
              try {
                await connectAsync({ connector: farcasterConnector });
              } catch (error) {
                console.error('Farcaster auto-connect failed:', error);
                // Reset attempt flag on failure so user can manually retry
                autoConnectAttempted.current = false;
              }
            }
          }
        } else if (mounted) {
          setIsInMiniApp(false);
          // baseAccount connector handles auto-connection automatically in Base App
          // No manual intervention needed
        }
      } catch (error) {
        console.warn('Auto-connect check failed:', error);
        if (mounted) {
          setIsInMiniApp(false);
        }
      }
    };

    attemptAutoConnect();

    return () => {
      mounted = false;
    };
  }, [isConnected, connectAsync, connectors]);

  // Reset attempt flag when connection state changes
  useEffect(() => {
    if (isConnected) {
      autoConnectAttempted.current = false;
    }
  }, [isConnected]);

  if ((isInMiniApp || isConnecting) && isConnecting) {
    return (
      <Loading 
        fullScreen 
        title="Connecting Wallet..." 
        message="Auto-connecting to your wallet in the Mini App" 
      />
    );
  }

  return (
    <FarcasterContext.Provider value={{ fid, isInMiniApp }}>
      {children}
    </FarcasterContext.Provider>
  );
}

