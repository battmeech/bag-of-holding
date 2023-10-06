import { privateProcedure, router } from "@server/trpc";
import { prisma } from "@server/prisma";
import { z } from "zod";

export const item = router({
  create: privateProcedure
    .input(
      z.object({
        campaignId: z.string(),
        itemName: z.string(),
        quantity: z.number().optional(),
        tags: z.array(z.string()).optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = await prisma.item.create({
        data: {
          name: input.itemName,
          campaignId: input.campaignId,
          quantity: input.quantity || 0,
          tags: input.tags || [],
          description: input.description,
        },
      });

      await prisma.campaignLog.create({
        data: {
          changeType: "ADD_ITEM",
          changeDescription: input.itemName,
          user: { connect: { id: ctx.userId } },
          campaign: { connect: { id: input.campaignId } },
        },
      });

      return id;
    }),
  delete: privateProcedure
    .input(z.object({ campaignId: z.string(), itemId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const item = await prisma.item.findUnique({
        where: { id: input.itemId },
      });

      if (!item) return;

      await prisma.item.delete({
        where: { id: input.itemId, campaignId: input.campaignId },
      });

      await prisma.campaignLog.create({
        data: {
          changeType: "REMOVE_ITEM",
          changeDescription: item.name,
          user: { connect: { id: ctx.userId } },
          campaign: { connect: { id: input.campaignId } },
        },
      });

      return item.id;
    }),
  update: privateProcedure
    .input(
      z.object({
        itemId: z.string(),
        itemName: z.string().optional(),
        quantity: z.number().optional(),
        tags: z.array(z.string()).optional(),
        description: z.string().optional(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, name, campaignId } = await prisma.item.update({
        data: {
          name: input.itemName,
          notes: input.notes,
          quantity: input.quantity,
          tags: input.tags,
          description: input.description,
        },
        where: { id: input.itemId },
      });

      await prisma.campaignLog.create({
        data: {
          changeType: "ALTER_ITEM",
          changeDescription: name,
          user: { connect: { id: ctx.userId } },
          campaign: { connect: { id: campaignId } },
        },
      });

      return id;
    }),
});
