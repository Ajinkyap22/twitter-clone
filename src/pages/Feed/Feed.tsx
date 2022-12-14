import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchCurrentUser,
  selectCurrentUser,
} from "../../features/user/userSlice";
import { useAuth0 } from "@auth0/auth0-react";

import Container from "react-bootstrap/Container";

import UserOnboarding from "../../components/UserOnboarding/UserOnboarding";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Feed = (): JSX.Element => {
  const [userOnboarding, setUserOnboarding] = useState<boolean>(false);
  const currentUser = useAppSelector(selectCurrentUser);
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const { user } = useAuth0();

  useEffect(() => {
    if (!user?.email) return;

    dispatch(fetchCurrentUser(user?.email, setLoading));
  }, [user]);

  useEffect(() => {
    if (!currentUser) {
      setUserOnboarding(true);
      return;
    }

    if (currentUser?.name && currentUser?.username && currentUser?.picture) {
      setUserOnboarding(false);
    } else {
      setUserOnboarding(true);
    }
  }, [currentUser]);

  return (
    <Container fluid className="h-100">
      {/* sidebar */}

      {/* user onboaridng */}
      {userOnboarding && !loading && (
        <UserOnboarding setUserOnboarding={setUserOnboarding} />
      )}

      {/* loading */}
      {loading && <LoadingSpinner />}
    </Container>
  );
};

export default Feed;
