import { Sign } from "crypto";
import { type NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import LoaderModal from "~/components/LoaderModal";
import Login from "~/components/Login";
import Signup from "~/components/Signup";
import useReverseAuth from "~/hooks/useReverseAuth";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const {isLoading, isError} = useReverseAuth()
  const [content, setContent] = useState<'login' | 'signup'>('login')
  
  const handleChangeContent = (content: 'login' | 'signup') => {
    setContent(content)
  }
  type changeContent = (content: 'login' | 'signup') => void
  
  const contentPage = content === 'login' ? <Login handleChangeContent={handleChangeContent as changeContent }  /> : <Signup handleChangeContent={handleChangeContent as changeContent} />
  if(isLoading) return <LoaderModal />
  return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        {contentPage}
      </main>
  );
};

export default Home;
