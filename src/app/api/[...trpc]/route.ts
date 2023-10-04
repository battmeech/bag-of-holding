import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@server/router";
import { getServerSession } from "next-auth";
import { authOptions } from "@app-auth/next-auth";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async () => {
      const session = await getServerSession(authOptions);

      if (session && session.user) {
        return { userId: (session.user as any).sub };
      }

      return { userId: null };
    },
  });

export { handler as GET, handler as POST };
