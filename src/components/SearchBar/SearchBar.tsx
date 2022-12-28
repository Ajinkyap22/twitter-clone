import { Form } from "react-bootstrap";

const SearchBar = () => {
  return (
    <div className="px-sm-2 px-xl-4 py-1 bg-body-primary position-sticky top-0 z-10">
      <div className="d-flex align-items-center rounded-pill py-1 px-4 bg-search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-3 h-3 text-search"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>

        <Form.Control
          type="text"
          placeholder="Search Twitter"
          className="bg-transparent border-0 px-3 form-control-light h7 text-search"
        />
      </div>
    </div>
  );
};

export default SearchBar;
