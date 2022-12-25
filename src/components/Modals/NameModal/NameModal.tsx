import React from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";

type Props = {
  show: boolean;
  onHide: (e: React.FormEvent<HTMLFormElement>) => void;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
};

const NameModal = ({ show, onHide, name, setName }: Props) => {
  return (
    <Modal
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      contentClassName="p-3 px-sm-5 w-xl-80 mx-auto"
      keyboard={false}
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter ">
          Step 1 of 4
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="border-none mt-3">
        <h2 className="pb-1">What's your name?</h2>

        <Form onSubmit={onHide}>
          <Form.Control
            type="text"
            className="form-control p-3 mt-4"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button
            variant={!name ? "secondary" : "primary"}
            disabled={!name}
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

export default NameModal;
