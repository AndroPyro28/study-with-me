import { Answer, Choice, Question, Quiz } from '@prisma/client';
import { useRouter } from 'next/router';
import React from 'react'
interface Props {
  data:
  | (Quiz & {
      question: (Question & {
        choice: Choice[];
      })[];
      answer: Answer[];
    })
  | null;
}

function ScoreQuiz({data}: Props) {
  const router = useRouter()

  const handleOk = () => {
    router.push('/quizes')
  }
  return (
    <div className="flex h-[95vh] items-center justify-center gap-10 overflow-hidden px-10">
      <div className='bg-white w-[65vw] h-[70vh] rounded-xl p-10 flex flex-col justify-evenly max-[950px]:w-[100vw] max-[950px]:text-md max-[950px]:p-5'>
        <h1 className='text-[2.5em] font-[1000]'>Quiz: {data?.title} </h1>
         <h1 className='text-center text-[2.3em] font-[700] text-center'>This quiz has been submitted</h1> 
         <h3 className='text-[2em] text-center'>Score: {data?.score} / {data?.question.length}</h3>
      <button className='w-fit h-fit px-[50px] py-[10px] mx-auto bg-[#EAEAEA] rounded-md' onClick={handleOk} >Ok</button>
      </div>
  </div>
  )
}

export default ScoreQuiz