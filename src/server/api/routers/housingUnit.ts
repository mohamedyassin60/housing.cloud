import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const housingUnitRouter = createTRPCRouter({
  getAllAvailable: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.unit.findMany();
    }),
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      const { id } = input
      return ctx.prisma.unit.findUniqueOrThrow({
        where: { id } 
      })
    }),
  updateById: publicProcedure
    .input(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      price: z.number(),
      bedrooms: z.number(),
      distanceToCampus: z.number()
    }))
    .mutation(({ input, ctx }) => {
      const { id, name, description, price, bedrooms, distanceToCampus } = input
      return ctx.prisma.unit.update({
        where: { id },
        data: { name, description, price, bedrooms, distanceToCampus }
      })
    }),
  deleteById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      const { id } = input
      return ctx.prisma.unit.delete({
        where: { id } 
      })
    })
});
