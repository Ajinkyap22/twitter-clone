import React, { useState, useEffect } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/user/userSlice";

import Logo from "../../assets/images/Logo.svg";

import { ListGroupItem } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Popover } from "react-bootstrap";
import { OverlayTrigger } from "react-bootstrap";

import { useAuth0 } from "@auth0/auth0-react";
import { LazyLoadImage } from "react-lazy-load-image-component";

type props = {
  showTweetFormModal: boolean;
  setShowTweetFormModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const Sidebar = ({
  showTweetFormModal,
  setShowTweetFormModal,
}: props): JSX.Element => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [currentPage, setCurrentPage] = useState<string>("home");

  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth0();

  useEffect(() => {
    if (location.pathname === "/home") setCurrentPage("home");
    if (location.pathname === "/bookmarks") setCurrentPage("bookmarks");
    if (location.pathname.split("/")[1] === currentUser?.username)
      setCurrentPage("profile");
  }, [location.pathname, currentUser?.username]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleTweetFormShow = () => {
    setShowTweetFormModal(!showTweetFormModal);
  };

  return (
    <div className="h-100vh sticky-top d-flex flex-column align-items-end justify-content-between pe-sm-3 mt-1">
      <ListGroup className="d-flex align-items-start pe-sm-1 pe-xl-5">
        {/* twitter logo */}
        <Link to="/home">
          <ListGroupItem className="cursor-pointer bg-transparent border-0 d-flex justify-content-start w-100 p-0 bg-body-primary">
            <button className="border-0 cursor-pointer bg-body-primary logo-hover p-3">
              <LazyLoadImage src={Logo} alt="Logo" className="w-6 h-6" />
            </button>
          </ListGroupItem>
        </Link>

        {/* home */}
        <Link to="/home">
          <ListGroupItem
            className="text-default cursor-pointer bg-transparent border-0 d-flex my-1 py-2_5 align-items-center link-hover rounded-pill text-decoration-none"
            active={false}
          >
            {currentPage === "home" ? (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-5 h-5 fill"
              >
                <g>
                  <path d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z"></path>
                </g>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-5 h-5 fill"
              >
                <g>
                  <path d="M12 9c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm0-13.304L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM19 19.5c0 .276-.224.5-.5.5h-13c-.276 0-.5-.224-.5-.5V8.429l7-4.375 7 4.375V19.5z"></path>
                </g>
              </svg>
            )}
            <span className="ms-3 me-2 m-0 text-wrap h5 fw-normal d-none d-xl-inline text-decoration-none">
              Home
            </span>
          </ListGroupItem>
        </Link>

        {/* explore */}
        <ListGroupItem className="cursor-pointer text-default bg-transparent border-0 d-flex my-1 py-2_5 align-items-center link-hover rounded-pill">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill">
            <g>
              <path d="M10.09 3.098L9.72 7h5.99l.39-4.089 1.99.187L17.72 7h3.78v2h-3.97l-.56 6h3.53v2h-3.72l-.38 4.089-1.99-.187.36-3.902H8.78l-.38 4.089-1.99-.187L6.77 17H2.5v-2h4.46l.56-6H3.5V7h4.21l.39-4.089 1.99.187zM14.96 15l.56-6H9.53l-.56 6h5.99z"></path>
            </g>
          </svg>
          <span className="ms-3 me-2 m-0 text-wrap h5 fw-normal d-none d-xl-inline">
            Explore
          </span>
        </ListGroupItem>

        {/* notifications */}
        <ListGroupItem className="cursor-pointer text-default bg-transparent border-0 d-flex my-1 py-2_5 align-items-center link-hover rounded-pill">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill">
            <g>
              <path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"></path>
            </g>
          </svg>
          <span className="ms-3 me-2 m-0 text-wrap h5 fw-normal d-none d-xl-inline">
            Notifications
          </span>
        </ListGroupItem>

        {/* messages */}
        <ListGroupItem className="cursor-pointer text-default bg-transparent border-0 d-flex my-1 py-2_5 align-items-center link-hover rounded-pill">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill">
            <g>
              <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path>
            </g>
          </svg>
          <span className="ms-3 me-2 m-0 text-wrap h5 fw-normal d-none d-xl-inline">
            Messages
          </span>
        </ListGroupItem>

        {/* bookmarks */}
        <Link to="/bookmarks">
          <ListGroupItem className="cursor-pointer text-default bg-transparent border-0 d-flex my-1 py-2_5 align-items-center link-hover rounded-pill">
            {currentPage === "bookmarks" ? (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-5 h-5 fill"
              >
                <g>
                  <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z"></path>
                </g>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-5 h-5 fill"
              >
                <g>
                  <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path>
                </g>
              </svg>
            )}

            <span className="ms-3 me-2 m-0 text-wrap h5 fw-normal d-none d-xl-inline">
              Bookmarks
            </span>
          </ListGroupItem>
        </Link>

        {/* lists */}
        <ListGroupItem className="cursor-pointer text-default bg-transparent border-0 d-flex my-1 py-2_5 align-items-center link-hover rounded-pill">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill">
            <g>
              <path d="M3 4.5C3 3.12 4.12 2 5.5 2h13C19.88 2 21 3.12 21 4.5v15c0 1.38-1.12 2.5-2.5 2.5h-13C4.12 22 3 20.88 3 19.5v-15zM5.5 4c-.28 0-.5.22-.5.5v15c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-15c0-.28-.22-.5-.5-.5h-13zM16 10H8V8h8v2zm-8 2h8v2H8v-2z"></path>
            </g>
          </svg>

          <span className="ms-3 me-2 m-0 text-wrap h5 fw-normal d-none d-xl-inline">
            Lists
          </span>
        </ListGroupItem>

        {/* profile */}
        <Link to={`/${currentUser?.username}`}>
          <ListGroupItem className="cursor-pointer text-default bg-transparent border-0 d-flex my-1 py-2_5 align-items-center link-hover rounded-pill">
            {currentPage === "profile" ? (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-5 h-5 fill"
              >
                <g>
                  <path d="M17.863 13.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44zM12 2C9.791 2 8 3.79 8 6s1.791 4 4 4 4-1.79 4-4-1.791-4-4-4z"></path>
                </g>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-5 h-5 fill"
              >
                <g>
                  <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
                </g>
              </svg>
            )}
            <span className="ms-3 me-2 m-0 text-wrap h5 fw-light d-none d-xl-inline">
              Profile
            </span>
          </ListGroupItem>
        </Link>

        {/* more */}
        <ListGroupItem className="cursor-pointer text-default bg-transparent border-0 d-flex my-1 py-2_5 align-items-center link-hover rounded-pill">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill">
            <g>
              <path d="M3.75 12c0-4.56 3.69-8.25 8.25-8.25s8.25 3.69 8.25 8.25-3.69 8.25-8.25 8.25S3.75 16.56 3.75 12zM12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-4.75 11.5c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25S6 11.31 6 12s.56 1.25 1.25 1.25zm9.5 0c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25-1.25.56-1.25 1.25.56 1.25 1.25 1.25zM13.25 12c0 .69-.56 1.25-1.25 1.25s-1.25-.56-1.25-1.25.56-1.25 1.25-1.25 1.25.56 1.25 1.25z"></path>
            </g>
          </svg>
          <span className="ms-3 me-2 m-0 text-wrap h5 fw-light d-none d-xl-inline">
            More
          </span>
        </ListGroupItem>

        {/* tweet */}
        <ListGroupItem className="bg-transparent text-default border-0 d-flex my-1 py-2_5 mt-1 px-0 align-self-stretch d-none d-xl-inline-flex">
          <Button
            className="bg-blue border-0 rounded-pill ps-5 pe-5 flex-grow-1 fw-bold h6 py-2_5 button-hover cursor-pointer"
            onClick={handleTweetFormShow}
          >
            Tweet
          </Button>
        </ListGroupItem>

        <ListGroupItem className="bg-transparent text-default border-0 d-flex my-1 py-2_5 mt-1 px-0 align-self-center d-block d-xl-none">
          <Button
            className="bg-blue border-0 rounded-pill flex-grow-1 fw-bold h6 py-2_5 button-hover cursor-pointer"
            onClick={handleTweetFormShow}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="w-4 h-4"
              fill="white"
            >
              <g>
                <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path>
              </g>
            </svg>
          </Button>
        </ListGroupItem>
      </ListGroup>

      {/* user details */}
      <ListGroup hidden={!currentUser}>
        <OverlayTrigger
          trigger="click"
          placement="top"
          overlay={
            <Popover id="popover-basic">
              <Popover.Body className="p-0">
                <Button
                  onClick={handleLogout}
                  variant="light"
                  className="fw-bold p-2 py-2_5 logout text-break"
                >
                  Log out of @{currentUser?.username}
                </Button>
              </Popover.Body>
            </Popover>
          }
        >
          <ListGroupItem className="text-default d-flex bg-transparent border-0 align-items-center cursor-pointer link-hover rounded-pill mb-3">
            {/* profile picture */}
            <div>
              <LazyLoadImage
                src={currentUser?.picture}
                alt="Logo"
                className="w-8 h-8 object-center rounded-circle"
              />
            </div>

            {/* name & username */}
            <div className="ms-3 me-4 d-none d-xl-inline">
              <h6 className="mb-0">
                {
                  // if user name's length is greater than or equal to 20 then show only 20 characters and add ...
                  currentUser && currentUser?.name.length >= 20
                    ? currentUser?.name.slice(0, 17) + "..."
                    : currentUser?.name
                }
              </h6>
              <span className="text-search">
                @
                {
                  // if username's length is greater than or equal to 18 then show only 20 characters and add ...
                  currentUser && currentUser?.username.length >= 18
                    ? currentUser?.username.slice(0, 15) + "..."
                    : currentUser?.username
                }
              </span>
            </div>

            {/* more options */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 d-none d-xl-inline"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </ListGroupItem>
        </OverlayTrigger>
      </ListGroup>
    </div>
  );
};

export default Sidebar;
