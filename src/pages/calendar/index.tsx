import React, { useState } from "react";

import DateTimeFormatter from "~/helper/DateTimeFormatter.helper";
import Calendar from "~/components/Calendar";
import moment from 'moment'
import { Event } from "@prisma/client";
import { api } from "~/utils/api";
import Loader from "~/components/Loader";

const index = () => {


  const {data, isLoading} = api.event.getAllEventByUserId.useQuery()

  if(isLoading) return <div className="flex items-center justify-center h-screen w-screen"><Loader size={50}/></div>

  console.log('hello', isLoading, data)
  const renderSidebarEvent = (event: Event) => {
    const { date, time } = DateTimeFormatter(event?.timeStart);
    return (
      <li key={event.id} className="flex justify-between">
        <div className="font-bold">
            {moment(date).format('ll')} {time}
        </div>
        <div>-</div>
        <div>{event.title}</div>
      </li>
    );
  };

  const EventSideBar = () => {
    return (
      <div className="demo-app-sidebar-section w-[20vw] flex flex-col items-center text-sm">
        <h2>All Events ({data?.length})</h2>
        <div className="mt-20 w-[70%]">
            <ul>{data?.map(renderSidebarEvent)}</ul>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-[auto] w-[100vw] bg-white p-5">
      <Calendar currentEvents={data as Event[]} />
      <EventSideBar />
    </div>
  );
};

export default index;
