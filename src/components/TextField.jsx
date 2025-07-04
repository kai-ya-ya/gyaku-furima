import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Editor, EditorState, ContentState, CompositeDecorator } from "draft-js";
import "draft-js/dist/Draft.css";

import { t, s, c } from "@res";

const TextField = React.memo(({ classname, text, onChange, placeholder, decorator }) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  useEffect(() => {
    const currentContent = editorState.getCurrentContent();
    if (currentContent.getPlainText() !== text) {
      const contentState = ContentState.createFromText(text || "");
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [text, editorState]);

  const handleEditorChange = useCallback(
    (state) => {
      setEditorState(state);
      const plainText = state.getCurrentContent().getPlainText();

      onChange(plainText);
    },
    [onChange]
  );

  return (
    <div className={`${classname} draftjs-editor-container`}>
      <Editor editorState={editorState} onChange={handleEditorChange} placeholder={placeholder} decorator={decorator} />
    </div>
  );
});

export default TextField;
