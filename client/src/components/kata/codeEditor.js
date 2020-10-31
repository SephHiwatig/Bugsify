import React from "react";
import AceEditor from "react-ace";
 
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

const style = {
    width: '100%',
    height: '100%'
}

const CodeEditor = ({template, solution}) => {
    return <AceEditor
    mode="javascript"
    theme="monokai"
    onChange={(newValue) => {
      solution(newValue);
    }}
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