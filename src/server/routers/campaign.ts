import { privateProcedure, router } from "@server/trpc";
import { prisma } from "@server/prisma";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const campaign = router({
  list: privateProcedure.query(async ({ ctx }) => {
    const campaigns = await prisma.campaign.findMany({
      where: { users: { some: { id: ctx.userId } } },
      include: { users: true, items: true },
    });

    return campaigns.map((campaign) => ({
      id: campaign.id,
      name: campaign.name,
      numberOfUsers: campaign.users.length,
      numberOfItems: campaign.items.length,
    }));
  }),
  getById: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const campaign = await prisma.campaign.findUnique({
        where: { id: input.id, users: { some: { id: ctx.userId } } },
        include: { users: true, items: true },
      });

      if (!campaign) {
        throw new TRPCError({
          message: "Campaign not found",
          code: "NOT_FOUND",
        });
      }

      return {
        ...campaign,
        users: campaign.users.map((user) => ({
          id: user.id,
          image: user.image,
          name: user.name,
        })),
      };
    }),
  create: privateProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = await prisma.campaign.create({
        data: { name: input.name, users: { connect: { id: ctx.userId } } },
      });
      return id;
    }),
  join: privateProcedure
    .input(z.object({ campaignId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const campaign = await prisma.campaign.update({
        where: { id: input.campaignId },
        data: { users: { connect: { id: ctx.userId } } },
      });
      return campaign;
    }),
  alterMoney: privateProcedure
    .input(
      z.object({
        campaignId: z.string(),
        modification: z.enum(["add", "deduct"]),
        alterations: z.object({
          copper: z.number(),
          platinum: z.number(),
          electrum: z.number(),
          gold: z.number(),
          silver: z.number(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      let data = {};

      if (input.modification === "add") {
        data = {
          platinum: { increment: input.alterations.platinum },
          gold: { increment: input.alterations.gold },
          electrum: { increment: input.alterations.electrum },
          silver: { increment: input.alterations.silver },
          copper: { increment: input.alterations.copper },
        };
      } else {
        data = {
          platinum: { decrement: input.alterations.platinum },
          gold: { decrement: input.alterations.gold },
          electrum: { decrement: input.alterations.electrum },
          silver: { decrement: input.alterations.silver },
          copper: { decrement: input.alterations.copper },
        };
      }

      return prisma.campaign.update({
        where: { id: input.campaignId },
        data,
      });
    }),
});
