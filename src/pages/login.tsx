import axiosInstance from "@/axios";
import BlankLayout from "@/components/templates/blank";
import useMainStore from "@/store";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useCallback, useState } from "react";

interface LoginFormType {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginFormType>({
    email: "",
    password: "",
  });
  const isLoggedIn: boolean = useMainStore((state: any) => state.isLoggedIn);
  const setLoggedIn: (payload: boolean) => void = useMainStore(
    (state: any) => state.setLoggedIn
  );
  const setToken = useMainStore((state: any) => state.setToken);
  const setProfile = useMainStore((state: any) => state.setProfile);

  const router = useRouter();
  const onSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        const res = await axiosInstance.post("/api/login", formData);
        setLoggedIn(true);
        const authData = { isLoggedIn: true };
        setCookie("innoraine_token", res.data.token);
        setCookie("innoraine_profile", res.data.body);
        setToken(res.data.token);
        setProfile(res.data.body);
        // window.localStorage.setItem("auth", JSON.stringify(authData));
        router.push("/");
      } catch (error) {
        throw error;
      }
    },
    [formData, isLoggedIn]
  );

  return (
    <Flex
      alignItems={"center"}
      width={"100%"}
      minHeight={"calc(100vh - 76px)"}
      // paddingTop={200}
      backgroundColor={"primary"}
    >
      <Box
        width={360}
        marginX={"auto"}
        borderRadius={8}
        padding={8}
        backgroundColor={"white"}
      >
        <Text fontWeight={"bold"} fontSize={"4xl"} marginBottom={5}>
          Masuk
        </Text>
        <form onSubmit={onSubmit}>
          <VStack spacing={5} marginBottom={8}>
            <Box width={"100%"}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="email@gmail.com"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }))
                }
              />
            </Box>
            <Box width={"100%"}>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }))
                }
              />
            </Box>
          </VStack>
          <Button backgroundColor={"secondary"} color={"black"} type="submit">
            Masuk
          </Button>
        </form>
        <Text marginTop={5}>
          Belum punya akun?{" "}
          <Link href="/daftar" className="underline text-blue">
            {" "}
            Daftar
          </Link>{" "}
          sekarang
        </Text>
      </Box>
    </Flex>
  );
};

// login.Layout = (page: ReactElement) => {
//   return <BlankLayout>{page}</BlankLayout>;
// };

export default Login;
