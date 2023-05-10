import React, { useState } from "react";
import AddNoteModal from "./AddNoteModal";
import { api } from "~/utils/api";
import { Reviewer } from "@prisma/client";
import DateTimeFormatter from "~/helper/DateTimeFormatter.helper";
import Loader from "./Loader";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface Props {
  openAddReviewerModal: boolean,
  handler: () => void 
}
const Notes = ({handler, openAddReviewerModal}: Props) => {
  const [search ,setSearch] = useState('')

  const {data, isLoading, isFetched, isError } = api.reviewer.getAllReviewer.useQuery(search);

  const NoteTableHeader = (
    <div className="flex justify-evenly text-white">
      <div className="flex-1 bg-gray-600 p-5 text-center">Reviewer ID</div>
      <div className="flex-1 bg-gray-600 p-5 text-center">Topic Title</div>
      <div className="flex-1 bg-gray-600 p-5 text-center">File type</div>
      <div className="flex-1 bg-gray-600 p-5 text-center">Time Left</div>
      <div className="flex-1 bg-gray-600 p-5 text-center">Date Created</div>

    </div>
  );

  type NoteTableDataProps = {
    data: Reviewer
  }

  const router = useRouter();
  
  const NoteTableData = ({data}: NoteTableDataProps) => {
    const {time, date } = DateTimeFormatter(data?.createdAt + '')
    const {title, time_limit, image_url, id } = data;
    const ext = image_url?.split('.')[3];

const hours = Math.floor(Number(time_limit) / 3600);
const minutes = Math.floor((Number(time_limit) % 3600) / 60);
const remainingSeconds = Number(time_limit) % 60;

const timeLeft = `0${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds} `

    return <div className="flex justify-evenly text-white cursor-pointer even:bg-gray-200 items-center" onClick={() => router.push(`study-notes/${id}`)}>
      <div className="flex-1 p-5 text-center text-gray-800 overflow-hidden text-ellipsis whitespace-wrap">{id}</div>
      <div className="flex-1  p-5 text-center text-gray-800 overflow-hidden text-ellipsis whitespace-wrap">{title}</div>
      <div className="flex-1  p-5 text-center text-gray-800 overflow-hidden text-ellipsis whitespace-wrap">{ext ? ext?.toUpperCase(): 'NONE'}</div>
      <div className="flex-1  p-5 text-center text-gray-800 overflow-hidden text-ellipsis whitespace-wrap">{timeLeft}</div>
      <div className="flex-1  p-5 text-center text-gray-800 overflow-hidden text-ellipsis whitespace-wrap">{date} {time}</div>
    </div>
  }

  const fetchReviewerList = data?.map((reviewer) =>  <NoteTableData data={reviewer}  />)
  let content;

  if(isLoading && !isFetched) content = <Loader size={20} />
  if(!isLoading && isError) content = <div>Something went wrong...</div>
  if(!isLoading && isFetched) content = <>{fetchReviewerList?.length! > 0 ? fetchReviewerList : <div className="text-center m-10 text-xl font-bold">No reviewers yet</div>}</>

  return (
    <div>
      <div className="flex bg-white px-[10px] py-[20px] gap-2 items-center rounded-md"> <FontAwesomeIcon icon={faMagnifyingGlass} className="w-[40px] h-[30px]" /> <input type="text" placeholder="Search Title" className=" text-3xl w-full h-10 outline-none" value={search} onChange={( e:React.ChangeEvent<HTMLInputElement> ) => setSearch(e.target.value)}  /> </div>
    <div className=" mt-[20px] flex h-auto  flex-col rounded-md border bg-white w-[90vw]">
        {openAddReviewerModal && <AddNoteModal handler={handler} />}
        {NoteTableHeader}
        {content}
    </div>
    </div>

  );
};

export default Notes;
