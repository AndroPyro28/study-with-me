import { Sign } from "crypto";
import { type NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import Login from "~/components/Login";
import Signup from "~/components/Signup";
import { contentForm } from "~/types/IndexcontentForm";
import { api } from "~/utils/api";

const Home: NextPage = () => {

  const [content, setContent] = useState<contentForm>('login')
  
  const handleChangeContent = (content: contentForm) => {
    setContent(content)
  }
  const contentPage = content === 'login' ? <Login handleChangeContent={handleChangeContent}  /> : <Signup handleChangeContent={handleChangeContent} />
  return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#53D1E0] to-[#0C5DB8]">
        {contentPage}
      </main>
  );
};

export default Home;
