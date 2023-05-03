import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCalendarAlt,
  faHourglass,
  faList,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import style from './style.module.css'
import Link from "next/link";

// #region constants

// #endregion

// #region styled-components

// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const NavLinks = () => {
    return <nav className=" bg-blue-300 flex h-[100px] w-full items-center justify-between">
    <span className=" text-[3em] italic text-white">Study with me</span>
    <div className={style.navlinks}>
      <Link href={"/study-notes"} className="rounded-xl p-[5px] text-white flex flex-col items-center justify-center gap-1">
        <FontAwesomeIcon className="h-[2em]" icon={faBook} />{" "}
        <span>Study</span>{" "}
      </Link>
      <Link href={"/calendar"} className="rounded-xl p-[5px] text-white flex flex-col items-center justify-center gap-1">
        {" "}
        <FontAwesomeIcon className="h-[2em]" icon={faCalendarAlt} />{" "}
        <span>Calendar</span>{" "}
      </Link>
      <Link href={"/study-notes"} className="rounded-xl p-[5px] text-white flex flex-col items-center justify-center gap-1">
        {" "}
        <FontAwesomeIcon className="h-[2em]" icon={faHourglass} />{" "}
        <span>Timer</span>{" "}
      </Link>
      <Link href={"/study-notes"} className="rounded-xl p-[5px] text-white flex flex-col items-center justify-center gap-1">
        {" "}
        <FontAwesomeIcon className="h-[2em]" icon={faList} />{" "}
        <span>Todo</span>
      </Link>
      <Link href={"/study-notes"} className="rounded-xl p-[5px] text-white flex flex-col items-center justify-center gap-1">
        {" "}
        <FontAwesomeIcon className="h-[2em]" icon={faGear} />{" "}
        <span>Settings</span>{" "}
      </Link>
    </div>
  </nav>;
}

NavLinks.propTypes = propTypes;
NavLinks.defaultProps = defaultProps;
// #endregion

export default NavLinks;