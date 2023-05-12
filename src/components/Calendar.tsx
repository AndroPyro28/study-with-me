import React, { useEffect, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import DateTimeFormatter from "~/helper/DateTimeFormatter.helper";
import listPlugin from '@fullcalendar/list'
import { api } from "~/utils/api";
import { Event } from "@prisma/client";
import { v4 as uuid } from 'uuid';
import { start } from "repl";
import dynamic from "next/dynamic";

interface Props {
  currentEvents: Event[]
}
const Calendar = ({ currentEvents}: Props) => {
  console.log(currentEvents)
  const FullCalendar = useMemo(() => dynamic(() => import('@fullcalendar/react'), { ssr: false }),[]);

  const handleDateSelect = (selectInfo: any) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    if (title) {
      const events: any = {
        id: uuid(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };
      calendarApi.addEvent(events);
    }
  };

  const handleEventClick = (clickInfo: any) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const context = api.useContext()

  const handleOnsettled = () => {
    context.event.getAllEventByUserId.invalidate()

  }
  const { mutate: mutateAdd } = api.event.addEvent.useMutation({
    onSettled: handleOnsettled
  })
  const handleAddEvent = ({event}: any) => {
    const eventObj = {
      id: event.id,
      title: event.title,
      timeStart: event.start,
      timeEnd: event.end,
      allDay: event.allDay
    }

    mutateAdd(eventObj);
  }

  const { mutate: mutateUpdate } = api.event.updateEvent.useMutation({
    onSettled: handleOnsettled
  })

  const handleUpdateEvent = ({event}: any) => {
    const eventObj = {
      id: event.id,
      title: event.title,
      timeStart: event.start,
      timeEnd: event.end,
      allDay: event.allDay,
    }
    mutateUpdate(eventObj)
  }
  const { mutate: mutateDelete } = api.event.deleteEvent.useMutation({
    onSettled: handleOnsettled
  })
  const handleDeleteEvent = ({event}: any) => {
    mutateDelete(event.id)
  }

  const initialEvents = currentEvents.map((event) => {
    return {id: event?.id, title: event?.title, start: new Date(event?.timeStart), end: new Date(event?.timeEnd)}
  })

  const today = new Date()
  return (
    <div className="w-[80vw] flex-1">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        
        validRange={{
          start: today
        }}
        height={'100vh'}
        initialView="dayGridMonth"
        longPressDelay={0}
        editable={true}
        selectable={true}
        selectMirror={true}
        droppable={true}
        dayMaxEvents={true}
        eventBackgroundColor={"rgb(0, 152, 163)"}
        eventColor={"rgb(0, 152, 163)"}
        weekends={true}
        initialEvents={initialEvents} // alternatively, use the `events` setting to fetch from a feed
        select={handleDateSelect} // adding event
        eventClick={handleEventClick} // deleting event
        // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        // you can update a remote database when these fire:
        eventAdd={handleAddEvent}
        eventChange={handleUpdateEvent}
        eventRemove={handleDeleteEvent}
      />
    </div>
  );
};

export default Calendar;
