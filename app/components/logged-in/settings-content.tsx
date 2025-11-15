import { Button, Typography, Chip } from "@worldcoin/mini-apps-ui-kit-react";
import { LogOut, Wallet, Network, CreditCard, User } from "iconoir-react";
import { BasePay } from "../base-pay";
import { CopyField } from "./copy-field";

interface SettingsContentProps {
  walletAddress: string;
  copied: boolean;
  onCopyAddress: () => void;
  onSignOut: () => void;
  userId?: string;
  copiedUserId: boolean;
  onCopyUserId: () => void;
}

const icon20 = { width: 20, height: 20 };

export const SettingsContent = ({ walletAddress, copied, onCopyAddress, onSignOut, userId, copiedUserId, onCopyUserId }: SettingsContentProps) => (
  <div className="space-y-6">
    <Typography variant="subtitle" className="text-black mb-4">Wallet Details</Typography>
    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
      <CopyField icon={<Wallet {...icon20} className="text-gray-600" />} label="Wallet Address" value={walletAddress} copied={copied} onCopy={onCopyAddress} />
      <CopyField icon={<User {...icon20} className="text-gray-600" />} label="Convex User ID" value={userId || ''} copied={copiedUserId} onCopy={onCopyUserId} />
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Network {...icon20} className="text-gray-600" />
          <div>
            <Typography variant="label" className="text-black">Network</Typography>
            <Typography variant="body" className="text-gray-600">Base Mainnet</Typography>
          </div>
        </div>
        <Chip label="Chain ID: 8453" variant="important" />
      </div>
      <div className="flex items-start space-x-3">
        <CreditCard {...icon20} className="text-gray-600 mt-0.5" />
        <div className="flex-1">
          <Typography variant="label" className="text-black mb-3 block">Test Payment</Typography>
          <BasePay />
        </div>
      </div>
    </div>
    <Button variant="secondary" fullWidth onClick={onSignOut} className="!bg-red-500 !text-white hover:!bg-red-600 flex items-center justify-center space-x-2">
      <LogOut {...icon20} />
      <span>Sign Out</span>
    </Button>
  </div>
);
