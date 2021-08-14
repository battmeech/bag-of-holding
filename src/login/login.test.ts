import { login } from './login';

const findUnique = jest.fn();
const create = jest.fn();

const prisma = {
  user: {
    findUnique,
    create,
  },
} as any;

const resolveInfo: any = {};

describe('login', () => {
  it('searches for existing user & campaigns by email', async () => {
    findUnique.mockResolvedValueOnce({
      email: 'a@b.com',
      campaigns: [],
    });

    await login!(
      {},
      {
        input: {
          email: 'a@b.com',
        },
      },
      { prisma },
      resolveInfo,
    );

    expect(findUnique).toHaveBeenCalledWith({
      where: { email: 'a@b.com' },
      include: { campaigns: true },
    });
  });

  it('creates a user if none exists', async () => {
    findUnique.mockResolvedValueOnce(null);
    create.mockResolvedValueOnce({
      email: 'a@b.com',
      campaigns: [],
    });
    await login!(
      {},
      {
        input: {
          email: 'a@b.com',
        },
      },
      { prisma },
      resolveInfo,
    );

    expect(create).toHaveBeenCalledWith({
      data: { email: 'a@b.com' },
      include: { campaigns: true },
    });
  });
});
