import React from "react";
import { Button } from "react-bootstrap";
import { OverlayTrigger } from "react-bootstrap";
import { Popover } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { selectCurrentUser } from "features/user/userSlice";
import { clearBookmarks } from "features/user/userSlice";

type Props = {
  name: string;
};

const BookmarksHeader = ({ name }: Props) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const handleClearBookmarks = () => {
    if (!currentUser) return;

    dispatch(clearBookmarks(currentUser.email));
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body className="p-0 d-flex flex-column">
        <Button
          variant="light"
          className="fw-bold fs-7 p-2 py-2_5 text-break w-100 text-start py-2 px-3 border-0 text-danger bg-body-primary"
          onClick={handleClearBookmarks}
        >
          Clear all Bookmarks
        </Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="position-sticky top-0 p-2 pb-0 bg-body-primary-transparent d-flex justify-content-between align-items-center z-10">
      <div className="d-flex w-100 justify-content-between ps-2 align-items-center">
        <div>
          {/* name */}
          <h5 className="fw-bold m-0">Bookmarks</h5>

          {/* tweet count */}
          <span className="text-muted fs-9">
            @{name.length >= 52 ? name.slice(0, 49) + "..." : name}
          </span>
        </div>
        <OverlayTrigger trigger="click" placement="left" overlay={popover}>
          <button className="border-0 bg-transparent blue-hover p-2 d-flex align-items-center justify-content-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </button>
        </OverlayTrigger>
      </div>
    </div>
  );
};

export default BookmarksHeader;
