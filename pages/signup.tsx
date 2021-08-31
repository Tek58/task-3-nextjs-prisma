import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { name, email, password, companyName };
      await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-lg">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitData}>
            <h1 className="text-5xl pb-5 italic font-semibold">Signup</h1>
          <input className="shadow appearance-none border border-500 rounded w-full py-2 px-3 text-gray-700 mb-3  focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name"
            autoFocus
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

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
          
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  mb-3 focus:outline-none focus:shadow-outline" id="copmanyName" type="text" placeholder="Company Name"
            autoFocus
            onChange={(e) => setCompanyName(e.target.value)}
            value={companyName}
          />

          <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={!password || !name || !email || !companyName}
            type="submit"
            value="Signup"
          />
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
