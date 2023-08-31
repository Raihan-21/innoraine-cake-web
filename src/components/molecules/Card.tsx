import { Box } from "@chakra-ui/react";
import React, { ReactElement } from "react";

const Card = ({ children }: { children: any }) => {
  return (
    <Box
      padding={5}
      backgroundColor={"white"}
      borderRadius={10}
      height={"100%"}
    >
      {children}
    </Box>
  );
};

export default Card;
