import React from "react";

import { ListGroup } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";

import TrendPic from "../../assets/images/trend-pic.jpeg";

const WhatsHappening = () => {
  return (
    <div className="px-sm-2 px-xl-4 py-2_5 mb-1">
      <div className="d-flex flex-column rounded-4 py-1 bg-gray">
        {/* title */}
        <h5 className="fw-bolder m-0 py-2 px-3">What's happening</h5>

        {/* trends */}
        <ListGroup variant="flush" className="">
          {/* sports trend */}
          <ListGroup.Item className="bg-transparent border-0 px-3 cursor-pointer trend-hover">
            <div className="d-flex justify-content-between align-items-start">
              <div className="">
                {/* muted text */}
                <span className="text-muted fs-8">Sports · LIVE</span>

                {/* trend name */}
                <p className="fw-bolder m-0 fs-7">2022 FIFA World Cup</p>
              </div>

              {/* trend actions */}
              <LazyLoadImage
                src={TrendPic}
                alt="trend pic"
                className="w-16 h-16 object-cover rounded-3"
              />
            </div>
          </ListGroup.Item>

          {/* trend 1 */}
          <ListGroup.Item className="bg-transparent border-0 px-3 cursor-pointer trend-hover">
            <div className="d-flex justify-content-between align-items-start">
              <div className="">
                {/* muted text */}
                <span className="text-muted fs-8">Trending</span>

                {/* trend name */}
                <p className="fw-bolder m-0 fs-7">Luka Modric</p>

                {/* trend count */}
                <p className="text-muted fs-9 m-0">43K Tweets</p>
              </div>

              {/* trend actions */}
              <button title="More" className="bg-transparent border-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#536471"
                  className="w-3 h-3 stroke-hover"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </button>
            </div>
          </ListGroup.Item>

          {/* trend 2 */}
          <ListGroup.Item className="bg-transparent border-0 px-3 cursor-pointer trend-hover">
            <div className="d-flex justify-content-between align-items-start">
              <div className="">
                {/* muted text */}
                <span className="text-muted fs-8">Trending in Events</span>

                {/* trend name */}
                <p className="fw-bolder m-0 fs-7">#ArgentinaVsFrance</p>

                {/* trend count */}
                <p className="text-muted fs-9 m-0">6.9K Tweets</p>
              </div>

              {/* trend actions */}
              <button title="More" className="bg-transparent border-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#536471"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </button>
            </div>
          </ListGroup.Item>

          {/* trend 3 */}
          <ListGroup.Item className="bg-transparent border-0 px-3 cursor-pointer trend-hover">
            <div className="d-flex justify-content-between align-items-start">
              <div className="">
                {/* muted text */}
                <span className="text-muted fs-8">Trending in India</span>

                {/* trend name */}
                <p className="fw-bolder m-0 fs-7">#BoycottSomething</p>

                {/* trend count */}
                <p className="text-muted fs-9 m-0">1,860 Tweets</p>
              </div>

              {/* trend actions */}
              <button title="More" className="bg-transparent border-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#536471"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </button>
            </div>
          </ListGroup.Item>

          {/* trend 4 */}
          <ListGroup.Item className="bg-transparent border-0 px-3 cursor-pointer trend-hover">
            <div className="d-flex justify-content-between align-items-start">
              <div className="">
                {/* muted text */}
                <span className="text-muted fs-8">Trending</span>

                {/* trend name */}
                <p className="fw-bolder m-0 fs-7">Siuuuu</p>

                {/* trend count */}
                <p className="text-muted fs-9 m-0">222K Tweets</p>
              </div>

              {/* trend actions */}
              <button title="More" className="bg-transparent border-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="#536471"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </button>
            </div>
          </ListGroup.Item>

          {/* show more */}
          <ListGroup.Item className="bg-transparent border-0 px-3 cursor-pointer trend-hover rounded-bottom">
            <button className="btn text-primary-light fs-7 px-0">
              Show more
            </button>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
};

export default WhatsHappening;
