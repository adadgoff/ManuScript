import { Editor } from "@tinymce/tinymce-react";
import React, { useRef } from "react";
import { TINY_MCE_API_KEY } from "../../components/TextEditor/constants";

const Test = () => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <>
      <Editor
        apiKey={ TINY_MCE_API_KEY }
        onInit={ (evt, editor) => editorRef.current = editor }
        initialValue="<p>This is the initial content of the editor.</p>"
        disabled={ true }
        init={ {
          menubar: false,
          toolbar: false,
          readonly: 1,
        } }
      />
      <button onClick={ log }>Log editor content</button>
    </>
  );
};

export default Test;