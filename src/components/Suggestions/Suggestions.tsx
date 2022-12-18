import React, { useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { useAppDispatch } from "app/hooks";
import { fetchSuggestedUsers } from "features/user/userSlice";
import WhoToFollow from "../WhoToFollow/WhoToFollow";

const Suggestions = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSuggestedUsers());
  }, []);
  return (
    <>
      {/* search bar */}
      <SearchBar />
      <WhoToFollow />
    </>
  );
};

export default Suggestions;
