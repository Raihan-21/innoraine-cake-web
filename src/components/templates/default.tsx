import React, { ReactElement, useEffect, useState, useCallback } from "react";
import Navbar from "../molecules/Navbar";
import useMainStore from "@/store";
import { getCookie } from "cookies-next";
import Head from "next/head";
import NavbarMobile from "../molecules/NavbarMobile";
const DefaultLayout = ({ children }: { children: ReactElement }) => {
  const [isMobile, setisMobile] = useState(false);

  const token = useMainStore((state: any) => state.token);
  const setToken = useMainStore((state: any) => state.setToken);
  const setLoggedIn = useMainStore((state: any) => state.setLoggedIn);
  const setProfile = useMainStore((state: any) => state.setProfile);
  const tokenCookie = getCookie("innoraine_token");
  const profileCookie = JSON.parse(getCookie("innoraine_profile") || "{}");

  const updateViewport = useCallback(() => {
    if (window.innerWidth > 400) {
      setisMobile(false);
      return;
    }
    setisMobile(true);
  }, [isMobile]);

  useEffect(() => {
    if (tokenCookie) {
      setToken(tokenCookie);
      setLoggedIn(true);
      setProfile(profileCookie);
    }
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  return (
    <>
      <Head>
        <title>Innoraine Cake</title>
      </Head>
      {isMobile ? <NavbarMobile /> : <Navbar />}
      {children}
    </>
  );
};

export default DefaultLayout;
