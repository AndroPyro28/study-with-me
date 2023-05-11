import React, { useEffect, useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { Reviewer } from "@prisma/client";
import Timer from "./Timer";
import styles from './style.module.css'
interface Props {
  data: Reviewer;
}

const ReviewerContent = ({ data }: Props) => {
  const docs = [
    {
      uri: data?.image_url!,
      // uri: "https://res.cloudinary.com/iamprogrammer/image/upload/v1683084884/tg4x6kp7drqqk7bhxd3e.pdf",
    }, // Remote file
  ];
  return (
    <div className={styles.styleReview}>
      {
        data?.image_url && <DocViewer
        
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        className="h-[50vh] w-[50vw]"
        style={{
          width: "100%",
          height: "100vh",
        }}
        
      />
      }
      
      <Timer data={data}/>
    </div>
  );
};

export default ReviewerContent;
