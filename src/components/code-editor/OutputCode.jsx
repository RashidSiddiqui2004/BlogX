
import React, { useEffect, useRef } from 'react';
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
    };

    const numberOfLines = code.split('\n').length;
    const lineHeight = 20;
    const height = numberOfLines * lineHeight;

    return (
        <div className="code-editor-container">
            <div className="code-editor-header bg-slate-800">

                <div className='flex flex-row gap-x-1 ml-3'>
                    <div className='bg-red-500 rounded-full h-3 w-3'></div>
                    <div className='bg-yellow-400 rounded-full h-3 w-3'></div>
                    <div className='bg-green-500 rounded-full h-3 w-3'></div>
                </div>
                <h2 className='mx-4'>{lang}</h2>
                <button onClick={copyCodeToClipboard} className="copy-code-button">
                    <FaCopy />
                    <span>Copy Code</span>
                </button>
            </div>
            <div className="code-editor">
                <Editor
                    height={height}
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
