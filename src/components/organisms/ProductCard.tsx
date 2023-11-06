import { Box, Flex, Button, Link, Img, Text } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { ProductType } from "../../../types/data";
import Card from "../molecules/Card";

const ProductCard = ({ data }: { data: ProductType }) => {
  const [cartData, setCartData] = useState({
    id: 0,
    jumlah: 0,
  });
  const addToCart = useCallback(() => {
    setCartData({ ...data, jumlah: 1 });
  }, [cartData, data]);

  const incrementProduct = useCallback(async () => {
    setCartData((prevState) => ({ ...prevState, jumlah: prevState.jumlah++ }));
  }, [data, cartData]);
  const decrementProduct = useCallback(async () => {
    if (cartData.jumlah === 1) setCartData({ id: 0, jumlah: 0 });
    setCartData((prevState) => ({
      ...prevState,
      jumlah: prevState.jumlah--,
    }));
  }, [data, cartData]);

  return (
    <Card>
      <Flex
        flexDirection={"column"}
        justifyContent={"space-between"}
        height={"100%"}
      >
        <Box>
          <Link href={`/${data.slug}`}>
            <Img
              src={data.gambar_utama}
              width={"100%"}
              borderRadius={10}
              marginBottom={3}
              height={173}
              objectFit={"cover"}
            />
          </Link>
          <Text fontWeight={"extrabold"} fontSize={"large"}>
            {data.nama_produk}
          </Text>
          {/* <Text>{data.deskripsi}</Text> */}
        </Box>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          columnGap={5}
          //   marginTop={5}
        >
          {/* {!cartData.id ? (
            <Button
              backgroundColor={"black"}
              color={"white"}
              onClick={() => {
                addToCart();
              }}
            >
              Add to cart
            </Button>
          ) : (
            <Flex columnGap={3} alignItems={"center"}>
              <Button
                borderRadius={"50%"}
                padding={1}
                onClick={() => decrementProduct()}
              >
                -
              </Button>
              <Box>{cartData.jumlah}</Box>
              <Button borderRadius={"50%"} onClick={() => incrementProduct()}>
                +
              </Button>
            </Flex>
          )} */}
          <Text fontWeight={"bold"}>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(data.harga)}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ProductCard;
