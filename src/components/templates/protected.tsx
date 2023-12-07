import useMainStore from "@/store";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../molecules/Navbar";
import { getCookie, hasCookie } from "cookies-next";
import NavbarMobile from "../molecules/NavbarMobile";

const ProtectedTemplate = ({ children }: { children: any }) => {
  // const isMobile =
  const [isMobile, setIsMobile] = useState(false);
  const isLoggedIn = useMainStore((state: any) => state.isLoggedIn);
  const setLoggedIn = useMainStore((state: any) => state.setLoggedIn);
  const setToken = useMainStore((state: any) => state.setToken);
  const setProfile = useMainStore((state: any) => state.setProfile);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  // const cookie = cookies();

  const updateViewport = useCallback(() => {
    if (window.innerWidth > 400) {
      setIsMobile(false);
      return;
    }
    setIsMobile(true);
  }, [isMobile]);
  useEffect(() => {
    const hasToken = hasCookie("innoraine_token");
    const tokenCookie = getCookie("innoraine_token");
    const profileCookie = getCookie("innoraine_profile");
    if (hasToken) {
      setLoggedIn(true);
      setToken(tokenCookie);
      setProfile(profileCookie);
    }
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }
    window.addEventListener("resize", updateViewport);

    setIsLoading(false);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  return (
    <>
      {!isLoading && (
        <>
          {isMobile ? <NavbarMobile /> : <Navbar />}
          {children}
        </>
      )}
    </>
  );
};

export default ProtectedTemplate;
