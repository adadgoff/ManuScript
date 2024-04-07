import { Editor } from "@tinymce/tinymce-react";
import React, { useRef } from "react";
import ImageService from "../../API/Image/ImageService";
import { TINY_MCE_API_KEY } from "../../constants/TextEditor/TextEditorConstants";
import StringUtils from "../../utils/StringUtils";

const Test = () => {
  const editorRef = useRef(null);

  const updateContent = async () => {
    if (editorRef.current) {
      const base64Regex = /<img[^>]+src="(data:image\/.*?;base64,.*?)"/g;
      const content = editorRef.current.getContent();

      const updatedContent = await StringUtils.replaceAsync(content, base64Regex, async (full, base64String) => {
        const blob = await fetch(base64String).then(res => res.blob());
        const response = await ImageService.uploadImage(blob);
        return full.replace(base64String, response.uuid);
      });

      console.log(updatedContent);
    }
  };

  const log = async () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      console.log(`| Editor content |\n========================================================\n${ content }`);
    }
  };

  return (
    <>
      <Editor
        apiKey={ TINY_MCE_API_KEY }
        onInit={ (evt, editor) => editorRef.current = editor }
        init={ {
          plugins: [
            "autoresize",
            "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
            "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
            "insertdatetime", "media", "table", "code", "help", "wordcount"
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
        } }
        initialValue="Редактируйте содержимое шага :)"
      />
      <button onClick={ updateContent }>Update editor content</button>
      <button onClick={ log }>Log editor content</button>
    </>
  );
};

export default Test;