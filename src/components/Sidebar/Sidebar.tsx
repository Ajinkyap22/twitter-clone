import React from "react";
import { ListGroupItem } from "react-bootstrap";
import Logo from "../../assets/images/Logo.svg";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Popover from "react-bootstrap/Popover";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/user/userSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";

type props = {
  showTweetFormModal: boolean;
  setShowTweetFormModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const Sidebar = ({
  showTweetFormModal,
  setShowTweetFormModal,
}: props): JSX.Element => {
  const currentUser = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleTweetFormShow = () => {
    setShowTweetFormModal(!showTweetFormModal);
  };

  return (
    <div className="position-fixed h-100vh top-0 left-0 d-flex flex-column align-items-end justify-content-between border-end ps-8">
      <ListGroup className="d-flex align-items-start pe-6">
        {/* twitter logo */}
        <ListGroupItem className="cursor-pointer border-0 d-flex justify-content-start w-100 p-0 bg-white">
          <button className="border-0 cursor-pointer bg-white logo-hover p-3">
            <img src={Logo} alt="Logo" className="w-6 h-6" />
          </button>
        </ListGroupItem>

        {/* home */}
        <ListGroupItem className="cursor-pointer border-0 d-flex my-1 py-2_5 align-items-center link-hover">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
            <g>
              <path d="M12 9c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm0-13.304L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM19 19.5c0 .276-.224.5-.5.5h-13c-.276 0-.5-.224-.5-.5V8.429l7-4.375 7 4.375V19.5z"></path>
            </g>
          </svg>
          <span className="ms-3 me-2 m-0 text-wrap h5 fw-normal">Home</span>
        </ListGroupItem>

        {/* explore */}
        <ListGroupItem className="cursor-pointer border-0 d-flex my-1 py-2_5 align-items-center link-hover">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
            <g>
              <path d="M10.09 3.098L9.72 7h5.99l.39-4.089 1.99.187L17.72 7h3.78v2h-3.97l-.56 6h3.53v2h-3.72l-.38 4.089-1.99-.187.36-3.902H8.78l-.38 4.089-1.99-.187L6.77 17H2.5v-2h4.46l.56-6H3.5V7h4.21l.39-4.089 1.99.187zM14.96 15l.56-6H9.53l-.56 6h5.99z"></path>
            </g>
          </svg>
          <span className="ms-3 me-2 m-0 text-wrap h5 fw-normal">Explore</span>
        </ListGroupItem>

        {/* notifications */}
        <ListGroupItem className="cursor-pointer border-0 d-flex my-1 py-2_5 align-items-center link-hover">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
            <g>
              <path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"></path>
            </g>
          </svg>
          <span className="ms-3 me-2 m-0 text-wrap h5 fw-normal">
            Notifications
          </span>
        </ListGroupItem>

        {/* messages */}
        <ListGroupItem className=" cursor-pointer border-0 d-flex my-1 py-2_5 align-items-center link-hover ">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
            <g>
              <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path>
            </g>
          </svg>
          <span className="ms-3 me-2 m-0 text-wrap h5 fw-normal">Messages</span>
        </ListGroupItem>

        {/* bookmarks */}
        <ListGroupItem className=" cursor-pointer border-0 d-flex my-1 py-2_5 align-items-center link-hover ">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
            <g>
              <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path>
            </g>
          </svg>

          <span className="ms-3 me-2 m-0 text-wrap h5 fw-normal">
            Bookmarks
          </span>
        </ListGroupItem>

        {/* lists */}
        <ListGroupItem className=" cursor-pointer border-0 d-flex my-1 py-2_5 align-items-center link-hover ">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
            <g>
              <path d="M3 4.5C3 3.12 4.12 2 5.5 2h13C19.88 2 21 3.12 21 4.5v15c0 1.38-1.12 2.5-2.5 2.5h-13C4.12 22 3 20.88 3 19.5v-15zM5.5 4c-.28 0-.5.22-.5.5v15c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-15c0-.28-.22-.5-.5-.5h-13zM16 10H8V8h8v2zm-8 2h8v2H8v-2z"></path>
            </g>
          </svg>

          <span className="ms-3 me-2 m-0 text-wrap h5 fw-normal">Lists</span>
        </ListGroupItem>

        {/* profile */}
        <ListGroupItem className=" cursor-pointer border-0 d-flex my-1 py-2_5 align-items-center link-hover ">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
            <g>
              <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
            </g>
          </svg>
          <span className="ms-3 me-2 m-0 text-wrap h5 fw-light">Profile</span>
        </ListGroupItem>

        {/* more */}
        <ListGroupItem className=" cursor-pointer border-0 d-flex my-1 py-2_5 align-items-center link-hover ">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
            <g>
              <path d="M3.75 12c0-4.56 3.69-8.25 8.25-8.25s8.25 3.69 8.25 8.25-3.69 8.25-8.25 8.25S3.75 16.56 3.75 12zM12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-4.75 11.5c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25S6 11.31 6 12s.56 1.25 1.25 1.25zm9.5 0c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25-1.25.56-1.25 1.25.56 1.25 1.25 1.25zM13.25 12c0 .69-.56 1.25-1.25 1.25s-1.25-.56-1.25-1.25.56-1.25 1.25-1.25 1.25.56 1.25 1.25z"></path>
            </g>
          </svg>
          <span className="ms-3 me-2 m-0 text-wrap h5 fw-light">More</span>
        </ListGroupItem>

        {/* tweet */}
        <ListGroupItem className="border-0 d-flex my-1 py-2_5 mt-1 px-0 align-self-stretch">
          <Button
            className="bg-blue border-0 rounded-pill ps-5 pe-5 flex-grow-1 fw-bold h6 py-2_5 button-hover cursor-pointer"
            onClick={handleTweetFormShow}
          >
            Tweet
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
          <ListGroupItem className="d-flex border-0 align-items-center cursor-pointer link-hover mb-3">
            {/* profile picture */}
            <div>
              <img
                src={currentUser?.picture}
                alt="Logo"
                className="w-7 h-7 rounded-circle"
              />
            </div>

            {/* name & username */}
            <div className="ms-3 me-4">
              <h6 className="mb-0">
                {
                  // if user name's length is greater than or equal to 20 then show only 20 characters and add ...
                  currentUser && currentUser?.name.length >= 20
                    ? currentUser?.name.slice(0, 17) + "..."
                    : currentUser?.name
                }
              </h6>
              <span className="text-muted">
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
              className="w-4 h-4"
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
