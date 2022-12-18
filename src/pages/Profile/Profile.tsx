import { useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";

const Profile = () => {
  const { logout, isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) return;
  }, [isAuthenticated]);

  const handleLogout = async () => {
    try {
      await logout({
        returnTo: window.location.origin,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isAuthenticated && (
        <div>
          <img src={user?.picture} alt={user?.name} />
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      )}
    </div>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <div>Loading...</div>,
});
