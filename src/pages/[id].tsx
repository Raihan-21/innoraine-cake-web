import axiosInstance from "@/axios";
import { Box, Flex, Img, Text } from "@chakra-ui/react";
import React from "react";
import { ProductType } from "../../types/data";

export const getServerSideProps = async ({ params }: { params: any }) => {
  //   const { id } = params;

  const res = await axiosInstance.get(`/api/products/${params.id}`);
  console.log(res.data.body);
  return {
    props: {
      data: res.data.body,
    },
  };
};

const menuDetail = ({ data }: { data: ProductType }) => {
  return (
    <Box paddingX={10}>
      <Flex columnGap={10}>
        <Img src={data.gambar_utama} maxWidth={400} />
        <Box>
          <Text fontWeight={"bold"} fontSize={30}>
            {data.nama_produk}
          </Text>
          <Text>{data.deskripsi}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default menuDetail;
