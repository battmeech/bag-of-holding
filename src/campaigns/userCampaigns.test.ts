import { userCampaigns } from './userCampaigns';

const findMany = jest.fn();

const prisma = {
  campaign: {
    findMany,
  },
} as any;

const resolveInfo: any = {};

describe('userCampaigns', () => {
  it('calls find many with correct values', async () => {
    findMany.mockResolvedValueOnce([]);

    await userCampaigns!({ id: 'user-id' } as any, {}, { prisma }, resolveInfo);

    expect(findMany).toHaveBeenCalledWith({
      where: { users: { some: { id: 'user-id' } } },
    });
  });

  it('returns a list of campaigns', async () => {
    findMany.mockResolvedValueOnce([{ name: 'name' }, { name: 'name2' }]);

    const result = await userCampaigns!(
      { id: 'user-id' } as any,
      {},
      { prisma },
      resolveInfo,
    );

    expect(result).toStrictEqual([
      { __typename: 'Campaign', name: 'name' },
      { __typename: 'Campaign', name: 'name2' },
    ]);
  });
});
