import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

type Props = {};

const LoadingSpinner = (props: Props) => {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center h-100"
    >
      <Spinner animation="border" role="status" variant="info">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );
};

export default LoadingSpinner;
