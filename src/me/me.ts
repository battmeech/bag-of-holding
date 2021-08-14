import { QueryResolvers } from '../shared';

export const me: QueryResolvers['me'] = async (_, { userId }, { prisma }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      campaigns: true,
    },
  });

  if (!user) {
    return {
      __typename: 'UserNotFound',
      message: `User with ID ${userId} not found`,
    };
  }

  return {
    ...user,
    campaigns: user.campaigns.map((campaign) => ({
      ...campaign,
      __typename: 'Campaign',
    })),
    __typename: 'User',
  };
};
