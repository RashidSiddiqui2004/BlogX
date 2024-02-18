
import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';
import { FaCopy } from "react-icons/fa";
import './codestyle.css'

const OutputCode = ({ lang, code }) => {
    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    const copyCodeToClipboard = () => {
        navigator.clipboard.writeText(code);
        // alert('Code copied to clipboard!');
    };

    return (
        <div className="code-editor-container">
            <div className="code-editor-header">
                <h2 className='mx-14'>{lang}</h2>
                <button onClick={copyCodeToClipboard} className="copy-code-button">
                    <FaCopy />
                    <span>Copy Code</span>
                </button>
            </div>
            <div className="code-editor">
                <Editor
                    className='m-auto p-10 h-[50vh]'
                    language={lang}
                    value={code}
                    onMount={handleEditorDidMount}
                    options={{
                        readOnly: true,
                        automaticLayout: true
                    }}
                />
            </div>
        </div>
    );
};

export default OutputCode;
