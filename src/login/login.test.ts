import { login } from './login';

const upsert = jest.fn();

const prisma = {
  user: {
    upsert,
  },
} as any;

const resolveInfo: any = {};

describe('login', () => {
  it('creates or updates user record', async () => {
    upsert.mockResolvedValueOnce({
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

    expect(upsert).toHaveBeenCalledWith({
      where: {
        email: 'a@b.com',
      },
      create: {
        email: 'a@b.com',
        lastLogin: expect.any(Date),
      },
      update: {
        lastLogin: expect.any(Date),
      },
    });
  });
});
