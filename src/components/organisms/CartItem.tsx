import axiosInstance from "@/axios";
import useMainStore from "@/store";
import {
  Box,
  Flex,
  Image,
  Button,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";

const CartItem = ({ data }: { data: any }) => {
  const [cartData, setCartData] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const profile = useMainStore((state: any) => state.profile);
  const incrementProduct = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.put("/api/cart", {
        id_user: profile.id,
        id_produk: cartData.produk.id,
        operation: "increment",
      });
      setCartData((prevState: any) => ({
        ...prevState,
        jumlah: Number(prevState.jumlah) + 1,
        harga: Number(prevState.harga) + cartData.produk.harga,
      }));
      //   setCartData((prevState) => ({
      //     ...prevState,
      //     jumlah: prevState.jumlah + 1,
      //     harga: prevState.harga + Number(data.harga),
      //   }));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [cartData]);
  const decrementProduct = useCallback(async () => {
    if (cartData.jumlah == 1) return;
    setIsLoading(true);
    try {
      const res = await axiosInstance.put("/api/cart", {
        id_user: profile.id,
        id_produk: cartData.produk.id,
        operation: "decrement",
      });
      setCartData((prevState: any) => ({
        ...prevState,
        jumlah: prevState.jumlah - 1,
        harga: Number(prevState.harga) - prevState.produk.harga,
      }));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }

    // const res = await axiosInstance.post("/api/cart", {
    //   id_produk: data.id,
    //   jumlah: cartData.jumlah,
    //   harga: cartData.harga,
    // });
  }, [cartData]);

  return (
    <Grid
      columnGap={10}
      templateColumns="repeat(3, 1fr)"
      alignItems={"center"}
      marginBottom={5}
    >
      <GridItem>
        <Flex columnGap={5}>
          <Image
            src={cartData.produk.gambar_utama}
            width={100}
            borderRadius={"md"}
          />
          <Box>
            <Text fontWeight={"bold"}>{cartData.produk.nama_produk}</Text>
            <Text fontSize={"small"} color={"gray.500"}>
              {cartData.kategori.nama_kategori}
            </Text>
          </Box>
        </Flex>
      </GridItem>
      <GridItem>
        <Box>
          <Flex alignItems={"center"} columnGap={3}>
            {/* <Text fontSize={"small"}>x</Text> */}
            <Button disabled={isLoading} onClick={decrementProduct}>
              -
            </Button>
            <Text>{cartData.jumlah}</Text>
            <Button disabled={isLoading} onClick={incrementProduct}>
              +
            </Button>
          </Flex>
        </Box>
      </GridItem>
      <GridItem>
        <Box>
          <Text fontWeight={"bold"}>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(cartData.harga)}
          </Text>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default CartItem;
