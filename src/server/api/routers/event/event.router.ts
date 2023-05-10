import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import z from "zod";
import { AddEventDto } from "./dto/addEvent.dto";
import {
  createOneEvent,
  deleteEvent,
  findAllEventByUserId,
  updateEvent,
} from "~/models/event.model";
import { UpdateEventDto } from "./dto/updateEvent.dto";

export const eventRouter = createTRPCRouter({
  addEvent: privateProcedure
    .input(AddEventDto)
    .mutation(async ({ ctx, input }) => {
      const event = await createOneEvent(input, ctx.currentUser.id);
      console.log("add", event);
      return event;
    }),
  getAllEventByUserId: privateProcedure.query(async ({ ctx }) => {
    const event = await findAllEventByUserId(ctx.currentUser.id);

    const today = new Date(); // get current date/time

    const filteredSchedule = event.filter((e) => {
        const dateDate = e.timeStart.getDate();
        const dateMonth =  e.timeStart.getMonth();
        const dateYear =  e.timeStart.getFullYear();
      
        const currentDate = today.getDate();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
      
        // check if date is on or after today
        return dateYear > currentYear || 
               (dateYear === currentYear && dateMonth > currentMonth) || 
               (dateYear === currentYear && dateMonth === currentMonth && dateDate >= currentDate);
      });
    console.log("get", event);

    return event;
  }),
  updateEvent: privateProcedure
    .input(UpdateEventDto)
    .mutation(async ({ ctx, input }) => {
      const event = await updateEvent(input, ctx.currentUser.id);
      console.log("update", event);

      return event;
    }),
  deleteEvent: privateProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const event = await deleteEvent(input, ctx.currentUser.id);
      console.log("delete", event);

      return event;
    }),
});
