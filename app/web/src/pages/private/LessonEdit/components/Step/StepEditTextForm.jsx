import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { TINY_MCE_API_KEY } from "../../../../../constants/TextEditor/TextEditorConstants";

const StepEditTextForm = ({ step, updatedLesson, setUpdatedLesson }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    step.editorRef = editorRef;
  }, [updatedLesson]);

  return (
    <>
      <Form.Label className="mb-0">Текст шага</Form.Label>
      <div className="border border-info rounded-3 mb-3">
        <Editor
          apiKey={ TINY_MCE_API_KEY }
          onInit={ (evt, editor) => editorRef.current = editor }
          initialValue={ (editorRef && editorRef.current) ? step.editorRef.current.getContent() : step.text }
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
    </>
  );
};

export default StepEditTextForm;