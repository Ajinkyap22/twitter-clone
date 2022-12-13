import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

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
  return (
    <Modal
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      contentClassName="p-3"
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

          <h4 className="m-0">Step 2 of 3</h4>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="border-none mt-3 px-5">
        <h2 className="pb-1">Pick your username</h2>

        <Form onSubmit={onHide}>
          <Form.Control
            type="text"
            className="form-control p-3 mt-4 mb-2 border-2"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Form.Text className="text-muted">
            This will be your unique handle on the site.
          </Form.Text>

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
