import { privateProcedure, router } from "@server/trpc";
import { prisma } from "@server/prisma";
import { z } from "zod";

export const quest = router({
  create: privateProcedure
    .input(
      z.object({
        campaignId: z.string(),
        questName: z.string(),
        notes: z.string().optional(),
        source: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = await prisma.quest.create({
        data: {
          name: input.questName,
          campaignId: input.campaignId,
          notes: input.notes,
          source: input.source,
        },
      });

      await prisma.campaignLog.create({
        data: {
          changeType: "ADD_QUEST",
          changeDescription: input.questName,
          user: { connect: { id: ctx.userId } },
          campaign: { connect: { id: input.campaignId } },
        },
      });

      return id;
    }),
  delete: privateProcedure
    .input(z.object({ campaignId: z.string(), questId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const quest = await prisma.quest.findUnique({
        where: {
          id: input.questId,
          campaign: {
            id: input.campaignId,
            users: { some: { id: ctx.userId } },
          },
        },
      });

      if (!quest) return;

      await prisma.quest.delete({
        where: { id: input.questId, campaignId: input.campaignId },
      });

      await prisma.campaignLog.create({
        data: {
          changeType: "REMOVE_QUEST",
          changeDescription: quest.name,
          user: { connect: { id: ctx.userId } },
          campaign: { connect: { id: input.campaignId } },
        },
      });

      return quest.id;
    }),
  update: privateProcedure
    .input(
      z.object({
        itemId: z.string(),
        questName: z.string().optional(),
        status: z.enum(["ACTIVE", "COMPLETE", "FAILED"]).optional(),
        notes: z.string().optional(),
        source: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, name, campaignId } = await prisma.quest.update({
        data: {
          name: input.questName,
          notes: input.notes,
          source: input.source,
          status: input.status,
        },
        where: {
          id: input.itemId,
          campaign: { users: { some: { id: ctx.userId } } },
        },
      });

      await prisma.campaignLog.create({
        data: {
          changeType: "ALTER_QUEST",
          changeDescription: name,
          user: { connect: { id: ctx.userId } },
          campaign: { connect: { id: campaignId } },
        },
      });

      return id;
    }),
});
