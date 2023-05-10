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

    const filteredRecords = event.filter((record) => {
      const recordDate = record.timeStart.getDate();
      const recordMonth = record.timeStart.getMonth();
      const recordYear = record.timeStart.getFullYear();
      const currentDate = today.getDate();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();

      // check if record was created today
      return (
        recordDate === currentDate &&
        recordMonth === currentMonth &&
        recordYear === currentYear
      );
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
