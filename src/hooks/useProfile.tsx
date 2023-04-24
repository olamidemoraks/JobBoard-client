import React, { useEffect, useState } from "react";
import decode from "jwt-decode";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getToken, setCredential } from "@/feature/auth/authSlice";

let data;
const useProfile = () => {
  let isExpired = true;
  const dispatch = useAppDispatch();
  data = useAppSelector(getToken);
  if (Object.values(data).length === 0) {
    if (typeof window !== "undefined") {
      const info = JSON.parse(localStorage.getItem("_profile") as string);
      if (info) {
        dispatch(
          setCredential({
            profile: { token: info.token, account: info.account },
          })
        );
      }
    }
  }
  const { token, account }: any = data || {};
  if (token || account) {
    const decodedToken = decode<any>(token);
    //check if token has expired
    var dateNow = new Date().getTime() / 1000;
    if (decodedToken.exp < dateNow) {
      isExpired = true;
    } else {
      isExpired = false;
    }
    return {
      token,
      account,
      email: decodedToken.email,
      isExpired,
    };
  }

  return { token: "", account: "seeker", email: "", isExpired };
};
export default useProfile;
