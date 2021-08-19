import { requireLogin } from "shared";

export { SignUp as default } from "signup";
export const getServerSideProps = requireLogin();
