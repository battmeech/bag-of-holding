import { requireLogin } from "shared";

export { SignUp as default } from "signUp";
export const getServerSideProps = requireLogin();
