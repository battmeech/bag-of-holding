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
    .mutation(async ({ input }) => {
      const { id } = await prisma.item.create({
        data: {
          name: input.itemName,
          campaignId: input.campaignId,
          quantity: input.quantity || 0,
          tags: input.tags || [],
          description: input.description,
        },
      });
      return id;
    }),
  delete: privateProcedure
    .input(z.object({ campaignId: z.string(), itemId: z.string() }))
    .mutation(async ({ input }) => {
      await prisma.item.delete({
        where: { id: input.itemId, campaignId: input.campaignId },
      });
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
    .mutation(async ({ input }) => {
      const { id } = await prisma.item.update({
        data: {
          name: input.itemName,
          notes: input.notes,
          quantity: input.quantity,
          tags: input.tags,
          description: input.description,
        },
        where: { id: input.itemId },
      });
      return id;
    }),
});
