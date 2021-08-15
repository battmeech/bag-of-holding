import { createProxyMiddleware } from "http-proxy-middleware";
import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import { graphUrl } from "./config";

export const graphqlProxy: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  const userId = (session?.userId as string) || "";

  const apiProxy: any = createProxyMiddleware({
    headers: { "bag-user-id": userId },
    target: graphUrl,
    changeOrigin: true,
    pathRewrite: { [`^/api/proxy`]: "" },
    secure: true,
  });

  apiProxy(req, res);
};
