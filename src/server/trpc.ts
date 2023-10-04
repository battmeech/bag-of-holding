import { initTRPC, TRPCError } from "@trpc/server";

const t = initTRPC.context<{ userId?: string }>().create({});
export const router = t.router;
export const publicProcedure = t.procedure;

export const privateProcedure = t.procedure.use((opts) => {
  if (!opts.ctx.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to do this",
    });
  }
  return opts.next({
    ctx: {
      userId: opts.ctx.userId,
    },
  });
});
