import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

type Props = {
  user: {
    name: string;
    username: string;
    picture: string;
    email: string;
    isVerified: boolean;
  };
};

const SuggestedUser = ({ user }: Props) => {
  return (
    <Link to={`/${user.username}`} className="link">
      <div className="d-flex justify-content-between p-3 user-hover cursor-pointer text-decoration-none">
        <div className="d-flex">
          {/* image */}
          <img src={user.picture} alt="user" className="w-8 h-8 rounded-pill" />
          <div className="d-flex flex-column ms-3">
            <div className="d-flex align-items-center">
              {/* name */}
              <h6 className="mb-0 text-underline">
                {user.name.length >= 20
                  ? user.name.slice(0, 17) + "..."
                  : user.name}
              </h6>

              {/* verified tick */}
              {user.isVerified && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#188cd8 "
                  className="ms-1 w-2_5 h-2_5"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                </svg>
              )}
            </div>

            {/* username */}
            <span className="text-muted">
              @
              {user.username.length >= 18
                ? user.username.slice(0, 15) + "..."
                : user.username}
            </span>
          </div>
        </div>

        <Button
          variant="dark"
          className="bg-dark rounded-pill text-white fw-bold fs-9 cursor-pointer py-1 align-self-center"
        >
          Follow
        </Button>
      </div>
    </Link>
  );
};

export default SuggestedUser;
