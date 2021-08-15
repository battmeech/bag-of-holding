import { logger, UserResolvers } from '../shared';

export const userCampaigns: UserResolvers['campaigns'] = async (
  { id },
  _,
  { prisma },
) => {
  const campaigns = await prisma.campaign.findMany({
    where: { users: { some: { id } } },
  });

  logger.info(`Listing all campaigns for user ${id}`);

  return campaigns.map((campaign) => ({ ...campaign, __typename: 'Campaign' }));
};
