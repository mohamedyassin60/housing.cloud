import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const studentRouter = createTRPCRouter({
  addToInterested: publicProcedure
    .input(z.object({ 
      unitId: z.string(),
      name: z.string(),
      email: z.string()
    }))
    .mutation(({ input, ctx }) => {
      const { unitId, name, email } = input
      return ctx.prisma.student.create({
        data: {
          name,
          email,
          units: {
            connect: [{ id: unitId }]
          }
        },
      })
    })
});
