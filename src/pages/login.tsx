import axiosInstance from "@/axios";
import BlankLayout from "@/components/templates/blank";
import useMainStore from "@/store";
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { ReactElement, useCallback, useState } from "react";

interface LoginFormType {
  email: string;
  password: string;
}

const login = () => {
  const [formData, setFormData] = useState<LoginFormType>({
    email: "",
    password: "",
  });
  const isLoggedIn: boolean = useMainStore((state: any) => state.isLoggedIn);
  const setLoggedIn: (payload: boolean) => void = useMainStore(
    (state: any) => state.setLoggedIn
  );

  const router = useRouter();
  const onSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      try {
        const res = await axiosInstance.post("/api/login", formData);
        setLoggedIn(true);
        const authData = { isLoggedIn: true };
        window.localStorage.setItem("auth", JSON.stringify(authData));
        router.push("/");
      } catch (error) {
        throw error;
      }
    },
    [formData, isLoggedIn]
  );

  return (
    <Box width={"100%"}>
      <Box
        width={350}
        marginTop={200}
        marginX={"auto"}
        borderWidth={1}
        borderColor={"black"}
        borderRadius={5}
        padding={5}
      >
        <Text fontWeight={"bold"} fontSize={"xl"} marginBottom={5}>
          Login
        </Text>
        <form onSubmit={onSubmit}>
          <VStack spacing={5} marginBottom={8}>
            <Input
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
            />
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
          </VStack>
          <Button backgroundColor={"blue.400"} color={"white"} type="submit">
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

login.Layout = (page: ReactElement) => {
  return <BlankLayout>{page}</BlankLayout>;
};

export default login;
