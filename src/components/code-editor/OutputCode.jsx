
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

    const numberOfLines = code?.split('\n').length;
    const lineHeight = 22;
    const height = numberOfLines * lineHeight;

    return (

        <div className="parent-container">

            {codeCopied ? <h3 className='ml-[80%] sm:ml-[91%] w-fit rounded-md bg-slate-800 text-slate-100 px-2 py-2 tracking-wide'>Copied!</h3> : <h3 className='h-10 w-fit tracking-wide'></h3>}

            <div className="code-editor-container">

                <div className="code-editor-header grid grid-cols-12 bg-slate-800">
                    {/* Logo on the left */}
                    <div className='flex flex-row gap-x-1 ml-3 col-span-2 items-center'>
                        <div className='bg-red-500 rounded-full h-3 w-3'></div>
                        <div className='bg-yellow-400 rounded-full h-3 w-3'></div>
                        <div className='bg-green-500 rounded-full h-3 w-3'></div> 
                    </div>
 
                    <div className='col-span-6 flex justify-start'>
                        <h2 className='text-xs/5 bg-slate-700/35 rounded-md px-3 py-1'>{lang}</h2>
                    </div>

                    {/* Copy button on the right */}

                    <div className='col-span-4 flex justify-end mr-1'>
                        <button onClick={copyCodeToClipboard} className="copy-code-button col-span-3 flex items-center justify-end">
                            {codeCopied ? <CiSquareCheck /> : <FaCopy />}
                            {/* <span className=''>{codeCopied ? 'Copied' : 'Copy Code'}</span> */}
                        </button>    </div>


                </div>


                {/* Code editor */}
                <div className="code-editor">
                    <Editor
                        height={height}
                        language={lang}
                        value={code}
                        onMount={handleEditorDidMount}
                        theme="vs-dark"
                        options={{
                            readOnly: true,
                            automaticLayout: true,
                            scrollBeyondLastLine: false,
                            minimap: false,
                            acceptSuggestionOnCommitCharacter: false,
                            tabFocusMode: false,
                            stickyTabStops: false,
                        }}
                    />
                    <p className="mt-2 mb-2 mr-2 text-sm text-gray-400">* Scrolling disabled inside code editor. Move cursor outside.</p>
                </div>

            </div>

        </div>
    );
};

export default OutputCode;
