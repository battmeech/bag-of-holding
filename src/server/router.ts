import { router } from "@server/trpc";
import { campaign } from "@server/routers/campaign";
import { item } from "@server/routers/item";
import { campaignLogs } from "@server/routers/campaign-logs";
import { quest } from "@server/routers/quest";

export const appRouter = router({
  campaign,
  item,
  quest,
  campaignLogs,
});

export type AppRouter = typeof appRouter;
