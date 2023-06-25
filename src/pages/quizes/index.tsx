import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import AddQuizModal from "~/components/AddQuizModal";
import Quizes from "~/components/Quizes";
import useAuth from "~/hooks/useAuth";
import { api } from "~/utils/api";
import {io} from 'socket.io-client'

const index = () => {
  useAuth(); 
  const [openAddQuizModal, setOpenAddQuizModal] = useState(false)

  const handleQuizModal = () => {
    setOpenAddQuizModal(prev => !prev)
  }
  
useEffect(() => {
  const socket = io('https://study-with-me-atf3.vercel.app/api/trpc/*')

  socket.emit('hello', {})
  socket.on('hello_back', () => {
    console.log('hello back from server')
  })
 }, [])

  return (
    <div className="flex flex-col items-center">

      <div className=" m-5 flex w-fit cursor-pointer items-center justify-center self-end rounded-md border-2 bg-white px-5  py-2 text-gray-900 "  onClick={handleQuizModal}>
        <FontAwesomeIcon icon={faNoteSticky} className="h-10 w-10" />{" "}
        <span className="text-3xl"> &nbsp;Add Quiz </span>
      </div>
        
        <Quizes openAddQuizModal={openAddQuizModal} handler={handleQuizModal} />

    </div>
  );
};

export default index;
