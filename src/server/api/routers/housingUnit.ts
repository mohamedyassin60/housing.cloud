import { z } from "zod";
import { filtersSchema } from "~/components/filters";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const housingUnitRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(filtersSchema)
    .query(({ ctx, input }) => {

      // Distance Filter
      const distanceFilter: any[] = []
      input.distance?.forEach((item) => {
        const num = parseInt(item) || 0
        distanceFilter.push({ 
          distanceToCampus: num === 501 ? { gte: 500 } : { lte: num, gte: (num - 100) } 
        })
      })

      return ctx.prisma.unit.findMany({
        where: {
          price: {
            gte: input.minPrice || undefined,
            lte: input.maxPrice || undefined,
          },
          bedrooms: {
            equals: !!input.bedrooms && input.bedrooms < 7 ? input.bedrooms : undefined,
            gte: input.bedrooms === 7 ? 7 : undefined
          },
          OR: distanceFilter.length > 0 ? distanceFilter : undefined
        },
        orderBy: {
          distanceToCampus: 'asc',
        },
        include: {
          _count: {
            select: { users: true },
          },
        }
      });
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
      name: z.string().min(1),
      description: z.string().min(1),
      price: z.number().positive().min(1),
      bedrooms: z.number().positive().min(1),
      distanceToCampus: z.number().positive().min(1),
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
