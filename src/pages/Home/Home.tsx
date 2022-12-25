import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Auth from "pages/Auth/Auth";
import Sidebar from "components/Sidebar/Sidebar";
import Suggestions from "components/Suggestions/Suggestions";
import TweetFormModal from "components/Modals/TweetFormModal/TweetFormModal";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchCurrentUser,
  selectCurrentUser,
} from "../../features/user/userSlice";
import { fetchTweets } from "features/tweet/tweetSlice";
import { fetchSuggestedUsers } from "../../features/user/userSlice";

import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

import UserOnboarding from "../../components/UserOnboarding/UserOnboarding";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

import { useAuth0 } from "@auth0/auth0-react";

import { Container } from "react-bootstrap";

const Home = (): JSX.Element => {
  const [userOnboarding, setUserOnboarding] = useState<boolean>(true);
  const currentUser = useAppSelector(selectCurrentUser);
  const [loading, setLoading] = useState<boolean>(true);
  const [showTweetFormModal, setShowTweetFormModal] = useState<boolean>(false);
  const location = useLocation();

  const dispatch = useAppDispatch();
  const { user } = useAuth0();

  // set document title
  useEffect(() => {
    document.title = "Home / Twitter";
  }, []);

  // fetch current user
  useEffect(() => {
    if (!user?.email) return;

    dispatch(fetchCurrentUser(user.email, setLoading));
  }, [user]);

  // check if user is a new user or not
  // if new user, show onboarding
  // if not, fetch tweets and suggested users
  useEffect(() => {
    if (!currentUser) {
      setUserOnboarding(true);
      return;
    }

    if (currentUser?.name && currentUser?.username && currentUser?.picture) {
      setUserOnboarding(false);

      dispatch(fetchSuggestedUsers(currentUser.email));
      dispatch(fetchTweets(currentUser));
    } else {
      setUserOnboarding(true);
    }
  }, [currentUser]);

  return (
    <>
      {location.pathname === "/" ? (
        <Auth />
      ) : (
        <>
          <Container fluid className="bg-white m-0 ps-md-0 ps-lg-3">
            <Row className="w-100 m-0 align-items-start">
              <Col
                md={2}
                lg={1}
                xl={3}
                className="h-100 sticky-top pe-0 ps-md-0 ps-lg-1"
              >
                <Sidebar
                  showTweetFormModal={showTweetFormModal}
                  setShowTweetFormModal={setShowTweetFormModal}
                />
              </Col>

              <Col md={9} lg={7} xl={5} className="border-end p-0">
                <Outlet />
              </Col>

              <Col
                md={0}
                lg={4}
                className="pe-sm-0 pe-xl-5 pb-5 position-sticky top-minus-25 d-none d-lg-block"
              >
                <Suggestions />
              </Col>
            </Row>

            {/* user onboaridng */}
            {userOnboarding && !loading && (
              <UserOnboarding setUserOnboarding={setUserOnboarding} />
            )}

            {/* tweet form modal */}
            {showTweetFormModal && (
              <TweetFormModal
                show={showTweetFormModal}
                setShowTweetFormModal={setShowTweetFormModal}
              />
            )}
          </Container>
        </>
      )}

      {/* loading */}
      {loading && <LoadingSpinner />}
    </>
  );
};

export default Home;
