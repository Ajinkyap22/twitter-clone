import React, { useState, useRef, useContext } from "react";
import { ThemeContext } from "contexts/ThemeContext";

import { useAppDispatch } from "app/hooks";
import { updateProfilePicture, updateProfile } from "features/user/userSlice";

import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { useAuth0 } from "@auth0/auth0-react";

import { TUser } from "features/user/userSlice";

import { Modal, Form, Button } from "react-bootstrap";

import "components/Modals/EditProfileModal/EditProfileModal.scss";

type Props = {
  show: boolean;
  onHide: () => void;
  currentUser: TUser;
};

const EditProfileModal = ({ show, onHide, currentUser }: Props) => {
  const [name, setName] = useState<string>(currentUser?.name);
  const [bio, setBio] = useState<string>(currentUser?.bio);
  const [location, setLocation] = useState<string>(currentUser?.location);
  const [picture, setPicture] = useState<string | File>(currentUser?.picture);

  const pictureInputRef = useRef<HTMLInputElement>(null);
  const { theme } = useContext(ThemeContext);
  const { user } = useAuth0();

  const dispatch = useAppDispatch();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handlePictureInputClick = () => {
    if (pictureInputRef.current) {
      pictureInputRef.current.click();
    }
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // validate file type
      const fileType = e.target.files[0].type;

      if (fileType.match(/image.*/)) {
        setPicture(e.target.files[0]);
      } else {
        alert("Please upload an image file");

        // reset input
        e.target.value = "";

        setPicture(currentUser.picture);
      }
    }
  };

  const handelSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let imageURL: string;

    // update picture only if user uploads a new picture
    if (picture !== currentUser.picture) {
      // upload user profile picture to firebase storage
      dispatch(updateProfilePicture(picture, user?.sub || currentUser.email));

      // download profile picture from firebase storage
      const storage = getStorage();
      const storageRef = ref(storage, `images/${user?.sub}.png`);

      try {
        const url: string = await getDownloadURL(storageRef);
        imageURL = url;

        dispatch(
          updateProfile(name, bio, location, imageURL, currentUser.email)
        );
      } catch (err) {
        console.error(err);
      }
    } else {
      imageURL = currentUser.picture;

      dispatch(updateProfile(name, bio, location, imageURL, currentUser.email));
    }

    // reset states
    setName("");
    setBio("");
    setLocation("");
    setPicture("");

    onHide();
  };

  return (
    <Modal
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      contentClassName={`p-3 px-0 px-sm-3 w-xl-80 mx-auto ${
        theme === "dark-theme"
          ? "bg-body-primary-dark text-default-dark"
          : "bg-body-primary-light text-default"
      }`}
      keyboard={false}
      centered
    >
      <Modal.Header className="p-0 bg-body-primary py-3">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="d-flex align-items-center justify-content-between flex-grow-1"
        >
          <div className="d-flex align-items-center">
            <Button
              variant="light"
              className="bg-transparent border-0 me-3"
              onClick={onHide}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#999999"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>

            <h5 className="m-0 fs-5 fw-bold">Edit Profile</h5>
          </div>

          <Button
            onClick={handelSubmit}
            variant="dark"
            className={`border btn-sm me-2 rounded-pill fs-7 fw-bold py-1 px-3 ${
              theme === "dark-theme"
                ? "bg-save-dark text-save-dark"
                : "bg-save text-save"
            }`}
          >
            Save
          </Button>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="border-none pt-0 px-0">
        <div className="p-10 bg-coverPic"></div>

        <div className="text-center position-relative">
          <img
            className="w-34 h-34 rounded-circle border-avatar object-center -mt-16 opacity-75"
            src={
              typeof picture === "string"
                ? picture
                : URL.createObjectURL(picture)
            }
            alt="profile pic"
          />

          <div className="w-34 h-34 rounded-circle -mt-16 d-flex justify-content-center align-items-center position-absolute start-50 -translate-middle">
            <button
              className="picture-edit-overlay rounded-circle py-2 px-2 border-0 d-flex align-items-center justify-content-center"
              onClick={handlePictureInputClick}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-3 h-3"
                fill="#fff"
              >
                <g>
                  <path d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"></path>
                </g>
              </svg>
            </button>

            {/* hidden picture input */}
            <input
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
              ref={pictureInputRef}
              hidden
            />
          </div>
        </div>

        <Form className="px-4">
          {/* name */}
          <Form.Control
            type="text"
            className={`form-control p-3 mt-4 mb-2 border-2 bg-transparent  ${
              theme === "dark-theme"
                ? "text-default-dark form-control-dark border-secondary"
                : "text-default"
            }`}
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            required
          />

          <Form.Text className="text-search">
            This is the name that will be visible to others.
          </Form.Text>

          {/* bio */}
          <Form.Control
            type="text"
            className={`form-control p-3 mt-4 mb-2 border-2 bg-transparent  ${
              theme === "dark-theme"
                ? "text-default-dark form-control-dark border-secondary"
                : "text-default"
            }`}
            placeholder="Bio"
            value={bio}
            onChange={handleBioChange}
          />

          <Form.Text className="text-search">
            This will be displayed on your profile.
          </Form.Text>

          {/* location */}
          <Form.Control
            type="text"
            className={`form-control p-3 mt-4 mb-2 border-2 bg-transparent  ${
              theme === "dark-theme"
                ? "text-default-dark form-control-dark border-secondary"
                : "text-default"
            }`}
            placeholder="Location"
            value={location}
            onChange={handleLocationChange}
          />

          <Form.Text className="text-search">
            Enter your city or country.
          </Form.Text>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProfileModal;
