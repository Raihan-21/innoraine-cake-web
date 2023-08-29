import ProtectedTemplate from "@/components/templates/protected";
import React, { ReactElement } from "react";

const test = () => {
  return (
    <div>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi recusandae
      magnam laborum nostrum dolores consequatur incidunt non quia fuga ad!
      Obcaecati saepe repudiandae quas unde et nobis ipsam eaque dolorem.
    </div>
  );
};

export default test;

test.Layout = (page: ReactElement) => {
  return <ProtectedTemplate>{page}</ProtectedTemplate>;
};
