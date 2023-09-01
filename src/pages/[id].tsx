import axiosInstance from "@/axios";
import { Box, Button, Flex, Grid, GridItem, Img, Text } from "@chakra-ui/react";
import React, { useState, useCallback } from "react";
import { ImageType, ProductType } from "../../types/data";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const getServerSideProps = async ({ params }: { params: any }) => {
  //   const { id } = params;

  const [product, images] = await Promise.all([
    axiosInstance.get(`/api/products/${params.id}`),
    axiosInstance.get(`/api/products/gallery/${params.id}`),
  ]);
  let carouselSetting = {
    arrows: true,
    slidesToShow: 4,
  };
  if (images.data.body.length < 4) {
    carouselSetting.slidesToShow = images.data.body.length;
  }
  return {
    props: {
      data: product.data.body,
      images: images.data.body,
      carouselSetting,
    },
  };
};

const menuDetail = ({
  data,
  images,
  carouselSetting,
}: {
  data: ProductType;
  images: ImageType[];
  carouselSetting: any;
}) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [cartData, setCartData] = useState({
    jumlah: 0,
    harga: 0,
  });
  const addToCart = useCallback(async () => {
    setCartData({ jumlah: 1, harga: data.harga });
  }, [data, cartData]);
  const incrementProduct = useCallback(async () => {
    setCartData((prevState) => ({ ...prevState, jumlah: prevState.jumlah++ }));
  }, [cartData, data]);
  const decrementProduct = useCallback(async () => {
    if (cartData.jumlah === 1)
      setCartData((prevState) => ({ ...prevState, jumlah: 0, harga: 0 }));
    setCartData((prevState) => ({ ...prevState, jumlah: prevState.jumlah-- }));
  }, [cartData, data]);

  return (
    <Box paddingX={10}>
      <Grid columnGap={10} templateColumns={"repeat(2, 1fr)"}>
        {/* Min width 0 to fix react slick bug */}
        <GridItem minWidth={0}>
          <Box minWidth={0}>
            <Img
              src={selectedImage ? selectedImage : data.gambar_utama}
              width={"100%"}
              marginBottom={5}
            />
            <Box minWidth={0}>
              <Slider {...carouselSetting}>
                {images.length &&
                  images.map((image, i) => (
                    <Box
                      key={i}
                      borderRadius={10}
                      overflow={"hidden"}
                      onClick={() => setSelectedImage(image.url)}
                    >
                      <Img src={image.url} height={"100%"} />
                    </Box>
                  ))}
              </Slider>
            </Box>
          </Box>
        </GridItem>
        <GridItem>
          <Box paddingTop={8}>
            <Text fontWeight={"bold"} fontSize={30}>
              {data.nama_produk}
            </Text>
            <Text>{data.deskripsi}</Text>

            {cartData.jumlah < 1 ? (
              <Button
                backgroundColor={"black"}
                color={"white"}
                onClick={() => {
                  addToCart();
                }}
              >
                Order this menu
              </Button>
            ) : (
              <Flex alignItems={"center"} columnGap={5}>
                <Button borderRadius={"50%"} onClick={decrementProduct}>
                  -
                </Button>
                <Box>{cartData.jumlah}</Box>
                <Button borderRadius={"50%"} onClick={incrementProduct}>
                  +
                </Button>
              </Flex>
            )}
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default menuDetail;
