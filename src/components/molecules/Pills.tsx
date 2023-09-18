import { Box } from "@chakra-ui/react";
import React from "react";

const Pills = ({ color = "blue", text }: { color?: string; text: string }) => {
  return (
    <Box
      width={"fit-content"}
      background={color}
      color={"white"}
      paddingY={1}
      paddingX={3}
      borderRadius={30}
    >
      {text}
    </Box>
  );
};

export default Pills;
