import { Typography } from "@worldcoin/mini-apps-ui-kit-react";
import { FarcasterProfile } from "../farcaster-profile";
import { APP_METADATA } from "../../lib/utils";
import { StepCard } from "./step-card";

export const HomeContent = () => (
  <div className="space-y-6">
    <FarcasterProfile />
    <Typography variant="body" className="text-gray-600">Get started with these quick steps</Typography>
    <div className="space-y-4">
      <StepCard number={1} title="Check your .env.local" description="Configure your env variables" color="blue" />
      <StepCard number={2} title="Check users on Convex" description="View your dashboard" color="green" href={APP_METADATA.links.convexDashboard} />
      <StepCard number={3} title="Go to Base docs" description="Learn more about Base" color="purple" href={APP_METADATA.links.baseDocs} />
    </div>
  </div>
);
