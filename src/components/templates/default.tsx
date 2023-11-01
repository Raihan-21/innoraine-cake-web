import React, { ReactElement, useEffect } from "react";
import Navbar from "../molecules/Navbar";
import useMainStore from "@/store";
import { getCookie } from "cookies-next";
import Head from "next/head";
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
  }, []);

  return (
    <>
      <Head>
        <title>Innoraine Cake</title>
      </Head>
      <Navbar />
      {children}
    </>
  );
};

export default DefaultLayout;
