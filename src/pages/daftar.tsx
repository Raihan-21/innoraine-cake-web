import axiosInstance from "@/axios";
import BlankLayout from "@/components/templates/blank";
import useMainStore from "@/store";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";
import { useRouter } from "next/router";
import React, { ReactElement, useCallback, useState } from "react";

interface LoginFormType {
  nama: string;
  alamat: string;
  no_telp: string;
  email: string;
  password: string;
}

const daftar = () => {
  const [formData, setFormData] = useState<LoginFormType>({
    nama: "",
    email: "",
    no_telp: "",
    alamat: "",
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
        const res = await axiosInstance.post("/api/register", {
          ...formData,
          no_telp: Number(formData.no_telp),
        });
        // setLoggedIn(true);
        // const authData = { isLoggedIn: true };
        // setCookie("innoraine_token", res.data.token);
        // setCookie("innoraine_profile", res.data.body);
        // setToken(res.data.token);
        // setProfile(res.data.body);
        // window.localStorage.setItem("auth", JSON.stringify(authData));
        router.push("/login");
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
      paddingY={10}
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
          Daftar
        </Text>
        <form onSubmit={onSubmit}>
          <VStack spacing={5} marginBottom={8}>
            <FormControl>
              <FormLabel>Nama</FormLabel>
              <Input
                placeholder="Nama"
                value={formData.nama}
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    nama: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
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
            </FormControl>
            <FormControl>
              <FormLabel>No Telpon</FormLabel>
              <Input
                placeholder="No Telp"
                type="number"
                value={formData.no_telp}
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    no_telp: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Alamat</FormLabel>
              <Textarea
                placeholder="Alamat"
                value={formData.alamat}
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    alamat: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
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
            </FormControl>
          </VStack>
          <Button backgroundColor={"secondary"} color={"black"} type="submit">
            Daftar
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

// daftar.Layout = (page: ReactElement) => {
//   return <BlankLayout>{page}</BlankLayout>;
// };

export default daftar;
