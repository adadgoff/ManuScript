import React, { useState } from "react";
import { Alert, Button, CardImg, Form, Stack } from "react-bootstrap";
import { IMAGE_PATH } from "../../../../API/Paths";
import UserService from "../../../../API/User/UserService";
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "../../../../constants/Auth/AuthConstants";
import { IMAGE_EXTENSION_ERROR, IMAGE_SIZE_ERROR, PASSWORD_ERROR } from "../../../../constants/Error/ErrorConstants";
import { DEFAULT_USER_ICON_PATH, IMAGE_MAX_SIZE } from "../../../../constants/Image/ImageConstants";
import { USER_MAX_USERNAME_LENGTH } from "../../../../constants/User/UserConstants";
import ErrorFileAlert from "./ErrorFileAlert";
import ErrorPasswordAlert from "./ErrorPasswordAlert";
import ProfileSavingModal from "./ProfileSavingModal";

const ProfileEditForm = ({ updatedUser, setUpdatedUser, setAuthUser }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [icon, setIcon] = useState(null);

  const [errorFileMessage, setErrorFileMessage] = useState("");
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");

  const [saveModalShow, setSaveModalShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    if (form.checkValidity() === true) {
      try {
        setSaveModalShow(true);
        const { username, icon, password, new_password } = updatedUser;
        const updatedUserData = { username, icon, password, new_password };
        const response = await UserService.updateUser(updatedUserData, selectedFile);

        if (response.detail) {
          setErrorPasswordMessage(response.detail);
          return;
        }

        setAuthUser({ ...response });
        setUpdatedUser({ ...response, password: "", new_password: "", confirm_password: "" });
        setSelectedFile(null);
      } catch (error) {
        console.log("Error updating user", error);
      } finally {
        setSaveModalShow(false);
      }
    }
  };

  const handleUserFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.size > IMAGE_MAX_SIZE) {
        setErrorFileMessage(IMAGE_SIZE_ERROR);
        return;
      }

      if (!file.type.startsWith("image/")) {
        setErrorFileMessage(IMAGE_EXTENSION_ERROR);
        return;
      }

      setSelectedFile(file);
      setErrorFileMessage("");
      const reader = new FileReader();
      reader.onloadend = () => {
        setIcon(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleUserUsernameChange = (event) => {
    setUpdatedUser({ ...updatedUser, username: event.target.value });
  }

  const handleUserNewPasswordChange = (event) => {
    setUpdatedUser({ ...updatedUser, new_password: event.target.value });
  }

  const handleUserConfirmPasswordChange = (event) => {
    setUpdatedUser({ ...updatedUser, confirm_password: event.target.value });
  }

  const handleUserPasswordChange = (event) => {
    setUpdatedUser({ ...updatedUser, password: event.target.value });
  }

  return (
    <>
      <ProfileSavingModal
        show={ saveModalShow }/>

      { errorFileMessage && <ErrorFileAlert errorFileMessage={ errorFileMessage }
                                            setErrorFileMessage={ setErrorFileMessage }/> }

      { errorPasswordMessage && <ErrorPasswordAlert errorPasswordMessage={ errorPasswordMessage }
                                                    setErrorPasswordMessage={ setErrorPasswordMessage }/> }

      <Form noValidate validated={ validated } onSubmit={ handleSubmit }>
        <Stack direction="horizontal" className="mb-3">
          <div className="d-flex align-items-center justify-content-center">
            <input type="file" id="fileInput" className="d-none" accept="image/*"
                   onChange={ handleUserFileChange }/>
            <label htmlFor="fileInput">
              <CardImg
                src={ icon || (updatedUser.icon ? `${ IMAGE_PATH }/${ updatedUser.icon.uuid }` : DEFAULT_USER_ICON_PATH) }
                alt="Icon"
                className="p-0 btn-light border border-info rounded"
                style={ { height: "80px", width: "80px", alignContent: "center", cursor: "pointer" } }
              />
            </label>
          </div>

          <Stack direction="vertical" className="ms-3">
            <div className="mb-2">
              <Stack direction="horizontal">
                <Form.Label className="mb-0">Новое имя пользователя</Form.Label>
                <Form.Text
                  className="ms-auto">{ `${ updatedUser.username.length } / ${ USER_MAX_USERNAME_LENGTH }` }</Form.Text>
              </Stack>
              <Form.Control
                required
                type="text"
                minLength={ 1 }
                maxLength={ USER_MAX_USERNAME_LENGTH }
                className="border border-info rounded mb-0"
                placeholder={ "Новое имя пользователя" }
                onChange={ handleUserUsernameChange }
                value={ updatedUser.username }/>
              <Form.Control.Feedback type="invalid" children={ "Имя пользователя не должно быть пустым!" }/>
            </div>

            { updatedUser.new_password !== updatedUser.confirm_password &&
              <Alert variant="danger"
                     className="mt-2 mb-0">Пароли не совпадают!</Alert> }

            <div className="mb-2">
              <Stack direction="horizontal">
                <Form.Label className="mb-0">Новый пароль</Form.Label>
              </Stack>
              <Form.Control
                required
                type="password"
                minLength={ PASSWORD_MIN_LENGTH }
                maxLength={ PASSWORD_MAX_LENGTH }
                className="border border-info rounded"
                placeholder={ "Новый пароль" }
                onChange={ handleUserNewPasswordChange }
                value={ updatedUser.new_password }/>
              <Form.Control.Feedback type="invalid" children={ PASSWORD_ERROR }/>
            </div>

            <div>
              <Stack direction="horizontal">
                <Form.Label className="mb-0">Подтверждение нового пароля</Form.Label>
              </Stack>
              <Form.Control
                required
                type="password"
                minLength={ PASSWORD_MIN_LENGTH }
                maxLength={ PASSWORD_MAX_LENGTH }
                className="border border-info rounded"
                placeholder={ "Подтверждение нового пароля" }
                onChange={ handleUserConfirmPasswordChange }
                value={ updatedUser.confirm_password }/>
              <Form.Control.Feedback type="invalid" children={ PASSWORD_ERROR }/>
            </div>

          </Stack>
        </Stack>
        <Stack direction="horizontal" gap={ 3 } className="">
          <div className="w-100">
            <Stack direction="horizontal">
              <Form.Label className="mb-0">Введите старый пароль для аутентификации</Form.Label>
            </Stack>
            <Form.Control
              required
              type="password"
              minLength={ 5 }
              maxLength={ PASSWORD_MAX_LENGTH }
              className="border border-warning rounded"
              placeholder={ "Старый пароль" }
              onChange={ handleUserPasswordChange }
              value={ updatedUser.password }/>
            <Form.Control.Feedback type="invalid" children={ PASSWORD_ERROR }/>
          </div>

          <Button className="ms-auto"
                  variant="outline-primary"
                  children={ "Обновить профиль" }
                  type="submit"
                  disabled={ !updatedUser.new_password || !updatedUser.confirm_password || !updatedUser.password ||
                    updatedUser.new_password !== updatedUser.confirm_password }/>
        </Stack>
      </Form>
    </>
  );
};

export default ProfileEditForm;