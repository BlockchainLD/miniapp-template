import { TopBar } from "@worldcoin/mini-apps-ui-kit-react";
import { PoweredByBase } from "../powered-by-base";
import { useIsMobile } from "../../hooks/use-is-mobile";
import { HomeContent } from "./home-content";
import { SettingsContent } from "./settings-content";
import { MobileTabs } from "./mobile-tabs";
import { CopyNotification } from "./copy-notification";
import { useLoggedIn } from "./use-logged-in";
import { APP_METADATA } from "../../lib/utils";

const settingsProps = (props: ReturnType<typeof useLoggedIn>) => ({
  walletAddress: props.walletAddress,
  copied: props.copied,
  onCopyAddress: props.handleCopyAddress,
  onSignOut: props.handleSignOut,
  userId: props.userId,
  copiedUserId: props.copiedUserId,
  onCopyUserId: props.handleCopyUserId,
});

export const LoggedIn = () => {
  const loggedIn = useLoggedIn();
  const isMobile = useIsMobile();
  const content = isMobile ? (
    <div className="w-full">{loggedIn.activeTab === "home" && <HomeContent />}{loggedIn.activeTab === "settings" && <SettingsContent {...settingsProps(loggedIn)} />}</div>
  ) : <SettingsContent {...settingsProps(loggedIn)} />;

  return (
    <>
      <div className={isMobile ? "bg-white min-h-screen mb-20 flex flex-col" : "bg-white rounded-3xl shadow-2xl overflow-hidden"}>
        <TopBar title={APP_METADATA.title} className="[&_*]:text-black" />
        <div className="px-6 pt-0.5 pb-3"><PoweredByBase /></div>
        <div className={isMobile ? "flex-1 flex items-center justify-center px-6 pb-24" : "p-6 pt-4"}>{content}</div>
      </div>
      {isMobile && <MobileTabs activeTab={loggedIn.activeTab} onTabChange={loggedIn.setActiveTab} />}
      <CopyNotification show={loggedIn.copied || loggedIn.copiedUserId} isMobile={isMobile} message={loggedIn.copiedUserId ? "User ID copied to clipboard" : "Wallet address copied to clipboard"} />
    </>
  );
};
