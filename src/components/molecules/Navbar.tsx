import axiosInstance from "@/axios";
import useMainStore from "@/store";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { BsCart, BsCart2 } from "react-icons/bs";

import React, { useEffect, useCallback } from "react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

const Navbar = () => {
  const isLoggedIn = useMainStore((state: any) => state.isLoggedIn);
  const cartItem = useMainStore((state: any) => state.cart.totalItem);
  const idUser = useMainStore((state: any) => state.profile.id);
  const setCartItem = useMainStore((state: any) => state.cart.setTotalItem);
  const setLoggedIn = useMainStore((state: any) => state.setLoggedIn);

  const router = useRouter();
  const logout = useCallback(() => {
    setLoggedIn(false);
    deleteCookie("innoraine_token");
    router.push("/");
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/api/cart/total/${idUser}`);
        setCartItem(res.data.body.total);
      } catch (error) {
        throw error;
      }
    };
    if (isLoggedIn) fetchData();
  }, [isLoggedIn, idUser]);
  return (
    <Box backgroundColor={"white"} position={"sticky"} top={0} zIndex={10}>
      <Flex paddingY={5} paddingX={30} justifyContent={"space-between"}>
        <Link href="/">
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            Innoraine Cake
          </Text>
        </Link>
        <Flex columnGap={10} alignItems={"center"}>
          <Link href="/tentang-kami">Tentang Kami </Link>
          <Link href="/menu">Menu </Link>
        </Flex>
        {isLoggedIn ? (
          <Flex columnGap={3} alignItems={"center"}>
            <Link href={"/keranjang"}>
              <Box position={"relative"}>
                {cartItem > 0 && (
                  <Flex
                    position={"absolute"}
                    top={-3}
                    left={-5}
                    justifyContent={"center"}
                    alignItems={"center"}
                    backgroundColor={"orange.400"}
                    borderRadius={"50%"}
                    width={5}
                    height={5}
                  >
                    <Text color={"white"}>{cartItem}</Text>
                  </Flex>
                )}
                <Box>
                  <BsCart2 size={20} />
                </Box>
              </Box>
            </Link>
            <Menu>
              <MenuButton>Akun</MenuButton>
              <MenuList>
                <MenuItem>
                  <Link href={"/invoice"} style={{ width: "100%" }}>
                    Invoice
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Text color={"red"} onClick={logout} width={"100%"}>
                    Logout
                  </Text>
                  {/* <Button variant={"nostyle"} color={"red"} onClick={logout}>
                    Logout
                  </Button> */}
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        ) : (
          <Flex columnGap={3}>
            <Link href={"/login"}>
              <Button
                variant={"solid"}
                backgroundColor={"secondary"}
                color={"black"}
              >
                Masuk
              </Button>
            </Link>
            <Link href={"/daftar"}>
              <Button variant={"ghost"}>Daftar</Button>
            </Link>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
