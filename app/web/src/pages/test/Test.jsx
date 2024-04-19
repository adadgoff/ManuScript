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
    }
  };

  const log = async () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      console.log(`| Editor content |\n========================================================\n${ content }`);
    }
  };

  const t = async () => {
    const text = "<p>Редактируйте содержимое шага :)</p>" +
      "<p>&nbsp;</p>" +
      "<p>" +
      "<img src=\"http://kaa77.keenetic.pro:8000/api/image/b1928b18-d8c8-47c0-942b-33d4370d1377\">" +
      "<img src=\"http://kaa77.keenetic.pro:8000/api/image/7278eddc-3496-42c0-9ee4-44381ad93c49\">" +
      "<img src=\"http://kaa77.keenetic.pro:8000/api/image/17fa62cd-cb47-4760-b0aa-ad3be8203587\">" +
      "<img src=\"http://kaa77.keenetic.pro:8000/api/image/7cd8dc2a-38ea-4757-a9ce-6202a97d8263\">" +
      "<img src=\"http://kaa77.keenetic.pro:8000/api/image/214c960a-0242-4d42-902a-27317c2f885b\">" +
      "<img src=\"https://gas-kvas.com/grafic/uploads/posts/2023-10/1696502271_gas-kvas-com-p-kartinki-lyubie-5.jpg\"" +
      "</p>" +
      "<p>Редактируйте содержимое шага :)</p>" +
      "<p><strong>test</strong></p>" +
      "<p>&nbsp;</p>" +
      "<p><em>cool</em></p>";
    editorRef.current.setContent(text)
  }

  return (
    <>
      <Editor
        apiKey={ TINY_MCE_API_KEY }
        onInit={ (evt, editor) => editorRef.current = editor }
        init={ {
          plugins: [
            // "autoresize",
            "advlist", "autolink", "lists", "link", "image", "editimage", "charmap", "preview",
            "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
            "insertdatetime", "media", "table", "code", "help", "wordcount"
          ],

          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",

          branding: false,

          content_security_policy: false,
        } }
        initialValue="Редактируйте содержимое шага :)"
      />
      <button onClick={ updateContent }>Update editor content</button>
      <button onClick={ log }>Log editor content</button>
      <button onClick={ t }>test</button>
    </>
  );
};

export default Test;