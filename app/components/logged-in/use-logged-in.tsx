import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";

export const useLoggedIn = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [copied, setCopied] = useState(false);
  const [copiedUserId, setCopiedUserId] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const walletAddress = address || '';
  const createCopyHandler = (text: string, setCopied: (v: boolean) => void) => async () => {
    if (text) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  const handleCopyAddress = createCopyHandler(walletAddress, setCopied);
  const handleCopyUserId = createCopyHandler(walletAddress, setCopiedUserId);

  return {
    copied,
    copiedUserId,
    activeTab,
    setActiveTab,
    handleSignOut: disconnect,
    walletAddress,
    handleCopyAddress,
    handleCopyUserId,
    userId: walletAddress,
  };
};
