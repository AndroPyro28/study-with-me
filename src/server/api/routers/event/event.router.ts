import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import z from 'zod'
import {AddEventDto} from "./dto/addEvent.dto";
import { createOneEvent, deleteEvent, findAllEventByUserId, updateEvent } from "~/models/event.model";
import { UpdateEventDto } from "./dto/updateEvent.dto";

export const eventRouter = createTRPCRouter({
    addEvent: privateProcedure.input(AddEventDto).mutation(async ({ctx, input}) => {
        const event = await createOneEvent(input, ctx.currentUser.id);
        return event
    }),
    getAllEventByUserId: privateProcedure.query(async ({ctx}) => {
        const event = await findAllEventByUserId(ctx.currentUser.id)
        return event
    }),
    updateEvent: privateProcedure.input(UpdateEventDto).mutation(async ({ctx, input}) => {
        const event = await updateEvent(input, ctx.currentUser.id)
        return event
    }),
    deleteEvent: privateProcedure.input(z.string()).mutation(async ({ctx, input}) => {
        const event = await deleteEvent(input, ctx.currentUser.id)
        return event
    }),
});
