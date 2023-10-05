import { privateProcedure, router } from "@server/trpc";
import { prisma } from "@server/prisma";
import { z } from "zod";

export const item = router({
  create: privateProcedure
    .input(z.object({ campaignId: z.string(), itemName: z.string() }))
    .mutation(async ({ input }) => {
      const { id } = await prisma.item.create({
        data: {
          name: input.itemName,
          campaignId: input.campaignId,
          quantity: 1,
        },
      });
      return id;
    }),
});
