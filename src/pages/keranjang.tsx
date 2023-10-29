import axiosInstance from "@/axios";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useState, useEffect, useCallback } from "react";
import { ProductType, UserType } from "../../types/data";
import CartItem from "@/components/organisms/CartItem";
import useMainStore from "@/store";
import { useRouter } from "next/router";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // const res = await axiosInstance.get()
  const profile = JSON.parse(context.req.cookies.innoraine_profile || "{}");
  try {
    const res = await axiosInstance.get(`/api/cart/${profile.id}`);
    return {
      props: {
        cart: res.data.body,
      },
    };
  } catch (error) {
    throw error;
  }
};

const keranjang = ({ cart }: { cart: any }) => {
  const [step, setStep] = useState(1);
  const profile = useMainStore((state: any) => state.profile);
  const [formData, setFormData] = useState<UserType>({
    id: 0,
    nama: "",
    email: "",
    alamat: "string",
    no_telp: 0,
    role: { id: 0, nama_role: "" },
  });
  const toast = useToast();
  const router = useRouter();
  const order = useCallback(async () => {
    try {
      const res = await axiosInstance.post("/api/order", {
        items: cart.data.map((item: any) => item),
        id_user: formData.id,
        nama: formData.nama,
        no_telp: formData.no_telp,
        alamat: formData.alamat,
      });
      toast({
        title: "Order success",
        status: "success",
        duration: 5000,
        isClosable: false,
      });
      router.push(`/invoice/${res.data.body.data.id}`);
    } catch (error) {
      throw error;
    }
  }, [formData]);
  useEffect(() => {
    setFormData({ ...profile });
    console.log(profile);
  }, [profile]);

  return (
    <Box padding={5}>
      <Text fontWeight={"bold"} fontSize={"3xl"} marginBottom={5}>
        Keranjang
      </Text>
      {!cart.data.length ? (
        <Flex justifyContent={"center"}>
          Anda belum memiliki kue apapun dalam keranjang
        </Flex>
      ) : (
        <Box>
          {step === 1 && (
            <Box>
              <Grid
                columnGap={10}
                templateColumns={"repeat(5, 1fr)"}
                borderBottom={"2px solid gray"}
                paddingBottom={3}
                marginBottom={5}
                // borderColor={"black"}
              >
                <GridItem colSpan={2}>
                  <Text fontWeight={"bold"} color={"gray"}>
                    Produk
                  </Text>
                </GridItem>
                <GridItem colSpan={1}>
                  <Text fontWeight={"bold"} color={"gray"}>
                    Jumlah
                  </Text>
                </GridItem>
                <GridItem colSpan={1}>
                  <Text fontWeight={"bold"} color={"gray"}>
                    Harga
                  </Text>
                </GridItem>
                <GridItem colSpan={1}></GridItem>
              </Grid>
              {cart.data.length &&
                cart.data.map((item: any, i: number) => (
                  <CartItem key={i} data={item} />
                ))}
              <Grid templateColumns={"repeat(5,1fr)"}>
                <GridItem colSpan={2}></GridItem>
                <GridItem colSpan={1}></GridItem>
                <GridItem colSpan={1}>
                  <Flex columnGap={5} marginBottom={5}>
                    <Text>Subtotal</Text>
                    <Text fontWeight={"bold"}>
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(cart.total_harga)}
                    </Text>
                  </Flex>
                  <Button
                    backgroundColor={"black"}
                    color={"white"}
                    onClick={() => {
                      setStep(2);
                    }}
                  >
                    Checkout
                  </Button>
                </GridItem>
              </Grid>
            </Box>
          )}
          {step === 2 && (
            <Grid templateColumns={"repeat(3, 1fr)"} columnGap={5}>
              <GridItem
                colSpan={2}
                borderRadius={10}
                boxShadow={"0px 0px 5px 1px gray"}
                padding={5}
              >
                <Box>
                  <form action="">
                    <Grid
                      templateColumns={"repeat(2, 1fr)"}
                      columnGap={5}
                      rowGap={5}
                    >
                      <FormControl>
                        <FormLabel>Nama</FormLabel>
                        <Input
                          type="text"
                          value={formData.nama}
                          onChange={(e) => {
                            setFormData((prevState) => ({
                              ...prevState,
                              nama: prevState.nama,
                            }));
                          }}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>No telpon</FormLabel>
                        <Input
                          type="number"
                          value={formData.no_telp}
                          onChange={(e) => {
                            setFormData((prevState) => ({
                              ...prevState,
                              no_telp: prevState.no_telp,
                            }));
                          }}
                        />
                      </FormControl>
                      <GridItem colSpan={2}>
                        <FormControl>
                          <FormLabel>Alamat</FormLabel>
                          <Textarea
                            value={formData.alamat}
                            onChange={(e) =>
                              setFormData((prevState) => ({
                                ...prevState,
                                alamat: prevState.alamat,
                              }))
                            }
                          />
                        </FormControl>
                      </GridItem>
                    </Grid>
                  </form>
                </Box>
              </GridItem>
              <GridItem
                boxShadow={"0px 0px 5px 1px gray"}
                borderRadius={10}
                padding={3}
              >
                <Box>Your order</Box>{" "}
                <VStack spacing={5} align={"flex-start"}>
                  {cart.data.length &&
                    cart.data.map((item: any, i: number) => (
                      <Flex
                        columnGap={3}
                        borderBottom={"1px solid gray"}
                        paddingBottom={2}
                        width={"100%"}
                        key={i}
                      >
                        <Image
                          src={item.produk.gambar_utama}
                          width={75}
                          borderRadius={5}
                        />
                        <Box>
                          <Text fontWeight={"bold"}>
                            {item.produk.nama_produk}
                          </Text>
                          <Flex columnGap={2}>
                            <Text fontWeight={"bold"}>
                              {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              }).format(item.produk.harga)}
                            </Text>
                            <Text>x {item.jumlah}</Text>
                          </Flex>
                        </Box>
                      </Flex>
                    ))}
                </VStack>
                <Flex columnGap={7} marginTop={5} marginBottom={5}>
                  <Text fontWeight={"bold"} fontSize={"large"}>
                    Total
                  </Text>
                  <Text fontWeight={"bold"} fontSize={"large"}>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(cart.total_harga)}
                  </Text>
                </Flex>
                <Button
                  backgroundColor={"black"}
                  color={"white"}
                  width={"100%"}
                  onClick={order}
                >
                  Order now
                </Button>
              </GridItem>
            </Grid>
          )}
        </Box>
      )}
    </Box>
  );
};

export default keranjang;
