import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { components } from "./_generated/api";
import { DataModel } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { betterAuth } from "better-auth";
import { siwe } from "better-auth/plugins";
import { createPublicClient, http } from 'viem';
import { base } from "viem/chains";
import authSchema from "./betterAuth/schema";

const publicClient = createPublicClient({
  chain: base,
  transport: http()
});

const siteUrl = process.env.SITE_URL || "http://localhost:3000";

export const authComponent = createClient<DataModel, typeof authSchema>(
  components.betterAuth,
  {
    local: {
      schema: authSchema,
    },
  }
);

export const createAuth = (
  ctx: GenericCtx<DataModel>,
  { optionsOnly } = { optionsOnly: false },
) => {
  return betterAuth({
    logger: {
      disabled: optionsOnly,
    },
    baseURL: siteUrl,
    trustedOrigins: [
      "http://localhost:3000",
      ...(process.env.SITE_URL ? [process.env.SITE_URL] : [])
    ],
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: false,
    },
    plugins: [
      convex(),
      siwe({
        domain: process.env.SITE_URL ? new URL(process.env.SITE_URL).hostname : "localhost:3000",
        anonymous: true,
        getNonce: async () => {
          return crypto.randomUUID().replace(/-/g, '');
        },
        verifyMessage: async ({ message, signature, address }) => {
          return await publicClient.verifyMessage({
            address: address as `0x${string}`,
            message,
            signature: signature as `0x${string}`,
          });
        },
      }),
    ],
  });
};

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return authComponent.getAuthUser(ctx);
  },
});
