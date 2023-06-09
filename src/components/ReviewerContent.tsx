import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { Reviewer } from "@prisma/client";
import Timer from "./Timer";
import styles from "./style.module.css";
import { ex } from "@fullcalendar/core/internal-common";
interface Props {
  data: Reviewer;
}

const ReviewerContent = ({ data }: Props) => {
  const viewerRef = useRef<any>(null);
  const docs = [
    {
      uri: data?.image_url!,
      // uri: "https://res.cloudinary.com/iamprogrammer/image/upload/v1683084884/tg4x6kp7drqqk7bhxd3e.pdf",
    }, // Remote file
  ];
  const ext = data?.image_url?.split(".")[3];
  const fileName = data?.image_url?.split("/")[8]?.split(".")[0];

  let content;

  if(ext === '' || !ext) content = null;
  if(ext === 'pdf') content = <iframe className="w-[60vw] h-[100vh] max-[900px]:flex-col max-[900px]:w-screen max-[900px]:h-[65vh]" src={`https://docs.google.com/viewer?embedded=true&url=${data?.image_url}`} ></iframe>
  else if (ext === "pptx") content = <iframe className="w-[60vw] h-[100vh] max-[900px]:flex-col max-[900px]:w-screen max-[900px]:h-[65vh]" src={`https://view.officeapps.live.com/op/view.aspx?src=http%3A%2F%2Fres%2Ecloudinary%2Ecom%3A80%2Fiamprogrammer%2Fraw%2Fupload%2Fv1683728668%2Fonline-student-reviewer%2F${fileName}%2Epptx&wdSlideId=&wdModeSwitchTime=1683949969946`}></iframe>
  else content = <DocViewer
  documents={docs}
  pluginRenderers={DocViewerRenderers}
  config={{}}
  className="h-[50vh] w-[50vw]"
  style={{
    width: "100%",
    height: "auto",
    minHeight: "70vh",
    flex: 1,
  }}
  ref={viewerRef}
/>
  return (
    <div className={styles.styleReview}>
      {content}
      <Timer data={data} />
    </div>
  );
};

export default ReviewerContent;
