import useMainStore from "@/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Navbar from "../molecules/Navbar";

const ProtectedTemplate = ({ children }: { children: any }) => {
  const isLoggedIn = useMainStore((state: any) => state.isLoggedIn);
  const setLoggedIn = useMainStore((state: any) => state.setLoggedIn);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const authData = JSON.parse(window.localStorage.getItem("auth") || "{}");
    if (authData.isLoggedIn) setLoggedIn(true);
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
