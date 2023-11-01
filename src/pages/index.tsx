import Image from "next/image";
import { Inter } from "next/font/google";
import { Box, Button, Flex, Grid, GridItem, Img, Text } from "@chakra-ui/react";
import { ReactElement } from "react";
import Protected from "@/components/templates/protected";
import axiosInstance from "@/axios";
import { ProductType } from "../../types/data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const carouselSetting = {
  dots: false,
  arrows: false,
  slidesToShow: 1,
};

export const getServerSideProps = async () => {
  const res = await axiosInstance.get(
    "/api/products?orderby=created_at&sort=desc&limit=1"
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
    <Box
      backgroundColor={"primary"}
      paddingY={5}
      paddingX={5}
      minHeight={"calc(100vh - 80px)"}
      className="main-container"
    >
      <Slider {...carouselSetting}>
        {promotedProduct.length &&
          promotedProduct.map((product: ProductType, i: number) => (
            <Box key={i}>
              <Grid templateColumns={"repeat(2, 1fr)"} columnGap={5}>
                <GridItem>
                  <Img src={product.gambar_utama} maxHeight={400} />
                </GridItem>
                <GridItem>
                  <Box>
                    <Text fontWeight={"bold"} fontSize={50} color={"black"}>
                      {product.nama_produk}
                    </Text>
                    <Text color={"black"}>{product.short_desc ?? ""}</Text>
                    <Link href={"/menu"}>
                      <Button
                        position={"absolute"}
                        backgroundColor={"secondary"}
                        marginTop={5}
                      >
                        View Menu
                      </Button>
                    </Link>
                  </Box>
                </GridItem>
              </Grid>
            </Box>
          ))}
      </Slider>
    </Box>
  );
}

// Home.layout = (page: ReactElement) => {
//   return <Protected>{page}</Protected>;
// };
