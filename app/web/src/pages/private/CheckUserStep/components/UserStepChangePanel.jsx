import { Editor } from "@tinymce/tinymce-react";
import React, { useRef, useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import ImageService from "../../../../API/Image/ImageService";
import { IMAGE_PATH } from "../../../../API/Paths";
import UserStepService from "../../../../API/UserStep/UserStepService";
import { TINY_MCE_API_KEY } from "../../../../constants/TextEditor/TextEditorConstants";
import StringUtils from "../../../../utils/StringUtils";
import StepStatus from "../../Check/components/StepStatus";
import UserStepSavingModal from "./UserStepSavingModal";

const UserStepChangePanel = ({ step, user, userStep, setUserStep }) => {
  const base64Regex = /<img[^>]+src="(data:image\/.*?;base64,.*?)"/g;

  const [saveModalShow, setSaveModalShow] = useState(false);

  const editorRef = useRef(null);

  const handleChangeToCorrect = async (event) => {
    try {
      setSaveModalShow(true);
      const response = await UserStepService.toCorrectUserStep(step.id, user.uuid);
      setUserStep(prevState => ({ ...prevState, status: response.status }));
    } catch (error) {
      console.log("Error updating status user step", error);
    } finally {
      setSaveModalShow(false);
    }
  };

  const handleChangeToIncorrect = async (event) => {
    try {
      setSaveModalShow(true);
      const response = await UserStepService.toIncorrectUserStep(step.id, user.uuid);
      setUserStep(prevState => ({ ...prevState, status: response.status }));
    } catch (error) {
      console.log("Error updating status user step", error);
    } finally {
      setSaveModalShow(false);
    }
  };

  const handleSaveCommentBtn = async (event) => {
    try {
      setSaveModalShow(true);
      const content = editorRef.current.getContent();
      const teacher_comment = await StringUtils.replaceAsync(content, base64Regex, async (full, base64String) => {
        const blob = await fetch(base64String).then(res => res.blob());
        const response = await ImageService.uploadImage(blob);
        return full.replace(base64String, `${ IMAGE_PATH }/${ response.uuid }`);
      });

      const response = await UserStepService.addTeacherComment(step.id, user.uuid, teacher_comment);
      setUserStep(response);
      editorRef.current.setContent(userStep.teacher_comment);
    } catch (error) {
      console.log("Error adding teacher comment.", error);
    } finally {
      setSaveModalShow(false);
    }
  };

  return (
    <>
      <UserStepSavingModal show={ saveModalShow }/>

      <div className="border border-primary rounded p-3 pt-4 my-4">
        <Stack direction="horizontal" gap={ 3 } className="mb-2">
          <Button variant="outline-success"
                  className="w-100 fw-medium"
                  children={ "Отметить верным" }
                  disabled={ userStep.status === StepStatus.CORRECT }
                  onClick={ handleChangeToCorrect }/>

          <Button variant="outline-danger"
                  className="w-100 fw-medium"
                  children={ "Отметить неверным" }
                  disabled={ userStep.status === StepStatus.INCORRECT }
                  onClick={ handleChangeToIncorrect }/>
        </Stack>

        <Form.Label className="mb-0">Добавить комментарий к работе учащегося</Form.Label>
        <div className="mb-4 border border-info rounded-3">
          <Editor
            apiKey={ TINY_MCE_API_KEY }
            onInit={ (evt, editor) => editorRef.current = editor }
            initialValue={ userStep.teacher_comment }
            init={ {
              plugins: [
                "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
                "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
                "insertdatetime", "media", "table", "code", "help", "wordcount"
              ],

              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",

              branding: false,
            } }
          />
        </div>

        <Button children={ "Сохранить комментарий" }
                variant="outline-success"
                className="w-100 mb-2"
                onClick={ handleSaveCommentBtn }
                size="lg"/>
      </div>
    </>
  );
};

export default UserStepChangePanel;