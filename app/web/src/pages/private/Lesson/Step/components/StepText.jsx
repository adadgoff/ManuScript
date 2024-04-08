import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { TINY_MCE_API_KEY } from "../../../../../constants/TextEditor/TextEditorConstants";

const StepText = ({ ...props }) => {
  return (
    <Editor
      apiKey={ TINY_MCE_API_KEY }
      initialValue={ props.step.text }
      disabled={ true }
      init={ {
        plugins: "autoresize",
        toolbar: false,
        menubar: false,
        readonly: 1,
        branding: false,
      } }
    />
  );
};

export default StepText;