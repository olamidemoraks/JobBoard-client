import { useAppDispatch } from "@/app/hooks";
import { logout } from "@/feature/auth/authSlice";
import useProfile from "@/hooks/useProfile";
import { useRouter } from "next/router";
import React from "react";

const ProtectRoute = ({ children }: any) => {
  const { isExpired, email, token } = useProfile();
  const dispatch = useAppDispatch();
  if (isExpired && !!email) {
    dispatch(logout({}));
  }

  return children;
};
export default ProtectRoute;
