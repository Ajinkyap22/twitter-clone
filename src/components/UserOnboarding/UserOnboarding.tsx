import React, { useState } from "react";
import NameModal from "../Modals/NameModal/NameModal";
import UsernameModal from "../Modals/UsernameModal/UsernameModal";
import PictureModal from "../Modals/PictureModal/PictureModal";
import { useAuth0 } from "@auth0/auth0-react";

type Props = {
  setUserOnboarding: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserOnboarding = ({ setUserOnboarding }: Props): JSX.Element => {
  const { user } = useAuth0();

  const [showNameModal, setShowNameModal] = useState<boolean>(true);
  const [showUsernameModal, setShowUsernameModal] = useState<boolean>(false);
  const [showPictureModal, setShowPictureModal] = useState<boolean>(false);

  const [name, setName] = useState<string>(user?.name || "");
  const [username, setUsername] = useState<string>("");
  const [picture, setPicture] = useState<string>(
    user?.picture ||
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
  );

  // hide name modal and show username modal on pressing next
  const hideNameModal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setShowNameModal(false);
    setShowUsernameModal(true);
  };

  // hide username modal and show picture modal on pressing next
  const hidenUsernameModal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setShowUsernameModal(false);
    setShowPictureModal(true);
  };

  const hidePictureModal = () => {
    setShowPictureModal(false);
  };

  // go back to name modal on pressing back
  const handleBackToNameModal = () => {
    setShowUsernameModal(false);
    setShowNameModal(true);
  };

  // go back to username modal on pressing back
  const handleBackToUsernameModal = () => {
    setShowPictureModal(false);
    setShowUsernameModal(true);
  };

  const finishOnboarding = () => {
    setUserOnboarding(false);
    console.log("name: ", name);
    console.log("username: ", username);
    console.log("picture: ", picture);
  };

  return (
    <>
      {/* name modal */}
      <NameModal
        show={showNameModal}
        onHide={hideNameModal}
        name={name}
        setName={setName}
      />

      {/* username modal */}
      <UsernameModal
        show={showUsernameModal}
        handleBack={handleBackToNameModal}
        onHide={hidenUsernameModal}
        username={username}
        setUsername={setUsername}
      />

      {/* picture modal */}
      <PictureModal
        show={showPictureModal}
        handleBack={handleBackToUsernameModal}
        picture={picture}
        onHide={hidePictureModal}
        setPicture={setPicture}
        finishOnboarding={finishOnboarding}
      />
    </>
  );
};

export default UserOnboarding;
