import React from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { Button } from "@mui/material";
import html2canvas from "html2canvas";

const EditorLayout = (props) => {
  const editorRef = React.useRef(null);

  const [code, setCode] = React.useState("console.log('hello')");
  const [editorMounted, setEditorMounted] = React.useState(false);
  const [screenshot, setScreenshot] = React.useState("");

  const handleClick = async () => {
    if (!editorMounted) return;

    // scroll to top
    editorRef.current.setScrollTop(0);
    // Modify the height of the editor to display all of the code
    editorRef.current.layout({
      height: editorRef.current.getContentHeight(),
      width: editorRef.current.getContentWidth() + 200,
    });

    // console.log("clk",editorRef,editorRef.current.getValue(),editorRef.current.getDomNode(),editorRef.current.getContentHeight(),editorRef.current.getContentWidth());
    html2canvas(editorRef.current.getDomNode())
      .then((img) => setScreenshot(img.toDataURL()))
      .then(
        // Reset the height of the editor back to its original value
        editorRef.current.layout()
      );
  };

  const handleCodeChange = (Changedvalue) => {
    setCode(Changedvalue);
  };

  return (
    <>
      <Button onClick={handleClick}>Take ScreenShot</Button>

      <div>
        <Editor
          value={code}
          language={props.language || "javascript"}
          theme={props.theme || "all-hallows-eve"}
          onChange={handleCodeChange}
          className={"myeditor"}
          height={"100vh"}
          width={"80vw"}
          // onMount={onMountFunc}
          options={{
            automaticLayout: true,
            scrollBeyondLastLine: false,
          }}
          onMount={(editor) => {
            editorRef.current = editor;
            setEditorMounted(true);
          }}
        />
      </div>

      <h2> ScreenShot </h2>

      {screenshot && <img src={screenshot} />}
    </>
  );
};

export default EditorLayout;
