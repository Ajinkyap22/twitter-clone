import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchCurrentUser,
  selectCurrentUser,
} from "../../features/user/userSlice";

import { useAuth0 } from "@auth0/auth0-react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/row";
import Col from "react-bootstrap/col";

import UserOnboarding from "../../components/UserOnboarding/UserOnboarding";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Feed = (): JSX.Element => {
  const [userOnboarding, setUserOnboarding] = useState<boolean>(false);
  const currentUser = useAppSelector(selectCurrentUser);
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const { user } = useAuth0();

  useEffect(() => {
    document.title = "Home / Twitter";
  }, []);

  useEffect(() => {
    if (!user?.email) return;

    dispatch(fetchCurrentUser(user.email, setLoading));
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
    <Container fluid className="h-100 bg-white m-0">
      <Row className="w-100 h-100 m-0">
        <Col
          md={3}
          className="border-end d-flex align-items-end flex-column justify-content-between"
        >
          <Sidebar />
        </Col>

        <Col md={5} className=" border-end ">
          2
        </Col>

        <Col md={4} className=" border-end ">
          3
        </Col>
      </Row>

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
