import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import AvatarEditor from "./AvatarEditor";

type Props = {
  show: boolean;
  onHide: () => void;
  picture: string;
  setPicture: React.Dispatch<React.SetStateAction<string>>;
  handleBack: () => void;
};

const PictureModal = ({
  show,
  onHide,
  picture,
  setPicture,
  handleBack,
}: Props) => {
  const [showAvatarEditor, setShowAvatarEditor] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [error, setError] = useState<string>("");

  // onclick on div
  const handleImageUpload = () => {
    inputRef.current?.click();
  };

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isImage = validateFileType(e.target);

    if (isImage) {
      changePreview(e.target);

      setShowAvatarEditor(true);

      setError("");
    } else {
      setError("Invalid file format. Please provide an Image.");
    }
  };

  const changePreview = (image: HTMLInputElement) => {
    if (image.files && image.files[0] && imageRef.current) {
      imageRef.current.setAttribute(
        "src",
        window.URL.createObjectURL(image.files[0])
      );
    }
  };

  const validateFileType = (file: HTMLInputElement) => {
    const fileName = file.value;
    const dotIndex = fileName.lastIndexOf(".") + 1;
    const extenstion = fileName
      .substring(dotIndex, fileName.length)
      .toLowerCase();

    if (extenstion === "jpg" || extenstion === "jpeg" || extenstion === "png") {
      return true;
    } else {
      return false;
    }
  };

  const closeEditor = () => {
    setShowAvatarEditor(false);
  };

  return (
    <Modal
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      contentClassName="p-3"
      className="z-high"
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

          <h4 className="m-0">Step 4 of 4</h4>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="border-none mt-3 px-5">
        <h2 className="pb-1">Pick a picture</h2>

        <p className="text-muted">
          This will be your profile picture. You can always change it later.
        </p>

        {/* preview container */}
        <div
          onClick={handleImageUpload}
          className="my-4 position-relative cursor-pointer d-flex justify-content-center"
        >
          {/* preview */}
          <img
            src={picture}
            alt="Profile pic upload"
            className="rounded-circle w-32 h-32 border-4 border-secondary"
            title="Upload Profile Picture"
            ref={imageRef}
          />

          {/* camera icon */}
          <div className="position-absolute start-50 bottom-minus-10 bg-white shadow rounded-circle p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="gray"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>

          {/* hidden input */}
          <input
            ref={inputRef}
            type="file"
            name="profile_picture"
            placeholder="Profile picture"
            accept="image/*"
            className="d-none"
            onChange={handlePreview}
          />
        </div>

        {/* error */}
        <p
          className="h-6 text-danger text-center fw-light"
          hidden={error ? false : true}
        >
          Invalid file format. Please provide an Image.
        </p>

        {/* avatar editor */}
        <AvatarEditor
          show={showAvatarEditor}
          onHide={closeEditor}
          modalRef={modalRef}
          imageRef={imageRef}
          setPicture={setPicture}
        />
      </Modal.Body>

      <Modal.Footer className="px-5">
        <Button
          variant={!picture ? "secondary" : "primary"}
          disabled={!picture}
          className="rounded-pill w-100 py-2 fw-bold mt-4"
          onClick={onHide}
        >
          Next
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PictureModal;
