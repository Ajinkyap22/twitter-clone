import React from "react";

import { Button } from "react-bootstrap";

import { LazyLoadImage } from "react-lazy-load-image-component";

type Props = {
  imageInput: string;
  removeImage: () => void;
};

const ImagePreview = ({ imageInput, removeImage }: Props) => {
  return (
    <div className="position-relative py-2 ps-2">
      <LazyLoadImage
        src={imageInput}
        className="w-100 h-100 rounded-3"
        alt="tweet"
      />

      <Button
        className="position-absolute top-4 start-3 rounded-circle p-1 d-flex align-items-center justify-content-center bg-dark-transparent border-0 blur"
        onClick={removeImage}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-3 h-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Button>
    </div>
  );
};

export default ImagePreview;
