import React from "react";
import { TUser } from "features/user/userSlice";

type Props = {
  user: TUser;
};

const UserInfo = ({ user }: Props) => {
  return (
    <div>
      {/* name */}
      <h4 className="h-4_5 fw-bolder mt-3 mb-0 ms-3 d-inline-flex align-items-center">
        <span>{user.name}</span>

        {user.isVerified && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#188cd8 "
            className="ms-2 w-2_5 h-2_5"
            viewBox="0 0 16 16"
          >
            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
          </svg>
        )}
      </h4>

      {/* username */}
      <p className="text-search fs-7 mt-0 ms-3 mb-2">@{user.username}</p>

      {/* bio */}
      {user.bio && <p className="fs-7 mt-0 ms-3 mb-2 me-2">{user.bio}</p>}

      {/* location and join date */}
      <div className="d-flex">
        {/* location */}
        {user.location && (
          <p className="text-search d-flex align-items-center fs-7 mt-0 ms-3 mb-2">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="#536371"
              className="w-3 h-3 me-1"
            >
              <g>
                <path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"></path>
              </g>
            </svg>
            {user.location}
          </p>
        )}

        {/* join date */}
        {user.joinDate && (
          <p className="text-search d-flex align-items-center fs-7 mt-0 mb-2 ms-3">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="#536371"
              className="w-3 h-3 me-1"
            >
              <g>
                <path d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z"></path>
              </g>
            </svg>
            Joined{" "}
            {user.joinDate.toDate().toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </p>
        )}
      </div>

      {/* followers and following count */}
      <div className="d-flex">
        {/* following */}
        <p className="ms-3 fs-7_5 text-underline">
          <span className="fw-bold">{user.following.length}</span>{" "}
          <span className="text-search">Following</span>
        </p>

        {/* followers */}
        <p className="ms-3 fs-7_5 text-underline">
          <span className="fw-bold">{user.followers.length}</span>{" "}
          <span className="text-search">
            {user.followers.length === 1 ? "Follower" : "Followers"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
