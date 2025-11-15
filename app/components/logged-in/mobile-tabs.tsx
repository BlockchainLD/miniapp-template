import { Home, Settings, Github } from "iconoir-react";
import { APP_METADATA } from "../../lib/utils";
import { TabButton } from "./tab-button";

interface MobileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const iconClass = (active: boolean) => `transition-all duration-200 ${active ? "text-black" : "text-gray-400"}`;
const iconSize = { width: 24, height: 24 };
const tabs = [
  { id: "home" as const, label: "Home", icon: Home, strokeWidth: (active: boolean) => active ? 2.5 : 1.5 },
  { id: "settings" as const, label: "Settings", icon: Settings, strokeWidth: (active: boolean) => active ? 2 : 1.5 },
];

export const MobileTabs = ({ activeTab, onTabChange }: MobileTabsProps) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
    <div className="flex px-2 pt-2 pb-3">
      {tabs.map(({ id, label, icon: Icon, strokeWidth }) => (
        <TabButton key={id} active={activeTab === id} onClick={() => onTabChange(id)} icon={<Icon {...iconSize} className={iconClass(activeTab === id)} strokeWidth={strokeWidth(activeTab === id)} />} label={label} />
      ))}
      <TabButton active={false} onClick={() => {}} icon={<Github {...iconSize} className="transition-all duration-200" strokeWidth={1.5} />} label="GitHub" href={APP_METADATA.links.github} />
    </div>
  </div>
);
