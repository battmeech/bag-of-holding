import { me } from './me';

const findUnique = jest.fn();

const prisma = {
  user: {
    findUnique,
  },
} as any;

const resolveInfo: any = {};

describe('me', () => {
  it('calls find unique with correct values', async () => {
    await me!(
      {},
      {
        userId: 'user-id',
      },
      { prisma },
      resolveInfo,
    );

    expect(findUnique).toHaveBeenCalledWith({
      where: { id: 'user-id' },
      include: {
        campaigns: true,
      },
    });
  });

  it('returns a user', async () => {
    findUnique.mockResolvedValueOnce({ email: 'email', campaigns: [] });

    const result = await me!(
      {},
      {
        userId: 'user-id',
      },
      { prisma },
      resolveInfo,
    );

    expect(result).toStrictEqual({
      __typename: 'User',
      email: 'email',
      campaigns: [],
    });
  });

  it('returns a user not found when no user found', async () => {
    findUnique.mockResolvedValueOnce(null);

    const result = await me!(
      {},
      {
        userId: 'user-id',
      },
      { prisma },
      resolveInfo,
    );

    expect(result).toStrictEqual({
      __typename: 'UserNotFound',
      message: 'User with ID user-id not found',
    });
  });
});
