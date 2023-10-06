import { router } from "@server/trpc";
import { campaign } from "@server/routers/campaign";
import { item } from "@server/routers/item";
import { campaignLogs } from "@server/routers/campaign-logs";

export const appRouter = router({
  campaign,
  item,
  campaignLogs,
});

export type AppRouter = typeof appRouter;
