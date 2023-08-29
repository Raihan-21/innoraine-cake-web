import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <Box>
      <Flex marginY={20} marginX={30} justifyContent={"space-between"}>
        <Box>Navbar</Box>
        <Flex columnGap={10}>
          <Link href="/test">Test </Link>
          <Link href="/test">Test </Link>
        </Flex>
        <Box>Akun</Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
