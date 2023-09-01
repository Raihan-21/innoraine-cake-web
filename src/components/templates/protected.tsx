import useMainStore from "@/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Navbar from "../molecules/Navbar";
import { getCookie, hasCookie } from "cookies-next";

const ProtectedTemplate = ({ children }: { children: any }) => {
  const isLoggedIn = useMainStore((state: any) => state.isLoggedIn);
  const setLoggedIn = useMainStore((state: any) => state.setLoggedIn);
  const setToken = useMainStore((state: any) => state.setToken);
  const setProfile = useMainStore((state: any) => state.setProfile);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  // const cookie = cookies();
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
    setIsLoading(false);
  }, []);

  return (
    <>
      {!isLoading && (
        <>
          <Navbar />
          {children}
        </>
      )}
    </>
  );
};

export default ProtectedTemplate;
