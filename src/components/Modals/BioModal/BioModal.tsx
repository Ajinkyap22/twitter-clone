import React from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";

type Props = {
  show: boolean;
  onHide: (e: React.FormEvent<HTMLFormElement>) => void;
  bio: string;
  setBio: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  handleBack: () => void;
};

const BioModal = ({
  show,
  onHide,
  bio,
  setBio,
  location,
  setLocation,
  handleBack,
}: Props) => {
  return (
    <Modal
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      contentClassName="p-3 px-0 px-sm-5 px-lg-2 w-xl-80 mx-auto"
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
            className="text-decoration-none text-dark p-0"
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

          <h4 className="m-0">Step 3 of 4</h4>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="border-none mt-3 px-5 px-lg-5 px-md-2">
        <h2 className="pb-1">Tell us about yourself</h2>

        <Form onSubmit={onHide}>
          {/* bio */}
          <Form.Control
            type="text"
            className="form-control p-3 mt-4 mb-2 border-2"
            placeholder="Your Twitter Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <Form.Text className="text-search">
            This will be shown on your profile.
          </Form.Text>

          {/* location */}
          <Form.Control
            type="text"
            className="form-control p-3 mt-4 mb-2 border-2"
            placeholder="Where are you from?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <Form.Text className="text-search">
            Enter your city or country.
          </Form.Text>

          <Button
            variant={"primary"}
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

export default BioModal;
