import React, { useRef, useContext } from "react";

import { ThemeContext } from "contexts/ThemeContext";

import Editor from "react-avatar-editor";

import { Button, Modal } from "react-bootstrap";

type Props = {
  show: boolean;
  onHide: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
  imageRef: React.RefObject<HTMLImageElement>;
  setPicture: React.Dispatch<React.SetStateAction<string>>;
};

const AvatarEditor = ({
  show,
  onHide,
  modalRef,
  imageRef,
  setPicture,
}: Props) => {
  const cropRef = useRef<Editor>(null);
  const { theme } = useContext(ThemeContext);

  const cropImage = () => {
    if (!cropRef.current) return;

    const cropped = cropRef.current.getImage();

    cropped.toBlob(
      (blob: Blob | null) => {
        if (!blob) return;

        // convert blob to base64
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;

          setPicture(base64data as string);
        };

        // let file: File = new File([blob], "picture.jpg", {
        //   type: "image/jpeg",
        // });

        // setPicture(file);
      },
      "image/png",
      1
    );

    const imageURL = cropped.toDataURL();

    if (cropRef) {
      imageRef.current && imageRef.current.setAttribute("src", imageURL);

      onHide();
    }
  };

  return (
    <Modal
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      className="z-max"
      contentClassName={`py-2 px-0 p-3 px-sm-5 w-xl-80 mx-auto ${
        theme === "dark-theme"
          ? "bg-body-primary-dark text-default-dark"
          : "bg-body-primary-light text-default"
      }`}
      keyboard={false}
      ref={modalRef}
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <h2 className="px-4">Adjust Profile Picture</h2>
        </Modal.Title>

        <Button
          variant="light"
          onClick={onHide}
          className="position-absolute top-2 end-2 bg-transparent border-0"
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
      </Modal.Header>

      <Modal.Body className="border-none bg-black d-flex justify-content-center">
        <Editor
          ref={cropRef}
          image={imageRef.current?.getAttribute("src") || ""}
          width={250}
          height={250}
          border={50}
          borderRadius={120}
          scale={1}
          color={[255, 255, 255, 0.6]}
          rotate={0}
          style={{ margin: "auto" }}
        />
      </Modal.Body>

      <Modal.Footer className="px-5">
        <Button
          variant="primary"
          className="rounded-pill w-100 py-2 fw-bold mt-3"
          onClick={cropImage}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AvatarEditor;
