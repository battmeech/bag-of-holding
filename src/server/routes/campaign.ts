import { privateProcedure, router } from "@server/trpc";
import { prisma } from "@server/prisma";
import { z } from "zod";

export const campaign = router({
  list: privateProcedure.query(async ({ ctx }) => {
    return prisma.campaign.findMany({
      where: { users: { some: { id: ctx.userId } } },
    });
  }),
  create: privateProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = await prisma.campaign.create({
        data: { name: input.name, users: { connect: { id: ctx.userId } } },
      });
      return id;
    }),
});
