import useMainStore from "@/store";
import { Box, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const isLoggedIn = useMainStore((state: any) => state.isLoggedIn);
  return (
    <Box position={"sticky"} top={0} zIndex={10}>
      <Flex paddingY={20} paddingX={30} justifyContent={"space-between"}>
        <Box>Navbar</Box>
        <Flex columnGap={10}>
          <Link href="/test">About </Link>
          <Link href="/menu">Menu </Link>
        </Flex>
        {isLoggedIn ? (
          <Box>Akun</Box>
        ) : (
          <Flex>
            <Link href={"/login"}>
              <Button
                variant={"solid"}
                backgroundColor={"black"}
                color={"white"}
              >
                Masuk
              </Button>
            </Link>
            <Button variant={"ghost"}>Daftar</Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;