class StepUtils {
  static extractEditorContentFromSteps = (steps) => {
    const editorContent = {};
    steps.forEach(step => {
      if (step.editorRef && step.editorRef.current) {
        editorContent[step.order] = step.editorRef.current.getContent();
      }
    });
    return editorContent;
  }
}

export default StepUtils;