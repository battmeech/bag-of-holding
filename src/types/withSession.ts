export type WithSession = {
  session: {
    user: {
      email: string;
      image: string;
      name: string;
    };
  };
};

export type WithMaybeSession = {
  session?: {
    user: {
      email: string;
      image: string;
      name: string;
    };
  };
};
