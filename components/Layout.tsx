import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

function Layout(props) {
  return (
    <div>
      <Header />
      <div className="layout">{props.children}</div>
      <style jsx global>{`
        html {
          box-sizing: border-box;
        }

        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }

        body {
          margin: 0;
          padding: 0;
          font-size: 16px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
            "Segoe UI Symbol";
          background: rgba(0, 0, 0, 0.05);
        }

        input,
        textarea {
          font-size: 16px;
        }

        button {
          cursor: pointer;
        }
      `}</style>
      <style jsx>{`
        .layout {
          background: #dcdcdc;
          position: absolute;
          top: 25%;
          left: 35%;
          width: 30rem;
          align-items: center;
          justify-content: center;
          padding: 0 2rem;
        }
      `}</style>
    </div>
  );
}

export default Layout;
