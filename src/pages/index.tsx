import Image from "next/image";
import { Inter } from "next/font/google";
import { Box } from "@chakra-ui/react";
import { ReactElement } from "react";
import Protected from "@/components/templates/protected";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <Box></Box>;
}

// Home.layout = (page: ReactElement) => {
//   return <Protected>{page}</Protected>;
// };
