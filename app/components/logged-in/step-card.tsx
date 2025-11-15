import { Typography } from "@worldcoin/mini-apps-ui-kit-react";
import { OpenNewWindow } from "iconoir-react";

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  color: "blue" | "green" | "purple";
  href?: string;
}

const colors = {
  blue: { bg: "bg-blue-50", hover: "hover:bg-blue-100", icon: "bg-blue-500", text: "text-blue-500" },
  green: { bg: "bg-green-50", hover: "hover:bg-green-100", icon: "bg-green-500", text: "text-green-500" },
  purple: { bg: "bg-purple-50", hover: "hover:bg-purple-100", icon: "bg-purple-500", text: "text-purple-500" },
};

export const StepCard = ({ number, title, description, color, href }: StepCardProps) => {
  const c = colors[color];
  const content = (
    <div className={`${c.bg} rounded-lg p-4 space-y-3 ${href ? `${c.hover} transition-colors cursor-pointer` : ''}`}>
      <div className="flex items-start space-x-3">
        <div className={`w-6 h-6 ${c.icon} text-white rounded-full flex items-center justify-center text-sm font-bold`}>{number}</div>
        <div className={`flex-1 ${href ? 'flex items-center justify-between' : ''}`}>
          <div>
            <Typography variant="label" className="text-black">{title}</Typography>
            <Typography variant="body" className="text-gray-600">{description}</Typography>
          </div>
          {href && <OpenNewWindow width={16} height={16} className={c.text} />}
        </div>
      </div>
    </div>
  );
  return href ? <a href={href} target="_blank" rel="noopener noreferrer" className="block">{content}</a> : content;
};
