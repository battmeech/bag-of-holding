import { privateProcedure, router } from "@server/trpc";
import { prisma } from "@server/prisma";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const campaignLogs = router({
  list: privateProcedure
    .input(z.object({ campaignId: z.string() }))
    .query(async ({ ctx, input }) => {
      const campaign = await prisma.campaign.findUnique({
        where: { id: input.campaignId, users: { some: { id: ctx.userId } } },
      });

      if (!campaign)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Campaign not found",
        });

      const logs = await prisma.campaignLog.findMany({
        where: {
          campaignId: input.campaignId,
        },
        include: { campaign: true, user: true },
        take: 20,
        orderBy: { createdAt: "desc" },
      });

      return logs.map((log) => ({
        id: log.id,
        change: log.changeType,
        description: log.changeDescription,
        user: {
          name: log.user.name,
          image: log.user.image,
        },
        date: log.createdAt,
      }));
    }),
});
