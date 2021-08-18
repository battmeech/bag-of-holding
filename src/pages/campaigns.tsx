import { requireLogin } from "shared";

export { Campaigns as default } from "../campaigns";

export const getServerSideProps = requireLogin();
