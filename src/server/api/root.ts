import { createTRPCRouter } from "~/server/api/trpc";
import { authRouter } from "~/server/api/routers/auth/auth.router";
import { reviewerRouter } from "./routers/reviewer/reviewer.router";
import { eventRouter } from "./routers/event/event.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  reviewer: reviewerRouter,
  event: eventRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
