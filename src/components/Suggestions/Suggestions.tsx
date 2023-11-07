import React, { useEffect } from "react";

import SearchBar from "../SearchBar/SearchBar";
import WhoToFollow from "../WhoToFollow/WhoToFollow";
import WhatsHappening from "components/WhatsHappening/WhatsHappening";

import { useAppDispatch } from "app/hooks";
import { fetchSuggestedUsers } from "features/user/userSlice";

const Suggestions = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSuggestedUsers());
  }, []);
  return (
    <>
      {/* search bar */}
      <SearchBar />

      {/* whats happening */}
      <WhatsHappening />

      {/* who to follow */}
      <WhoToFollow />
    </>
  );
};

export default Suggestions;
