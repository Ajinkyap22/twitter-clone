import React from "react";

import Button from "react-bootstrap/Button";

type Props = {
  picture: string;
};

const UserAvatar = ({ picture }: Props) => {
  return (
    <div className="d-flex justify-content-between align-items-start">
      {/* profile picture */}
      <img
        className="w-34 h-34 rounded-circle border-avatar object-center -mt-16 ms-3"
        src={picture}
        alt="profile pic"
      />

      {/* edit profile button */}
      <Button
        variant="light"
        className="bg-white border border btn-sm me-3 rounded-pill mt-3 fs-7 fw-bold py-1 px-3 hover-gray"
      >
        Edit Profile
      </Button>
    </div>
  );
};

export default UserAvatar;
