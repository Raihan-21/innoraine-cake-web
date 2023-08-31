import Image from "next/image";
import { Inter } from "next/font/google";
import { Box, Flex, Img, Text } from "@chakra-ui/react";
import { ReactElement } from "react";
import Protected from "@/components/templates/protected";
import axiosInstance from "@/axios";
import { ProductType } from "../../types/data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

const inter = Inter({ subsets: ["latin"] });

const carouselSetting = {
  dots: false,
  arrow: false,
  slidesToShow: 1,
};

export const getServerSideProps = async () => {
  const res = await axiosInstance.get(
    "/api/products?orderby=created_at&sort=desc"
  );
  return {
    props: {
      promotedProduct: res.data.body,
    },
  };
};

export default function Home({
  promotedProduct,
}: {
  promotedProduct: ProductType[];
}) {
  return (
    <Box backgroundColor={"black"}>
      <Slider>
        {promotedProduct.length &&
          promotedProduct.map((product: ProductType, i: number) => (
            <Box key={i}>
              <Flex>
                <Img src={product.gambar_utama} />
                <Box>
                  <Text color={"white"}>{product.nama_produk}</Text>
                </Box>
              </Flex>
            </Box>
          ))}
      </Slider>
    </Box>
  );
}

// Home.layout = (page: ReactElement) => {
//   return <Protected>{page}</Protected>;
// };
