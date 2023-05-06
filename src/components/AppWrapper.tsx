import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { setLoader } from "~/app/features/loaderSlice";
import useAuth from "~/hooks/useAuth";
import NavLinks from "./Navbar";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
// #region component
interface Props {
  children: any;
}
const AppWrapper = ({ children }: Props) => {
  const data = useAuth();
  const excludedRoutes = ['/study-notes/[reviewerId]']
  const {pathname} = useRouter();
  return (
    <div className="">
      {data && !excludedRoutes.includes(pathname) && <NavLinks />}
      {children}
    </div>
  );
};

export default AppWrapper;
