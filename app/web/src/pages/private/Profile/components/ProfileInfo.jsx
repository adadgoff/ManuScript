import React from "react";
import { Card, CardImg, Form, FormGroup, Image, Stack } from "react-bootstrap";
import { IMAGE_PATH } from "../../../../API/Paths";
import { DEFAULT_USER_ICON_PATH } from "../../../../constants/Image/ImageConstants";

const ProfileInfo = ({ user }) => {
  return (
    <Card className="my-3 p-2 pt-1 pb-3 mb-4">
      <Stack direction="horizontal" className="w-100" gap={2}>
        <CardImg
          src={ user.icon ? `${ IMAGE_PATH }/${ user.icon.uuid }` : DEFAULT_USER_ICON_PATH }
          alt="Icon"
          className="p-0 btn-light border border-secondary-subtle rounded"
          style={ { height: "80px", width: "80px", alignContent: "center", cursor: "pointer" } }
        />

        <FormGroup className="w-100">
          <Form.Text>Идентификационный номер</Form.Text>
          <Form.Control
            size="sm"
            value={ user.uuid }
            readOnly/>

          <Form.Label className="mt-2 mb-0">Почта пользователя</Form.Label>
          <Form.Control
            value={ user.email }
            readOnly/>

          <Form.Label className="mt-2 mb-0">Имя пользователя</Form.Label>
          <Form.Control
            value={ user.username }
            readOnly/>
        </FormGroup>
      </Stack>
    </Card>
  );
};

export default ProfileInfo;