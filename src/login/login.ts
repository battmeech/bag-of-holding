import { MutationResolvers } from '../shared';

export const login: MutationResolvers['login'] = async (
  _,
  { input },
  { prisma },
) => {
  const user = await prisma.user.upsert({
    where: {
      email: input.email,
    },
    create: {
      email: input.email,
      lastLogin: new Date(),
    },
    update: {
      lastLogin: new Date(),
    },
  });
  return {
    ...user,
    __typename: 'User',
  };
};
