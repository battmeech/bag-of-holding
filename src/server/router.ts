import { z } from "zod";
import { router, publicProcedure } from "@server/trpc";
import { campaign } from "@server/routers/campaign";
import { item } from "@server/routers/item";

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
  item,
});

export type AppRouter = typeof appRouter;
