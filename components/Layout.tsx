import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

function Layout(props) {
  return (
    <div>
      <Header />
      <div className="flex mt-32 justify-center">{props.children}</div>
    </div>
  );
}

export default Layout;
