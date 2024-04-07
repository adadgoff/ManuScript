import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ImageService from "../../API/Image/ImageService";

const Test2 = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert("Выберите файл");
      return;
    }

    try {
      const response = await ImageService.uploadImage(selectedFile);
      console.log("Success uploading file", response);
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  return (
    <div>
      <Form method="POST" onSubmit={ handleFormSubmit }>
        <input
          type="file"
          onChange={ (event) => setSelectedFile(event.target.files[0]) }
          accept="image/png, image/jpg, image/jpeg, image/svg, image/gif, image/web"
        />
        <Button type="submit">Отправить</Button>
      </Form>
    </div>
  );
};

export default Test2;
