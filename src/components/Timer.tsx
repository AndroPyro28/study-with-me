import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";
import { faClock } from "@fortawesome/free-solid-svg-icons";
// import ReactQuill from "react-quill";
import styles from "./style.module.css";
import { Reviewer } from "@prisma/client";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { api } from "~/utils/api";
import z, { TypeOf } from 'zod'
import Loader from "./Loader";
import { UnAuthorizeError } from "~/helper/Unauthorize.helper";
interface Props {
  data: Reviewer;
}

export const updateReviewerSchema = z.object({
  timeLeft: z.string(),
  id: z.string(),
  notesContent: z.string()
})
export type updateSchemaType = TypeOf<typeof updateReviewerSchema>;
  

function Timer({ data }: Props) {
  const [timeLeft, setTimeLeft] = useState(Number(data?.time_limit));
  const [notesContent, setNotesContent] = useState(data?.notes ?? '');
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);

  const router = useRouter();

  const {mutate, isLoading} = api.reviewer.updateReviewer.useMutation({
    onError: UnAuthorizeError,
    onSettled: () => {
      router.push('/study-notes')
    }
  })

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } 
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const handleSave = () => {
    mutate({
      timeLeft: timeLeft.toString(),
      id: data?.id,
      notesContent
    })
  }

  return (
    <div className=" overflow-y-hidden w-[40vw]">
      <h1 className="text-white text-5xl text-center mt-[20px] mb-[-20px] ">{data?.title}</h1>
      <div className="mx-[50px] my-[100px] flex h-fit items-center gap-5 text-center text-2xl text-white">
        <FontAwesomeIcon icon={faClock} /> {hours.toString().padStart(2, "0")}:
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
  
        <button className="text-md rounded-md bg-white px-[10px] py-[5px] text-black" onClick={handleSave} disabled={isLoading}>
          {isLoading ? <Loader size={20} /> : 'Stop'}
        </button>
      </div>

      <div className={styles.textNoteContent}>
           <ReactQuill
          defaultValue={notesContent}
          theme="snow"
          style={{
            height: "75vh",
            background: "white",
            width: '100%',
            maxWidth: '100vw',
          }}
          onChange={setNotesContent}
          className="content"
          placeholder="Your Notes here"
        />
       
      </div>
    </div>
  );
}

export default Timer;
