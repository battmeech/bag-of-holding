import { router } from "@server/trpc";
import { campaign } from "@server/routers/campaign";
import { item } from "@server/routers/item";

export const appRouter = router({
  campaign,
  item,
});

export type AppRouter = typeof appRouter;
