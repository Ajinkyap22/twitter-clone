import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";

type Props = {};

const Home = (props: Props) => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    try {
      await loginWithRedirect({
        returnTo: "/profile",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button onClick={handleLogin}>Login</Button>

      <Button
        onClick={() =>
          loginWithRedirect({
            screen_hint: "signup",
          })
        }
      >
        Sign Up
      </Button>
    </div>
  );
};

export default Home;
