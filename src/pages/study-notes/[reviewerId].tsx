import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { api } from "~/utils/api";
import styles from './style.module.css'
import ReviewerContent from "~/components/ReviewerContent";

const reviewerDetail = () => {
  const { query } = useRouter();
  const { reviewerId } = query;
  if (!reviewerId) {
    return <></>;
  }
  const [hasStarted, setHasStarted] = useState(false)
  const { data, isLoading, isFetched, isError } =
    api.reviewer.getReviewerById.useQuery(reviewerId.toString()!);

  const handleStart = () => {
    setHasStarted(true)
  }
  // const router = useRouter();

  // useEffect(() => {
  //   window.onbeforeunload = (e) => {
  //     router.replace("/study-notes");
  //     console.log(e)
  //     return "are you sure you want to leave?";
  //   };
  // }, [])
  return (
    <div className={styles.reviewer}>
        {!hasStarted ? <button className="bg-white px-[20px] py-[10px] m-auto rounded-md" onClick={handleStart}>Start Review</button> : <ReviewerContent data={data!} />}
    </div>
  );
};

export default reviewerDetail;

// export const getServerSideProps = async  () => {
//   return {
//     props: {
//       some: ''
//     }
//   }
// }
