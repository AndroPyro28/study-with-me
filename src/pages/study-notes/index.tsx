import NavLinks from "~/components/Navbar";
import useAuth from "~/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faPencil, faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import Notes from "~/components/Notes";
const index = () => {
  const data = useAuth();
  const [openAddReviewerModal, setOpenAddReviewerModal] = useState(false)
  const handleReviewerModal = () => {
    setOpenAddReviewerModal(prev => !prev)
  }

  return (
    <div className="flex flex-col items-center">
      <div className=" flex items-center justify-center rounded-md border-2 bg-white text-gray-900 px-5 py-2 cursor-pointer w-fit  self-end m-5 " onClick={handleReviewerModal}>
        <FontAwesomeIcon icon={faNoteSticky} className="w-10 h-10" /> <span className="text-3xl" > &nbsp;Add Note </span>
      </div>
      <Notes openAddReviewerModal={openAddReviewerModal} handler={handleReviewerModal} />
    </div>
  );
};
// #endregion

export default index;
