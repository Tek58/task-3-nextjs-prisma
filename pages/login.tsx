import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { signIn } from "next-auth/client";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: `${window.location.origin}/`,
        redirect: false,
      }).then(function (result) {
        if (result.error == null) {
          Router.push("/");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-lg">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitData}>
          <h1 className="text-5xl pb-5 italic font-semibold">Login</h1>
          <input className="shadow appearance-none border border-500 rounded w-full py-2 px-3 text-gray-700 mb-3  focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input className="shadow appearance-none border border-500 rounded w-full py-2 px-3 text-gray-700 mb-3  focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password"
            autoFocus
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={!email || !password}
            type="submit"
            value="Login"
          />
        </form>
      </div>
    </Layout>
  );
};

export default Login;
