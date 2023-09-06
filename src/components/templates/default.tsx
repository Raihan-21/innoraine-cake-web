import React, { ReactElement, useEffect } from "react";
import Navbar from "../molecules/Navbar";
import useMainStore from "@/store";
import { getCookie } from "cookies-next";

const DefaultLayout = ({ children }: { children: ReactElement }) => {
  const token = useMainStore((state: any) => state.token);
  const setToken = useMainStore((state: any) => state.setToken);
  const setLoggedIn = useMainStore((state: any) => state.setLoggedIn);
  const setProfile = useMainStore((state: any) => state.setProfile);
  const tokenCookie = getCookie("innoraine_token");
  const profileCookie = JSON.parse(getCookie("innoraine_profile") || "{}");
  useEffect(() => {
    if (tokenCookie) {
      setToken(tokenCookie);
      setLoggedIn(true);
      setProfile(profileCookie);
    }
    console.log("default");
  }, []);

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DefaultLayout;
