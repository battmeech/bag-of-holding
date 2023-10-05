import { withAuth } from "next-auth/middleware";

// middleware is applied to all routes, use conditionals to select

export default withAuth(function middleware() {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      if (
        (req.nextUrl.pathname.startsWith("/campaigns") ||
          req.nextUrl.pathname.startsWith("/profile")) &&
        token === null
      ) {
        return false;
      }
      return true;
    },
  },
});
