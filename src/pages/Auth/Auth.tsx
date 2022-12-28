import React from "react";

import { useAuth0 } from "@auth0/auth0-react";

import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";

import Logo from "assets/images/Logo.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Auth = (): JSX.Element => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    try {
      await loginWithRedirect({
        returnTo: "/home",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async () => {
    try {
      await loginWithRedirect({
        screen_hint: "signup",
        returnTo: "/home",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // container-fluid
    <Container
      fluid
      className="bg-body-primary d-flex justify-content-center align-items-center h-100 text-default"
    >
      <div className="bg-auth w-35 shadow d-flex flex-column justify-content-center align-items-center rounded-3 p-4 w-md-50 w-sm-70 w-xs-80">
        {/* twitter logo */}
        <LazyLoadImage src={Logo} alt="" className="w-2" />

        {/* welcome */}
        <h2 className="text-center mt-4 fw-bold">Sign in to Twitter</h2>

        {/* login */}
        <Button
          variant="primary my-3 mt-4 w-75 rounded-pill"
          className="text-white"
          onClick={handleLogin}
        >
          Log in
        </Button>

        {/* signup */}
        <Button
          variant="outline-primary my-2 w-75 rounded-pill"
          onClick={handleSignup}
        >
          Sign up
        </Button>
      </div>
    </Container>
  );
};

export default Auth;
