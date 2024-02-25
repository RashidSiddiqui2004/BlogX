
import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { FaCopy } from "react-icons/fa";
import './codestyle.css'
import { CiSquareCheck } from "react-icons/ci";


const OutputCode = ({ lang, code }) => {
    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    const [codeCopied, setCodeCopied] = useState(false);

    const copyCodeToClipboard = () => {
        navigator.clipboard.writeText(code);
        setCodeCopied(true);

        setTimeout(() => {
            setCodeCopied(false);
        }, 2000);
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
                <h2 className='mx-4 text-xs'>{lang}</h2>
                <button onClick={copyCodeToClipboard} className="copy-code-button">
                   {codeCopied ? <CiSquareCheck/> : <FaCopy />} 
                    <span className='italic'>{codeCopied ? 'Copied' : 'Copy Code'}</span>
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
                        automaticLayout: true,
                        scrollBeyondLastLine:false,
                    }}
                />
            </div>
        </div>
    );
};

export default OutputCode;
