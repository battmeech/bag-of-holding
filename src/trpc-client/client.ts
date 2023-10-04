import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "@server/router";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export const trpc = createTRPCReact<AppRouter>({});

export type Inputs = inferRouterInputs<AppRouter>;
export type Outputs = inferRouterOutputs<AppRouter>;
