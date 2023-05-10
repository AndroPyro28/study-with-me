import { AddEventSchema } from '~/server/api/routers/event/dto/addEvent.dto';
import {event} from './prisma';
import { UpdatEventSchema } from '~/server/api/routers/event/dto/updateEvent.dto';
import moment from 'moment-timezone';

export const createOneEvent = async (eventInput: AddEventSchema, userId: number) => {

    const eventData = await event.create({
        data: {
            id: eventInput.id,
            title: eventInput.title,
            timeStart: eventInput.timeStart,
            timeEnd: eventInput.timeEnd,
            allDay: eventInput.allDay,
            userId: userId,
        }
    })

    return eventData;
}

export const findAllEventByUserId = async (userId: number) => {
    const date = new Date()
    date.setDate(date.getDate( ) - 1)
    const today = moment.utc(date).tz('Asia/Manila').format()
    const eventData = await event.findMany({
        where: {
            userId,
            timeStart: {
                gte: today
            }
        },
        orderBy: {
            timeStart: 'desc'
        }
    })
    return eventData
}

export const updateEvent = async (eventInput: UpdatEventSchema, userId: number) => {
    const eventData = await event.update({
        data: {
            title: eventInput.title,
            timeStart: eventInput.timeStart,
            timeEnd: eventInput.timeEnd,
            allDay: eventInput.allDay,
        },
        where: {
            id: eventInput.id
        }
    })

    return eventData
}

export const deleteEvent = async (id: string, userId: number) => {
    const eventData = await event.deleteMany({
        where: {
            id,
            userId
        }
    })

    return eventData
}