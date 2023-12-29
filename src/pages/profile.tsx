import axiosInstance from "@/axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

export const getServerSideProps = async (context: any) => {
  const profile = JSON.parse(context.req.cookies.innoraine_profile);
  try {
    const res = await axiosInstance.get(`/api/user/profile/${profile.id}`);
    console.log(res.data.body);
    return {
      props: {
        data: res.data.body,
      },
    };
  } catch (error) {
    throw error;
  }
};

const Profile = ({ data }: { data: any }) => {
  const [formData, setFormData] = useState(data);
  return (
    <Box padding={10}>
      <Text fontSize={"3xl"} fontWeight={"bold"}>
        Data akun
      </Text>
      <form>
        <Grid templateColumns={"repeat(2, 1fr)"} columnGap={5} rowGap={5}>
          <GridItem>
            <FormControl>
              <FormLabel>Nama</FormLabel>
              <Input value={formData.nama} />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input value={formData.email} />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>No telp</FormLabel>
              <Input value={formData.no_telp} />
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Alamat</FormLabel>
              <Input value={formData.alamat} />
            </FormControl>
          </GridItem>
        </Grid>
        <Button marginTop={5}>Ubah</Button>
      </form>
    </Box>
  );
};

export default Profile;
