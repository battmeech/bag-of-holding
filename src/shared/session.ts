import {
  getSession as nextGetSession,
  GetSessionOptions,
  useSession as useNextSession,
} from "next-auth/client";

export const getSession = async (options?: GetSessionOptions | undefined) => {
  if (process.env.NEXT_PUBLIC_SKIP_SESSION) {
    return {
      user: {
        email: "test@test.com",
        image: "https://avatars.githubusercontent.com/u/38220395?v=4",
        name: "Test User",
      },
      userId: "ac218e46-2a83-42ee-84bb-c35516edc485",
      expires: "1000000000000000",
    };
  }

  const session = await nextGetSession(options);
  const userId = (session?.userId as string) || "";

  return { ...session, userId };
};

export const useSession = () => {
  const [session, loading] = useNextSession();

  if (process.env.NEXT_PUBLIC_SKIP_SESSION) {
    const dummySession = {
      user: {
        email: "test@test.com",
        image: "https://avatars.githubusercontent.com/u/38220395?v=4",
        name: "Test User",
      },
    };

    return { loading: false, session: dummySession };
  }

  return { session, loading };
};
