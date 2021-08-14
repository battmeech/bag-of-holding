import { MutationResolvers } from '../shared';

export const login: MutationResolvers['login'] = async (
  _,
  { input },
  { prisma },
) => {
  // Check if user already exists with that email address, return it if so
  let user = await prisma.user.findUnique({
    where: {
      email: input.email,
    },
    include: {
      campaigns: true,
    },
  });

  // Create the user with provided details and return it
  if (!user) {
    user = await prisma.user.create({
      data: input,
      include: { campaigns: true },
    });
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
