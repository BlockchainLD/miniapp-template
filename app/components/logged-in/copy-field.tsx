import { Copy, CheckCircle } from "iconoir-react";
import { Typography } from "@worldcoin/mini-apps-ui-kit-react";

interface CopyFieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}

export const CopyField = ({ icon, label, value, copied, onCopy }: CopyFieldProps) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-3 flex-1 min-w-0">
      {icon}
      <div className="flex-1 min-w-0">
        <Typography variant="label" className="text-black">{label}</Typography>
        <div className="overflow-x-scroll scrollbar-hide">
          <Typography variant="body" className="text-gray-600 whitespace-nowrap">{value || 'Loading...'}</Typography>
        </div>
      </div>
    </div>
    <button onClick={onCopy} className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
      {copied ? <CheckCircle width={16} height={16} /> : <Copy width={16} height={16} />}
    </button>
  </div>
);