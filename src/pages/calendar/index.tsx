import React, { useState } from "react";

import DateTimeFormatter from "~/helper/DateTimeFormatter.helper";
import Calendar from "~/components/Calendar";
import moment from 'moment'
import { Event } from "@prisma/client";
import { api } from "~/utils/api";
import Loader from "~/components/Loader";
import useAuth from "~/hooks/useAuth";

const index = () => {

  useAuth()
  const {data, isLoading} = api.event.getAllEventByUserId.useQuery()

  if(isLoading) return <div className="flex items-center justify-center h-screen w-screen"><Loader size={50}/></div>

  const renderSidebarEvent = (event: Event) => {
    const dateObj = new Date(event.timeStart)
    dateObj.setDate(dateObj.getDate() + 1);
    const { date, time } = DateTimeFormatter(dateObj + '');
    return (
      <li key={event.id} className="flex justify-between">
        <div className="font-bold">
            {moment(date).format('ll')} {time}
            {/* {date} {time} */}
        </div>
        <div>-</div>
        <div>{event.title}</div>
      </li>
    );
  };

  const EventSideBar = () => {
    return (
      <div className="demo-app-sidebar-section w-[30vw] flex flex-col items-center text-sm">
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
