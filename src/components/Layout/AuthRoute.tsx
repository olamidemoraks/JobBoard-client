import { useAppDispatch, useAppSelector } from "@/app/hooks";
import useProfile from "@/hooks/useProfile";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getToken, setCredential } from "@/feature/auth/authSlice";
import decode from "jwt-decode";

const AuthRoute = (Component: any) => {
  return (props: any) => {
    // let isExpired = false;
    // let email: string;
    const [isExpired, setIsExpired] = useState(true);
    const [email, setEmail] = useState("");
    const dispatch = useAppDispatch();
    let data = useAppSelector(getToken);
    const router = useRouter();

    useEffect(() => {
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
          //   isExpired = true;
          setIsExpired(true);
          setEmail("");
        } else {
          //   isExpired = false;
          setIsExpired(false);
          setEmail(decodedToken.email);
        }
      } else {
        if (isExpired === true && !email) {
          router.push("/auth");
        }
      }
    }, []);
    if (isExpired === false && email) {
      return <Component {...props} />;
    } else {
      return null;
    }
  };
};
export default AuthRoute;
