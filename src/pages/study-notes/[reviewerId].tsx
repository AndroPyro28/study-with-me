import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { api } from "~/utils/api";
import styles from './style.module.css'
import ReviewerContent from "~/components/ReviewerContent";
import useAuth from "~/hooks/useAuth";
import LoaderModal from "~/components/LoaderModal";

const reviewerDetail = () => {
  useAuth()
  const { query } = useRouter();
  const { reviewerId } = query;

  const { data, isLoading, isFetched, isError } =
    api.reviewer.getReviewerById.useQuery(reviewerId?.toString()!);

  const [hasStarted, setHasStarted] = useState(false)

  if (!reviewerId) {
    return <></>;
  }

  if(isLoading) return <LoaderModal />
  if(isError) return <div>Something went wrong...</div>
  
  const handleStart = () => {
    setHasStarted(true)
  }

  return (
    <div className={styles.reviewer}>
        {!hasStarted ? <button className="bg-white px-[20px] py-[10px] m-auto rounded-md" onClick={handleStart}>Start Review</button> : <ReviewerContent data={data!} />}
    </div>
  );
};

export default reviewerDetail;