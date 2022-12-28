import React, { useState, useContext } from "react";

import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Alert } from "react-bootstrap";

import { ThemeContext } from "contexts/ThemeContext";

import db from "firebase-config/config";
import { query, where, getDocs, collection } from "firebase/firestore";

import "components/Modals/UsernameModal/UsernameModal.scss";

type Props = {
  show: boolean;
  onHide: (e: React.FormEvent<HTMLFormElement>) => void;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  handleBack: () => void;
};

const UsernameModal = ({
  show,
  onHide,
  username,
  setUsername,
  handleBack,
}: Props) => {
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const { theme } = useContext(ThemeContext);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // check if the username has any spaces
    if (e.target.value.includes(" ")) {
      setUsernameError("Username cannot contain spaces.");
      return;
    }

    setUsernameError(null);

    setUsername(e.target.value.toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // check if the username is already taken
    const q = query(collection(db, "users"), where("username", "==", username));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      setUsernameError("Username is already taken.");
      return;
    }

    onHide(e);
  };

  return (
    <Modal
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      contentClassName={`p-3 px-0 px-sm-5 w-xl-80 mx-auto ${
        theme === "dark-theme"
          ? "bg-body-primary-dark text-default-dark"
          : "bg-body-primary-light text-default"
      }`}
      keyboard={false}
      centered
    >
      <Modal.Header>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="d-flex align-items-center"
        >
          {/* Back button */}
          <Button
            variant="link"
            className={`text-decoration-none p-0 ${
              theme === "dark-theme" ? "text-default-dark" : "text-default"
            }`}
            onClick={handleBack}
          >
            <svg
              xmlns="htp://www.w3.org/2000/svg"
              width="24"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="me-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
          </Button>

          <h4 className="m-0">Step 2 of 4</h4>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="border-none mt-3 px-5">
        <h2 className="pb-1">Pick your username</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Control
            type="text"
            className={`form-control p-3 mt-4 mb-2 border-2 bg-transparent ${
              theme === "dark-theme"
                ? "text-default-dark form-control-dark border-secondary"
                : "text-default"
            }`}
            placeholder="Username"
            value={username}
            onChange={handleChange}
          />

          <Form.Text className="text-search">
            This will be your unique handle on the site.
          </Form.Text>

          {usernameError && (
            <Alert variant="danger" className="mt-3 p-2 fs-7_5">
              {usernameError}
            </Alert>
          )}

          <Button
            variant={!username ? "secondary" : "primary"}
            disabled={!username}
            type="submit"
            className="rounded-pill w-100 py-2 fw-bold mt-5"
          >
            Next
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UsernameModal;
