import React, { useState } from "react";
import NameModal from "../Modals/NameModal/NameModal";
import UsernameModal from "../Modals/UsernameModal/UsernameModal";
import BioModal from "../Modals/BioModal/BioModal";
import PictureModal from "../Modals/PictureModal/PictureModal";
import { useAuth0 } from "@auth0/auth0-react";
import {
  TUser,
  createUser,
  updateProfilePicture,
} from "../../features/user/userSlice";
import { useAppDispatch } from "../../app/hooks";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Timestamp } from "firebase/firestore";

type Props = {
  setUserOnboarding: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserOnboarding = ({ setUserOnboarding }: Props): JSX.Element => {
  const { user } = useAuth0();
  const dispatch = useAppDispatch();

  const [showNameModal, setShowNameModal] = useState<boolean>(true);
  const [showUsernameModal, setShowUsernameModal] = useState<boolean>(false);
  const [showBioModal, setShowBioModal] = useState<boolean>(false);
  const [showPictureModal, setShowPictureModal] = useState<boolean>(false);

  const [name, setName] = useState<string>(user?.name || "");
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [location, setLocation] = useState<string>("");
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

  // hide username modal and show bio modal on pressing next
  const hidenUsernameModal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setShowUsernameModal(false);
    setShowBioModal(true);
  };

  // hide bio modal and show picture modal on pressing next
  const hideBioModal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setShowBioModal(false);
    setShowPictureModal(true);
  };

  const hidePictureModal = () => {
    setShowPictureModal(false);
    finishOnboarding();
  };

  // go back to name modal on pressing back
  const handleBackToNameModal = () => {
    setShowUsernameModal(false);
    setShowNameModal(true);
  };

  // go back to username modal on pressing back
  const handleBackToUsernameModal = () => {
    setShowBioModal(false);
    setShowUsernameModal(true);
  };

  // go back to bio modal on pressing back
  const handleBackToBioModal = () => {
    setShowPictureModal(false);
    setShowBioModal(true);
  };

  const finishOnboarding = async () => {
    let imageURL: string = picture;
    // check if picture is a base64 string
    if (picture.includes("data:image/png;base64")) {
      dispatch(updateProfilePicture(picture, user?.sub || ""));

      // download profile picture from firebase storage
      const storage = getStorage();
      const imageRef = ref(storage, `images/${user?.sub}.png`);

      try {
        const url: string = await getDownloadURL(imageRef);
        imageURL = url;
      } catch (err) {
        console.error(err);
      }
    }

    const newUser: TUser = {
      name,
      email: user?.email || "",
      picture: imageURL,
      username,
      location,
      bio,
      joinDate: Timestamp.now(),
      followers: [],
      following: [],
      isVerified: false,
      tweets: [],
      likes: [],
      bookmarks: [],
      retweets: [],
    };

    dispatch(createUser(newUser));

    setUserOnboarding(false);
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

      {/* bio modal */}
      <BioModal
        show={showBioModal}
        handleBack={handleBackToUsernameModal}
        onHide={hideBioModal}
        bio={bio}
        setBio={setBio}
        location={location}
        setLocation={setLocation}
      />

      {/* picture modal */}
      <PictureModal
        show={showPictureModal}
        handleBack={handleBackToBioModal}
        picture={picture}
        onHide={hidePictureModal}
        setPicture={setPicture}
      />
    </>
  );
};

export default UserOnboarding;
