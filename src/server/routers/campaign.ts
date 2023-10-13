import { privateProcedure, router } from "@server/trpc";
import { prisma } from "@server/prisma";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const campaign = router({
  list: privateProcedure.query(async ({ ctx }) => {
    const campaigns = await prisma.campaign.findMany({
      where: { users: { some: { id: ctx.userId } } },
      include: { users: true, items: true, quests: true },
    });

    return campaigns.map((campaign) => ({
      id: campaign.id,
      name: campaign.name,
      numberOfUsers: campaign.users.length,
      numberOfItems: campaign.items.length,
      numberOfQuests: campaign.quests.length,
    }));
  }),
  getById: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const campaign = await prisma.campaign.findUnique({
        where: { id: input.id, users: { some: { id: ctx.userId } } },
        include: { users: true, items: true, quests: true },
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
      const { id: campaignId } = await prisma.campaign.create({
        data: { name: input.name, users: { connect: { id: ctx.userId } } },
      });

      await prisma.campaignLog.create({
        data: {
          changeType: "CAMPAIGN_CREATE",
          user: { connect: { id: ctx.userId } },
          changeDescription: input.name,
          campaign: { connect: { id: campaignId } },
        },
      });

      return campaignId;
    }),
  join: privateProcedure
    .input(z.object({ campaignId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const campaign = await prisma.campaign.findUnique({
        where: { id: input.campaignId },
        include: { users: true },
      });

      if (!campaign) {
        throw new TRPCError({
          message: "Campaign not found",
          code: "NOT_FOUND",
        });
      }

      if (campaign.users.some((user) => user.id === ctx.userId)) {
        return campaign;
      }

      const updatedCampaign = await prisma.campaign.update({
        where: { id: input.campaignId },
        data: { users: { connect: { id: ctx.userId } } },
      });

      await prisma.campaignLog.create({
        data: {
          changeType: "JOIN_CAMPAIGN",
          user: { connect: { id: ctx.userId } },
          changeDescription: campaign.name,
          campaign: { connect: { id: input.campaignId } },
        },
      });

      return updatedCampaign;
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
    .mutation(async ({ input, ctx }) => {
      let data: any;

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

      const campaign = prisma.campaign.update({
        where: { id: input.campaignId },
        data,
      });

      const changeDescription = Object.keys(data)
        .reduce((acc, key) => {
          const value = data[key].increment || data[key].decrement;
          if (!value) return acc;

          return `${acc}${value} ${key} `;
        }, "")
        .trim();

      await prisma.campaignLog.create({
        data: {
          changeType:
            input.modification === "add" ? "ADD_CURRENCY" : "DEDUCT_CURRENCY",
          user: { connect: { id: ctx.userId } },
          changeDescription,
          campaign: { connect: { id: input.campaignId } },
        },
      });

      return campaign;
    }),
});
