import React, { useEffect } from "react";
import styles from './styles.module.css'
function index() {
  const fonts = ["roboto", "arial", "mono", "sans-serif", "helvetica", "courier" , "verdana", 'trebuchet ms', "times new roman", "garamond", "calibiri", "open sans"];

  const handleChangeFont = (font: string) => {
    window.localStorage.setItem('font', font)
    window.location.reload();
  }

  return (
    <div className="h-screen w-screen">
      <div className={styles.font}>
        <h1 className="m-10 text-center text-2xl">Font Settings</h1>
        <div className={styles.gridTables}>
          {fonts?.map((value) => {
            return <div className="h-[50px] bg-gray-400 flex text-center justify-center items-center w-[100px] text-white rounded-xl cursor-pointer"
            style={{
              fontFamily: value
            }}
            onClick={() => handleChangeFont(value)}
            >{value}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default index;
