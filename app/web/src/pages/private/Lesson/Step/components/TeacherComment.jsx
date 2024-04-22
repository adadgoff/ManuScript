import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { Form } from "react-bootstrap";
import { TINY_MCE_API_KEY } from "../../../../../constants/TextEditor/TextEditorConstants";

const TeacherComment = ({ userStep }) => {
  return (
    <div className="my-4">
      <Form.Label className="mb-0">Комментарий от преподавателя</Form.Label>
      <div className="border border-primary rounded-3">
        <Editor
          apiKey={ TINY_MCE_API_KEY }
          initialValue={ userStep.teacher_comment }
          disabled={ true }
          init={ {
            toolbar: false,
            menubar: false,
            readonly: 1,
            branding: false,
          } }
        />
      </div>
    </div>
  );
};

export default TeacherComment;