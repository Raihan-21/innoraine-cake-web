import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import React from "react";

const TentangKami = () => {
  return (
    <Box padding={10} backgroundColor={"#F2F2F2"}>
      <Grid templateColumns={"repeat(2, 1fr)"}>
        {" "}
        <GridItem height={"100%"}>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            height={"100%"}
          >
            <Text fontWeight={"bold"} fontSize={"3xl"} marginBottom={6}>
              Tentang Kami
            </Text>
            <Text fontSize={"xl"} marginBottom={5}>
              Selamat datang di Innoraine Cake, toko roti ternama yang berlokasi
              di Depok, Jawa Barat, Indonesia. Dengan hasrat untuk menciptakan
              suguhan lezat, kami berusaha keras untuk menyediakan makanan
              panggang dengan kualitas terbaik kepada pelanggan kami.
            </Text>
            <Text fontSize={"xl"}>
              {" "}
              Dengan semangat kami dalam membuat kue dan detail, kami berupaya
              menciptakan kue unik dan personal yang tidak hanya terasa luar
              biasa namun juga meninggalkan kesan mendalam.
            </Text>
          </Flex>
        </GridItem>
        <GridItem>
          <Image src="/about-us.jpg" />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default TentangKami;
