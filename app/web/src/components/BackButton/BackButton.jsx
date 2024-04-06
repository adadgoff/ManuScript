import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BackButton = ({ children, ...props }) => {
  const navigate = useNavigate();

  return (
    <Button
      children={ children }
      onClick={ () => navigate(-1) }
      { ...props }
    />
  );
};

export default BackButton;