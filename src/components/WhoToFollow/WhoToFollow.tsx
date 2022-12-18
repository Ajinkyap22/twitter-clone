import React from "react";
import { useAppSelector } from "app/hooks";
import { selectSuggestedUsers } from "features/user/userSlice";
import SuggestedUser from "components/SuggestedUser/SuggestedUser";

const WhoToFollow = () => {
  const suggestedUsers = useAppSelector(selectSuggestedUsers);
  return (
    <div className="px-4 ">
      <div className="d-flex flex-column bg-gray pt-1 rounded-4">
        <h5 className="fw-bold ps-3 pt-2">Who to follow</h5>
        {suggestedUsers.map((user) => {
          return <SuggestedUser key={user.email} user={user} />;
        })}
        <div className="p-2 user-hover rounded-bottom cursor-pointer">
          <button className="btn text-primary-light fs-7 px-0">
            Show more
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhoToFollow;
