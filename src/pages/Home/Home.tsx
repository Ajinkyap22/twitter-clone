import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Auth from "pages/Auth/Auth";
import Sidebar from "components/Sidebar/Sidebar";
import Suggestions from "components/Suggestions/Suggestions";
import TweetFormModal from "components/Modals/TweetFormModal/TweetFormModal";
import MobileNav from "components/MobileNav/MobileNav";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchCurrentUser,
  selectCurrentUser,
} from "../../features/user/userSlice";
import { fetchTweets } from "features/tweet/tweetSlice";
import { fetchSuggestedUsers } from "../../features/user/userSlice";

import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";

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
          <Container fluid className="bg-white m-0 px-0 ps-lg-3">
            <Row className="w-100 m-0 align-items-start">
              <Col
                xs={0}
                sm={2}
                lg={1}
                xl={3}
                className="h-100 sticky-top pe-0 ps-md-0 ps-lg-1 d-none d-sm-block"
              >
                <Sidebar
                  showTweetFormModal={showTweetFormModal}
                  setShowTweetFormModal={setShowTweetFormModal}
                />
              </Col>

              <Col xs={12} sm={10} md={9} lg={7} xl={5} className="p-0">
                <Outlet />
              </Col>

              <Col
                sm={0}
                lg={4}
                className="border-start pe-sm-0 pe-xl-5 pb-5 position-sticky top-minus-25 d-none d-lg-block"
              >
                <Suggestions />
              </Col>

              <MobileNav />

              <Button
                className="fixed-bottom-right w-fit bg-blue border-0 rounded-circle fw-bold py-3 px-3 cursor-pointe d-inline d-sm-none"
                onClick={() => setShowTweetFormModal(true)}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="white"
                >
                  <g>
                    <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path>
                  </g>
                </svg>
              </Button>
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
