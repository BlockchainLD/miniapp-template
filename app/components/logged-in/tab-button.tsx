import { Typography } from "@worldcoin/mini-apps-ui-kit-react";
import { ReactNode } from "react";

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
  href?: string;
}

export const TabButton = ({ active, onClick, icon, label, href }: TabButtonProps) => {
  const transition = "transition-all duration-200";
  const colorClass = active ? "text-black" : "text-gray-400";
  const className = `flex-1 flex flex-col items-center justify-center py-3 ${transition} ${colorClass}`;
  const content = <>{icon}<Typography variant="label" className={`mt-1 font-medium text-xs ${transition} ${colorClass}`}>{label}</Typography></>;
  return href ? <a href={href} target="_blank" rel="noopener noreferrer" className={`${className} hover:text-black`}>{content}</a> : <button onClick={onClick} className={className}>{content}</button>;
};
