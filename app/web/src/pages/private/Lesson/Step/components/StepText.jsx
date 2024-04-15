import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { TINY_MCE_API_KEY } from "../../../../../constants/TextEditor/TextEditorConstants";

const StepText = ({ ...props }) => {
  return (
    <div className="border border-primary-subtle rounded-3">
      <Editor
        apiKey={ TINY_MCE_API_KEY }
        initialValue={ props.step.text }
        disabled={ true }
        init={ {
          toolbar: false,
          menubar: false,
          readonly: 1,
          branding: false,
        } }
      />
    </div>
  );
};

export default StepText;