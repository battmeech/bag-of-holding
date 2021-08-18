import { requireLogin } from "shared";

export { Profile as default } from "profile/Profile";

export const getServerSideProps = requireLogin((_, session) => {
  return {
    props: {
      session,
    },
  };
});
