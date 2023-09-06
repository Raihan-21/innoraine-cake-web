import axiosInstance from "@/axios";
import { Box, Button, Flex, Grid, GridItem, Img, Text } from "@chakra-ui/react";
import React, { useState, useCallback } from "react";
import { ImageType, ProductType } from "../../types/data";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useMainStore from "@/store";
import { useRouter } from "next/router";

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
    jumlah: 1,
    harga: Number(data.harga),
  });
  const isLoggedIn = useMainStore((state: any) => state.isLoggedIn);
  const profile = useMainStore((state: any) => state.profile);
  const router = useRouter();
  const addToCart = useCallback(async () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    // setCartData({ jumlah: 1, harga: data.harga });
    try {
      const res = await axiosInstance.post(`/api/cart`, {
        id_user: profile.id,
        id_produk: router.query.id,
        jumlah: cartData.jumlah,
        harga: cartData.harga,
      });
    } catch (error) {
      throw error;
    }
  }, [isLoggedIn, profile, data, cartData]);
  const incrementProduct = useCallback(async () => {
    try {
      // const res = await axiosInstance.put("/api/cart", {
      //   id_user: profile.id,
      //   id_produk: data.id,
      //   operation: "increment",
      // });
      setCartData((prevState) => ({
        ...prevState,
        jumlah: prevState.jumlah + 1,
        harga: prevState.harga + Number(data.harga),
      }));
    } catch (error) {}
  }, [profile, cartData, data]);
  const decrementProduct = useCallback(async () => {
    try {
      // const res = await axiosInstance.put("/api/cart", {
      //   id_user: profile.id,
      //   id_produk: data.id,
      //   operation: "decrement",
      // });
      if (cartData.jumlah === 1)
        setCartData((prevState) => ({ ...prevState, jumlah: 0, harga: 0 }));
      setCartData((prevState) => ({
        ...prevState,
        jumlah: prevState.jumlah--,
        harga: prevState.harga - data.harga,
      }));
    } catch (error) {}

    // const res = await axiosInstance.post("/api/cart", {
    //   id_produk: data.id,
    //   jumlah: cartData.jumlah,
    //   harga: cartData.harga,
    // });
  }, [cartData, data]);

  return (
    <Box paddingX={10}>
      <Grid columnGap={10} templateColumns={"repeat(3, 1fr)"}>
        {/* Min width 0 to fix react slick bug */}
        <GridItem minWidth={0} colSpan={1}>
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
                      height={"100%"}
                      onClick={() => setSelectedImage(image.url)}
                    >
                      <Img src={image.url} height={"100%"} width={"150px"} />
                    </Box>
                  ))}
              </Slider>
            </Box>
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Box paddingTop={8}>
            <Text fontWeight={"bold"} fontSize={30}>
              {data.nama_produk}
            </Text>
            <Text>{data.deskripsi}</Text>

            <Flex alignItems={"center"} columnGap={5}>
              <Button borderRadius={"50%"} onClick={decrementProduct}>
                -
              </Button>
              <Box>{cartData.jumlah}</Box>
              <Button borderRadius={"50%"} onClick={incrementProduct}>
                +
              </Button>
            </Flex>
            <Button
              backgroundColor={"black"}
              color={"white"}
              onClick={() => {
                addToCart();
              }}
            >
              Order this menu
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default menuDetail;
