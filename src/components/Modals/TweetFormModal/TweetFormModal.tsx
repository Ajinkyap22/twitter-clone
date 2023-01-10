import React, { useContext } from "react";

import { ThemeContext } from "contexts/ThemeContext";

import AddTweetForm from "../../AddTweetForm/AddTweetForm";

import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

import "components/Modals/TweetFormModal/TweetFormModal.scss";

type Props = {
  show: boolean;
  setShowTweetFormModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const TweetFormModal = ({
  show,
  setShowTweetFormModal,
}: Props): JSX.Element => {
  const handleClose = () => setShowTweetFormModal(false);
  const { theme } = useContext(ThemeContext);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      contentClassName={`border-radius-5 bg-body-primary ${
        theme === "dark-theme"
          ? "bg-body-primary-dark"
          : "bg-body-primary-light"
      }`}
    >
      <Button
        className={`rounded-pill p-1 w-10 align-self-start m-2 mb-0 bg-transparent border-0 text-black close-hover ${
          theme === "dark-theme" ? "close-hover-dark" : "close-hover"
        }`}
        onClick={handleClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke={theme === "dark-theme" ? "#fff" : "currentColor"}
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Button>

      <Modal.Body className="border-0 bg-body-primary">
        <AddTweetForm isModal={true} closeModal={handleClose} />
      </Modal.Body>
    </Modal>
  );
};

export default TweetFormModal;
