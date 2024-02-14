import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import RenderHTMLContent from '../../utilities/htmlRenderer/RenderHTMLContent';

const Code_Editor = () => {
    const [lang, setlang] = useState("cpp");
    const[code, setcode] = useState(localStorage.getItem("codeee"));

    const handleLanguageChange = (e) => {
        setlang(document.getElementById("lang").value);
    };

    const changee = (val, e) => {
        setcode(val);
        console.log(code);
        localStorage.setItem("codeee", code);
    }

    return (
        <div>
            <h1 className='text-white m-4 mt-0'> Write your code</h1>
            <div>
                <input type='text' className='m-4' id="lang"/>
                <button className='m-4 text-white bg-slate-500 p-2 rounded-xl'
                        onClick={handleLanguageChange}>Change language</button>
            </div>
            {/* <RenderHTMLContent htmlContent={code} /> */}
            <Editor className='h-[90vh] m-auto border-black border-2 p-10'
                    language={lang} onChange={changee} value={code} />
        </div>
    )
}

export default Code_Editor;
