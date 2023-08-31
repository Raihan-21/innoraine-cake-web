import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import useMainStore from "./store";

const middleware = async (request: NextRequest) => {
  //   const setToken = useMainStore((state: any) => state.setToken);
  //   const token = useMainStore((state: any) => state.token);
  //   const tokenCookie = request.cookies.get("innoraine_token");
  //   setToken(tokenCookie);
  //   console.log(token);
  //   console.log(request.cookies.getAll());
  //   const cookiesData = cookies();
  //   console.log(cookiesData.getAll());
};
export default middleware;
