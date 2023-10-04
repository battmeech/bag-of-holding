import { z } from "zod";
import { router, publicProcedure } from "@server/trpc";
import { campaign } from "@server/routes/campaign";
export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  campaign,
});

export type AppRouter = typeof appRouter;
