import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Twitch from "next-auth/providers/twitch";
import Discord from "next-auth/providers/discord";

export const getAppProviders = () =>
  [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Twitch({
      clientId: process.env.TWITCH_CLIENT_ID!,
      clientSecret: process.env.TWITCH_CLIENT_SECRET!,
    }),
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ].filter(
    (provider) =>
      provider.options?.clientId !== undefined &&
      provider.options?.clientSecret !== undefined
  );
