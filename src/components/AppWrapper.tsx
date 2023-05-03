import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { setLoader } from "~/app/features/loaderSlice";
import useAuth from "~/hooks/useAuth";
import NavLinks from "./NavLinks";
// #region component
interface Props {
  children: any;
}
const AppWrapper = ({ children }: Props) => {
  const data = useAuth();

  return (
    <div className="">
      {data && <NavLinks />}
      {children}
    </div>
  );
};

export default AppWrapper;
