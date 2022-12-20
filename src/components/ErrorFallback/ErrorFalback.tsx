import React from "react";

type Props = {
  error: Error;
};

const ErrorFalback = ({ error }: Props) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre className="text-danger">{error.message}</pre>
    </div>
  );
};

export default ErrorFalback;
