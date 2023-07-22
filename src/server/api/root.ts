import { createTRPCRouter } from "~/server/api/trpc";
import { housingUnitRouter } from "~/server/api/routers/housingUnit";
import { studentRouter } from "~/server/api/routers/student";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  housingUnit: housingUnitRouter,
  studentRouter: studentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
