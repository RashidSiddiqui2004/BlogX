import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import OutputCode from './OutputCode';

const Code_Editor = () => {
    const [lang, setLang] = useState("javascript");
    const [codes, setCodes] = useState(["",""]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const editorRefs = useRef([]);

    const handleLanguageChange = (e) => {
        setLang(e.target.value);
    };

    const handleEditorDidMount = (editor, monaco, index) => {
        editorRefs.current[index] = editor;
    };

    const handleCodeChange = (val, index) => {
        const newCodes = [...codes];
        newCodes[index] = val;
        setCodes(newCodes);
    };

    const submitCode = (index) => {
        const savedCode = editorRefs.current[index].getValue();
        setIsSubmitted(true);
        setCodes((prevCodes) => {
            const newCodes = [...prevCodes];
            newCodes[index] = savedCode;
            return newCodes;
        });
        console.log(codes);
    };

    return (
        <div className="text-white mt-8">
            <div className="flex flex-row ml-10 gap-x-4">
                <h2 className="text-semibold mt-2">Select Language</h2>
                <select
                    className="bg-slate-700 px-3 text-white p-2 rounded-md focus:outline-none"
                    onChange={handleLanguageChange}
                    value={lang}
                >
                    <option value="javascript">JavaScript</option>
                    <option value="cpp">C++</option>
                    <option value="python">Python</option>
                    <option value="kotlin">Kotlin</option>
                    <option value="java">Java</option>
                </select>
            </div>

            {codes.map((code, index) => (
                <div key={index}>
                    <Editor
                        className="h-[50vh] m-auto p-10 bg-gray-800 text-white"
                        defaultLanguage={lang}
                        defaultValue="// Write your code here..."
                        language={lang}
                        onChange={(val) => handleCodeChange(val, index)}
                        value={code}
                        onMount={(editor, monaco) => handleEditorDidMount(editor, monaco, index)}
                    />

                    <button
                        onClick={() => submitCode(index)}
                        className="bg-green-400 text-gray-900 rounded-md my-5 px-3 py-3"
                    >
                        Submit Code
                    </button>
                </div>
            ))}

            {isSubmitted && (
                <div>
                    {codes.map((savedCode, index) => (
                        <OutputCode key={index} lang={lang} code={savedCode} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Code_Editor;
