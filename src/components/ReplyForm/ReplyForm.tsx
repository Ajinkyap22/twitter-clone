import React, { useRef, useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { selectCurrentUser } from "features/user/userSlice";
import { reply, TTweet } from "features/tweet/tweetSlice";
import { Link } from "react-router-dom";

import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

import ImagePreview from "components/ImagePreview/ImagePreview";
import VideoPreview from "components/VideoPreview/VideoPreview";

import uniqid from "uniqid";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, Timestamp } from "firebase/firestore";
import db from "firebase-config/config";

type Props = {
  replyingTo: string;
  tweetId: string | undefined;
};

const ReplyForm = ({ replyingTo, tweetId }: Props) => {
  const user = useAppSelector(selectCurrentUser);

  const [caption, setCaption] = useState<string>("");

  const [imageInput, setImageInput] = useState<File | null>(null);
  const [videoInput, setVideoInput] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const [disabled, setDisabled] = useState<boolean>(true);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const captionRef = useRef<HTMLTextAreaElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    captionRef.current && captionRef.current.focus();
  }, [tweetId]);

  useEffect(() => {
    if ((caption && caption.length <= 280) || imageInput || videoInput) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [caption, imageInput, videoInput]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);

    const target = e.target as HTMLTextAreaElement;
    target.style.height = "inherit";
    target.style.height = `${target.scrollHeight}px`;
  };

  // on image button click
  const handleImageUpload = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  // on video button click
  const handleVideoUpload = () => {
    if (videoInputRef.current) {
      videoInputRef.current.click();
    }
  };

  // triggered after image input change
  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // validate file type
      const fileType = e.target.files[0].type;

      if (fileType.match(/image.*/)) {
        setImageInput(e.target.files[0]);
      } else {
        alert("Please upload an image file");

        // reset input
        e.target.value = "";

        setImageInput(null);
      }
    }
  };

  // triggered after video input change
  const handleVideoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileType = e.target.files[0].type;

      if (fileType.match(/video.*/) && e.target.files[0].size < 100000000) {
        setVideoInput(e.target.files[0]);
      } else {
        alert("Please upload a video file & less than 100MB");

        e.target.value = "";

        setVideoInput(null);
      }
    }
  };

  // remove selected image
  const removeImage = () => {
    setImageInput(null);
  };

  // remove selected video
  const removeVideo = () => {
    setVideoInput(null);
  };

  // handle tweet submit
  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!user) return;

    setUploading(true);

    // create unique id for tweet
    const id = uniqid();

    // get author reference
    const authorRef = doc(db, "users", user.email);

    // image and video download url
    const media: string[] = [];

    if (imageInput) {
      const imageDownloadUrl = await uploadImage(id);

      media.push(imageDownloadUrl);
    }

    if (videoInput) {
      const videoDownloadUrl = await uploadVideo(id);

      media.push(videoDownloadUrl);
    }

    const newTweet: TTweet = {
      id,
      text: caption,
      author: authorRef,
      media,
      date: Timestamp.now(),
      likes: [],
      retweets: [],
      replies: [],
      isReply: true,
      replyTo: replyingTo,
      originalTweet: tweetId,
    };

    // reset input
    setCaption("");

    setImageInput(null);

    setVideoInput(null);

    imageInputRef.current && (imageInputRef.current.value = "");

    videoInputRef.current && (videoInputRef.current.value = "");

    captionRef.current && (captionRef.current.style.height = "inherit");

    if (tweetId) dispatch(reply(newTweet, tweetId, user.email));

    setUploading(false);
  }

  // upload tweet iamge
  async function uploadImage(id: string) {
    if (!imageInput) return Promise.reject("No image selected");

    // get storage
    const storage = getStorage();

    // get image extension
    const imageType = imageInput.type.split("/")[1];

    // create image reference
    const imageRef = ref(storage, `images/${id}.${imageType}`);

    // upload image to storage
    const snapshot = await uploadBytes(imageRef, imageInput);

    // get image download url
    const imageDownloadUrl = await getDownloadURL(snapshot.ref);

    return imageDownloadUrl;
  }

  // upload tweet video
  async function uploadVideo(id: string) {
    if (!videoInput) return Promise.reject("No video selected");

    // get storage
    const storage = getStorage();

    // get video extension
    const videoType = videoInput.type.split("/")[1];

    // create video reference
    const videoRef = ref(storage, `videos/${id}.${videoType}`);

    // upload video to storage
    const snapshot = await uploadBytes(videoRef, videoInput);

    // get video download url
    const videoDownloadUrl = await getDownloadURL(snapshot.ref);

    return videoDownloadUrl;
  }

  return (
    <div
      className={`border-bottom d-flex flex-column p-2 px-3 ${
        uploading ? "opacity-50" : ""
      }`}
    >
      {/* replying to */}
      <p className="fs-7 mb-2">
        <span className="text-search ms-6">Replying to</span>
        <Link to={`/profile/${replyingTo}`} className="ms-1 link-primary">
          @{replyingTo}
        </Link>
      </p>

      {/* right side */}
      <div className="d-flex">
        {/* image */}
        <img
          src={user?.picture}
          alt="profile"
          className="w-10 h-10 rounded-pill me-3"
        />

        <div className="flex-grow-1">
          {/* caption */}
          <Form.Control
            as="textarea"
            placeholder="Tweet your reply"
            rows={1}
            className="border-0 overflow-hidden resize-none tweet-caption py-1 pb-2 px-0"
            value={caption}
            onChange={handleChange}
            ref={captionRef}
          />

          {/* image preview */}
          {imageInput && (
            <ImagePreview
              imageInput={URL.createObjectURL(imageInput)}
              removeImage={removeImage}
            />
          )}

          {/* video preview */}
          {videoInput && (
            <VideoPreview
              videoInput={URL.createObjectURL(videoInput)}
              removeVideo={removeVideo}
            />
          )}

          {/* buttons */}
          <div className="d-flex justify-content-between align-items-center">
            <div>
              {/* images */}
              <Button
                onClick={handleImageUpload}
                disabled={imageInput || videoInput ? true : false}
                className="me-1 cursor-pointer logo-hover p-2 border-0 bg-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#00acee"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </Button>

              {/* videos */}
              <Button
                onClick={handleVideoUpload}
                disabled={imageInput || videoInput ? true : false}
                className="me-2 cursor-pointer logo-hover p-2 border-0 bg-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#00acee"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                  />
                </svg>
              </Button>

              {/* hidden image input */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageInput}
                ref={imageInputRef}
                disabled={!!videoInput}
                hidden
              />

              {/* hidden video input */}
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoInput}
                ref={videoInputRef}
                disabled={!!imageInput}
                hidden
              />
            </div>
            <div>
              {caption.length >= 280 && (
                <span className="text-danger me-3 border border-danger border-2 rounded-4 p-1_5 fs-8">
                  {280 - caption.length}
                </span>
              )}

              <Button
                variant="primary"
                className="rounded-pill py-1_5 px-3"
                disabled={disabled}
                type="submit"
                onClick={handleSubmit}
              >
                Reply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyForm;
