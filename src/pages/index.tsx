import { Sign } from "crypto";
import { type NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import Login from "~/components/Login";
import Signup from "~/components/Signup";
import { api } from "~/utils/api";

const Home: NextPage = () => {

  const [content, setContent] = useState<'login' | 'signup'>('login')
  
  const handleChangeContent = (content: 'login' | 'signup') => {
    setContent(content)
  }
  type changeContent = (content: 'login' | 'signup') => void
  
  const contentPage = content === 'login' ? <Login handleChangeContent={handleChangeContent as changeContent }  /> : <Signup handleChangeContent={handleChangeContent as changeContent} />
  return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#53D1E0] to-[#0C5DB8] ">
        {contentPage}
      </main>
  );
};

export default Home;
