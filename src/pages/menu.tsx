import axiosInstance from "@/axios";
import { Box, Button, Flex, Grid, GridItem, Img, Text } from "@chakra-ui/react";
import React from "react";
import { ProductType } from "../../types/data";
import Slider from "react-slick";
import Card from "@/components/molecules/Card";
import Link from "next/link";

const carouselSetting = {
  dots: true,
};
export const getServerSideProps = async () => {
  const res = await axiosInstance.get(`/api/products`);
  return {
    props: {
      products: res.data.body,
    },
  };
};

const produk = ({ products }: { products: ProductType[] }) => {
  return (
    <Box backgroundColor={"black"} padding={20}>
      <Grid columnGap={10} templateColumns={"repeat(4, 1fr)"}>
        {products.length &&
          products.map((product, i) => (
            <GridItem key={i}>
              <Card>
                <Flex
                  flexDirection={"column"}
                  justifyContent={"space-between"}
                  height={"100%"}
                >
                  <Box>
                    <Link href={`/${product.id}`}>
                      <Img
                        src={product.gambar_utama}
                        // maxWidth={200}
                        borderRadius={10}
                        marginBottom={3}
                        height={173}
                      />
                    </Link>
                    <Text fontWeight={"bold"}>{product.nama_produk}</Text>
                    <Text>{product.deskripsi}</Text>
                  </Box>
                  <Flex
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    columnGap={5}
                    marginTop={5}
                  >
                    <Button backgroundColor={"black"} color={"white"}>
                      Add to cart
                    </Button>
                    <Text fontWeight={"bold"}>
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(product.harga)}
                    </Text>
                  </Flex>
                </Flex>
              </Card>
            </GridItem>
          ))}
      </Grid>
    </Box>
  );
};

export default produk;
