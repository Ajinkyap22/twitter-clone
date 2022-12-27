import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "features/user/userSlice";

const MobileNav = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const [currentPage, setCurrentPage] = useState<string>("home");

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/home") setCurrentPage("home");
    if (location.pathname === "/bookmarks") setCurrentPage("bookmarks");
    if (location.pathname.split("/")[1] === currentUser?.username)
      setCurrentPage("profile");
  }, [location.pathname, currentUser?.username]);

  return (
    <div className="d-block d-sm-none bg-body-primary p-1_5 sticky-bottom w-full d-flex align-items-center justify-content-around shadow border-top">
      {/* home */}
      <Link to="/home">
        <div className="cursor-pointer border-0 py-2">
          {currentPage === "home" ? (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
              <g>
                <path d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z"></path>
              </g>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
              <g>
                <path d="M12 9c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm0-13.304L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM19 19.5c0 .276-.224.5-.5.5h-13c-.276 0-.5-.224-.5-.5V8.429l7-4.375 7 4.375V19.5z"></path>
              </g>
            </svg>
          )}
        </div>
      </Link>

      {/* search */}
      <div className="cursor-pointer border-0 py-2">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
          <g>
            <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
          </g>
        </svg>
      </div>

      {/* bookmarks */}
      <Link to="/bookmarks">
        <div className="cursor-pointer border-0 py-2">
          {currentPage === "bookmarks" ? (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
              <g>
                <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z"></path>
              </g>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
              <g>
                <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path>
              </g>
            </svg>
          )}
        </div>
      </Link>

      {/* profile */}
      <Link to={`/${currentUser?.username}`}>
        <div className="cursor-pointer border-0 py-2">
          {currentPage === "profile" ? (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
              <g>
                <path d="M17.863 13.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44zM12 2C9.791 2 8 3.79 8 6s1.791 4 4 4 4-1.79 4-4-1.791-4-4-4z"></path>
              </g>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5">
              <g>
                <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
              </g>
            </svg>
          )}
        </div>
      </Link>
    </div>
  );
};

export default MobileNav;
