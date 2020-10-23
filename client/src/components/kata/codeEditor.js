import React from "react";
import AceEditor from "react-ace";
 
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
 
function onChange(newValue) {
  console.log("change", newValue);
}

const style = {
    width: '100%',
    height: '100%'
}

const CodeEditor = ({template}) => {
    return <AceEditor
    mode="javascript"
    theme="monokai"
    onChange={onChange}
    name="UNIQUE_ID_OF_DIV"
    editorProps={{ $blockScrolling: true }}
    fontSize={14}
    highlightActiveLine={true}
    value={template}
    setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
    }}
    style={style}
  />;
};

export default CodeEditor;