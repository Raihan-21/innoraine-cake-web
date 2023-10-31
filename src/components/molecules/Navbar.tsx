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
import React, { useEffect } from "react";

const Navbar = () => {
  const isLoggedIn = useMainStore((state: any) => state.isLoggedIn);
  const cartItem = useMainStore((state: any) => state.cart.totalItem);
  const idUser = useMainStore((state: any) => state.profile.id);
  const setCartItem = useMainStore((state: any) => state.cart.setTotalItem);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/api/cart/total/${idUser}`);
        setCartItem(res.data.body.count);
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
          <Box>Home</Box>
        </Link>
        <Flex columnGap={10}>
          <Link href="/test">About </Link>
          <Link href="/menu">Menu </Link>
        </Flex>
        {isLoggedIn ? (
          <Flex columnGap={3}>
            <Link href={"/keranjang"}>
              <Box position={"relative"}>
                <Text position={"absolute"} top={-1} left={-2}>
                  {cartItem}
                </Text>
                <Box>Cart</Box>
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
              </MenuList>
            </Menu>
          </Flex>
        ) : (
          <Flex columnGap={3}>
            <Link href={"/login"}>
              <Button
                variant={"solid"}
                backgroundColor={"black"}
                color={"white"}
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
