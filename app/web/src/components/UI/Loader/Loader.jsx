import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { FRAMES_COUNT } from "./LoaderConstants";

const Loader = ({ title }) => {
  const [loadingDots, setLoadingDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingDots(prevDots => {
        return ".".repeat((prevDots.length + 1) % FRAMES_COUNT);
      });
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center my-3">
      <Spinner animation="grow" variant="primary"/>
      <span className="text-primary mt-2">
        { `${ title }${ loadingDots }` }
      </span>
    </Container>
  );
};

export default Loader;
