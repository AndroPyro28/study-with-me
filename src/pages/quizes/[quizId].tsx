import React from 'react';
import { useRouter } from "next/router";
const quizDetail = () => {

const { query } = useRouter();
const { quizId } = query;


    return <div>{quizId}</div>;
}


export default quizDetail;