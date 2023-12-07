import axiosInstance from "@/axios";
import useMainStore from "@/store";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { BsCart, BsCart2 } from "react-icons/bs";

import React, { useEffect, useCallback } from "react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

import { IoIosMenu } from "react-icons/io";

const NavbarMobile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      <Flex
        paddingY={5}
        paddingX={30}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text>Innoraine Cake</Text>
        <Button variant={"nostyle"} onClick={onOpen}>
          <IoIosMenu />
        </Button>
        <Drawer isOpen={isOpen} onClose={onClose}>
          <DrawerContent>
            <DrawerBody></DrawerBody>
          </DrawerContent>
        </Drawer>
        {/* <Menu>
          <MenuButton>
            <IoIosMenu />
          </MenuButton>
          <MenuList>
            <Link href="/tentang-kami">
              <MenuItem>Tentang Kami</MenuItem>
            </Link>
            <Link href="/menu">
              <MenuItem>Menu</MenuItem>
            </Link>
          </MenuList>
        </Menu> */}
      </Flex>
    </Box>
  );
};

export default NavbarMobile;
