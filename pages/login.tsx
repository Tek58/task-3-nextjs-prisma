import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';
import { signIn } from 'next-auth/client';

const Draft: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const submitData = async (e: React.SyntheticEvent) => {
  e.preventDefault();
  try {
    await signIn('credentials',
      {
        email,
        password,
        callbackUrl: `${window.location.origin}/` ,
        redirect: false,
      }
    ).then(function(result){
      if (result.error == null)
      {
        Router.push("/");
      }
  });
    
  } catch (error) {
    console.error(error);
  }
};

  return (
    <Layout>
      <div className="container">
        <form onSubmit={submitData}>
          <h1>Login</h1>
          <input
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="text"
            value={email}
          />
          <input
            autoFocus
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            value={password}
          />

          <input className="butn" disabled={!email || !password} type="submit" value="Login" />

        </form>
        {/* <div>
          <p>Dont have an account?</p>
          <p>Signup</p>
        </div> */}
      </div>
      <style jsx>{`
      
        .container {
          margin-bottom: 25px;
        }
        .page {
          
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        .butn {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='password'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: gray;
          color: black;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
