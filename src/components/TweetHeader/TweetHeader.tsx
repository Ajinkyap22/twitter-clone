import React, { useNavigate } from "react-router-dom";

const TweetHeader = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="position-sticky top-0 p-2 bg-body-primary-transparent d-flex justify-content-between align-items-center z-10">
      <div className="d-flex justify-content-center align-items-center">
        {/* go back */}
        <button
          onClick={handleBack}
          className="bg-transparent border-0 me-4_5 link-hover rounded-circle p-1_5"
        >
          <svg viewBox="0 0 24 24" className="w-3 h-3 fill" aria-hidden="true">
            <g>
              <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
            </g>
          </svg>
        </button>

        <h5 className="fw-bold m-0">Tweet</h5>
      </div>
    </div>
  );
};

export default TweetHeader;
