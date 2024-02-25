
import React, { useContext, useEffect, useRef, useState } from 'react'
import myContext from '../../context/data/myContext';
import { Editor } from '@tinymce/tinymce-react';
import getUsernameByUID from '../.././utilities/userData/GetUser';
import { uploadFile } from '../.././utilities/uploadFile/UploadFile';
import getUserID from '../../utilities/userData/GetUserID';
import departmentsInDevComm from "../../utilities/departments/departmentsInDevComm.js";

import BtnTemplate from '../../utilities/BtnTemplate2/BtnTemplate';
import { toast } from 'react-toastify';
import { Editor as CodeEditor } from '@monaco-editor/react';
import isValidUrl from './CheckIfUrl';
import PDF from './pdf.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'; 

function AddBlog() {

    const context = useContext(myContext);
    const { blog, setBlog, createBlog } = context;

    // for saving blog content if user has not published it yet -> for user convenience
    // smooth experience on website

    const [tags, setTags] = useState([]);
    // const [codelinks, setCodelinks] = useState([]);
    const [useImageUrl, setUseImageUrl] = useState(true);
    const [imageFile, setImageFile] = useState(null);

    const [postPreview, setPostPreview] = useState(false);

    const handleCheckboxChange = () => {
        setUseImageUrl(!useImageUrl);
    };

    const handleImageFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const [currentTag, setCurrentTag] = useState('');

    const handleInputChange = (e) => {
        const newTag = e.target.value.trim();
        setCurrentTag(newTag);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' && currentTag.trim() !== '') {
            const newTag = e.target.value.trim();
            setTags([...tags, currentTag.trim()]);
            setBlog((prevBlog) => ({ ...prevBlog, tags: [...prevBlog.tags, newTag] }));
            setCurrentTag('');
        }
    };

    const handleTagRemove = (index) => {
        const updatedTags = [...tags];
        updatedTags.splice(index, 1);
        setTags(updatedTags);
        setBlog((prevBlog) => {
            const updatedTags = [...prevBlog.tags];
            updatedTags.splice(index, 1);
            return { ...prevBlog, tags: updatedTags };
        });
    };


    // author details

    const [u_name, setUser] = useState('');
    const [userId, setUserId] = useState('');

    // reference to title input

    const titleRef = useRef(null);

    // Reference to the TinyMCE editor
    // const blogEditor = useRef(null);

    const blogSummaryEditor = useRef(null);

    const [sections, setSections] = useState([{ id: 1 }]);
    const editorRefs = useRef([]);

    const handleAddNewSection = () => {
        const newSection = { id: sections.length + 1 };
        setSections([...sections, newSection]);

        setBlog(prevBlog => {
            const sectionTitlesCopy = [...prevBlog.sectionTitles];
            while (sectionTitlesCopy.length <= sections.length) {
                sectionTitlesCopy.push(null);
            }
            // sectionTitlesCopy[sections.length-1] = null;
            return { ...prevBlog, sectionTitles: sectionTitlesCopy };
        });

        setCodes((prevCodes) => {
            const newCodes = [...prevCodes];

            for (let i = newCodes.length; i <= sections.length; i++) {
                newCodes.push(null);
            }

            return newCodes;
        });

    };

    // implement
    const handleRemoveSection = () => {
        return;
    }

    const [checksCodeblock, setChecksCodeblock] = useState([false]);

    const handleCodeBlock = (index) => {
        setChecksCodeblock((prevChecks) => {
            const indexExists = prevChecks[index] !== undefined;

            // If index exists, toggle its value 
            if (indexExists) {
                return prevChecks.map((value, i) => (i === index ? !value : value));
            } else {
                // If index does not exist, add a new element with value true
                const newChecks = [...prevChecks];
                newChecks[index] = true;
                return newChecks;
            }
        });
    };

    const [uploadFileBlock, setUploadFileBlock] = useState([false]);

    const handleFileUploadBlock = (index) => {
        setUploadFileBlock((prevChecks) => {
            const indexExists = prevChecks[index] !== undefined;

            // If index exists, toggle its value 
            if (indexExists) {
                return prevChecks.map((value, i) => (i === index ? !value : value));
            } else {
                // If index does not exist, add a new element with value true
                const newChecks = [...prevChecks];
                newChecks[index] = true;
                return newChecks;
            }
        });
    };

    // add code block code below
    const lang = "javascript";

    const [languages, setLang] = useState(["javascript"]);
    const [codes, setCodes] = useState([null]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const codeEditorRefs = useRef([]);

    const handleLanguageChange = (e) => {
        setLang(e.target.value);
    };

    const handleEditorDidMount = (editor, monaco, index) => {
        codeEditorRefs.current[index] = editor;
    };

    const handleCodeChange = (val, index) => {
        const newCodes = [...codes];
        newCodes[index] = val;
        setCodes(newCodes);
    };

    const submitCode = (index) => {
        const savedCode = codeEditorRefs.current[index].getValue();
        setIsSubmitted(true);

        setCodes((prevCodes) => {
            const newCodes = [...prevCodes];

            // Check if there are missing elements up to the specified index
            for (let i = newCodes.length; i <= index; i++) {
                // Add null values for missing elements
                newCodes.push(null);
            }

            // Add the saved code at the specified index
            newCodes[index] = savedCode;

            return newCodes;
        });
    };

    // handle section save code
    const handleSaveContent = async () => {

        const updatedBlogContent = [...blog.blogContent];

        // Create an array to store promises for each section update
        const updatePromises = editorRefs.current.map(async (editor, index) => {
            const content = await editor.getContent();

            const codeForSection = codes[index];

            let filesForThisSection = {};

            let pos = 0;

            filesForSections[index]?.forEach(element => {
                filesForThisSection[pos] = (element);
                pos++;
            });

            const newSection = {
                title: blog?.sectionTitles[index],
                content: content,
                code: codeForSection,
                resources: filesForThisSection,
            };
            
            // Update or add the new section to the array
            if (index >= 0 && index < updatedBlogContent.length) {
                updatedBlogContent[index] = newSection;
            } else {
                updatedBlogContent.push(newSection);
            }
        });

        await Promise.all(updatePromises);

        setBlog({ ...blog, blogContent: updatedBlogContent, filesUpload: null });

        localStorage.setItem('temporaryBlog', JSON.stringify(blog));

        console.log(blog);
    };


    // pre-upload checking
    const checkIfAllFieldsAreFilled = async () => {

        await handleSaveContent();

        const blogSummary = await blogSummaryEditor.current.getContent();

        localStorage.setItem('temporaryBlog', JSON.stringify(blog));

        // Update state using the state updater function
        setBlog((prevBlog) => ({ ...prevBlog, summary: blogSummary }));

        if (!(imageFile == null)) {
            try {
                const imageUrlfromFB = await uploadFile(imageFile)

                // Update state with the image URL
                if (imageUrlfromFB !== null) {
                    setBlog((prevBlog) => ({ ...prevBlog, blogPoster: imageUrlfromFB }));
                }

            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        if (!(blog.title == "" || blog.department == "" ||
            blog.summary === "<p>Write blog summary</p>" || blog.tags.length < 1)) {
            setPostPreview(true);
        }
        else {
            toast.info("All fields are required!", {
                position: 'top-right',
                autoClose: 800,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        return;
    };

    const uploadBlog = async () => {
        const postUploadstate = await createBlog().then(() => localStorage.removeItem('temporaryBlog'));

        console.log(blog);

        return postUploadstate;
    }

    const maxFilesPerSection = 4;

    const [filesForSections, setFilesForSections] = useState(Array.from({ length: 1 }, () => []));
    const [fileName, setFileName] = useState('');

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event, sectionIndex) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setFileName(file.name);
        submitFileforSections(file, sectionIndex);
    };

    const submitFileforSections = async (file, sectionIndex) => {

        let fileURL = null;

        const filename = file.name;

        if (file) {
            try {
                const uploadedFileURL = await uploadFile(file);
                if (uploadedFileURL) {
                    fileURL = uploadedFileURL;
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }

        const sectionFiles = filesForSections[sectionIndex];

        if (sectionFiles && sectionFiles.length < maxFilesPerSection) {
            const fileObject = {
                filename: filename,
                fileURL: fileURL
            }
            const updatedFiles = [...sectionFiles, fileObject];
            const newFilesForSections = [...filesForSections];
            newFilesForSections[sectionIndex] = updatedFiles;
            setFilesForSections(newFilesForSections);
        }

        else if (sectionFiles === undefined) {
            const updatedFiles = [fileURL];
            const newFilesForSections = [...filesForSections];
            newFilesForSections[sectionIndex] = updatedFiles;
            setFilesForSections(newFilesForSections);
        }
        else {
            alert('Maximum number of files reached for this section');
        }
    };

    const handleFileChange = (event, sectionIndex) => {
        const file = event.target.files[0];
        setFileName(file.name);
        submitFileforSections(file, sectionIndex);
    };

    const removeFile = (sectionIndex, fileIndex) => {
        const updatedFiles = [...filesForSections[sectionIndex]];
        updatedFiles.splice(fileIndex, 1);
        const newFilesForSections = [...filesForSections];
        newFilesForSections[sectionIndex] = updatedFiles;
        setFilesForSections(newFilesForSections);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const uid = await getUserID();
                const username = await getUsernameByUID(uid);

                if (username) {
                    setUser(username);
                    setUserId(uid);
                    blog.authorId = uid;
                    blog.author = username;

                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        titleRef.current.focus();
        fetchData();

        const savedBlog = localStorage.getItem("temporaryBlog");

        if (savedBlog !== null) {
            setBlog(JSON.parse(savedBlog));
        }

    }, []);

    return (
        <div>
            <div className='flex justify-center items-center postbg py-8' style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                <div className='bg-gray-800 px-10 py-10 rounded-xl w-[90%] md:w-[80%]'>
                    <div className='flex gap-4 justify-center'>
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Publish Blog on BlogX</h1>

                        <span className='-my-3'><img src="https://res.cloudinary.com/drlkkozug/image/upload/v1705042854/ynrer4jfk9ywantavge8.png" alt="New Post" width={50} srcSet="" /></span>
                    </div>


                    {/* title of blog */}
                    <div>
                        <input type="text"
                            ref={titleRef}
                            value={blog.title}
                            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                            name='title'
                            className='bg-inherit text-3xl mb-4 px-2 py-2 w-full rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
                            placeholder='Post title'
                        />
                    </div>


                    {/* sections input code */}
                    <div>
                        {sections.map((section, index) => (
                            <div key={section.id}>

                                <div>
                                    <input type="text"
                                        value={blog.sectionTitles[index]}

                                        onChange={(e, i) => {
                                            setBlog(prevBlog => {
                                                const sectionTitlesCopy = [...prevBlog.sectionTitles];
                                                // If index i is out of bounds, fill the array with empty strings up to index i
                                                while (sectionTitlesCopy.length <= i) {
                                                    sectionTitlesCopy.push(null);
                                                }
                                                sectionTitlesCopy[index] = e.target.value;
                                                return { ...prevBlog, sectionTitles: sectionTitlesCopy };
                                            });
                                        }}

                                        name='sectionTitle'
                                        className='bg-inherit text-3xl mb-4 px-2 py-2 w-full rounded-lg inputbox
                                         text-white placeholder:text-gray-200 placeholder:text-xl outline-none'
                                        placeholder={`Section ${index + 1} title ${(index === 0 ? '' : '(leave empty if want to continue with previous section)')}`}
                                    />
                                </div>

                                <Editor
                                    apiKey='aflhte2kchgwcgg6wo27mxqz79lhro2h443k16fftegeoo6x'
                                    onInit={(evt, editor) => (editorRefs.current[index] = editor)}
                                    init={{
                                        menubar: 'favs edit view tools table',
                                        height: 400,
                                        plugins: 'anchor autolink charmap emoticons link lists searchreplace table wordcount',
                                        toolbar: 'undo redo | blocks fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist indent outdent | emoticons charmap | removeformat',
                                    }}
                                    initialValue={
                                        blog?.blogContent[index]?.content ? blog?.blogContent[index]?.content : "Write blog"
                                    }
                                />

                                {(checksCodeblock[index] === true)
                                    ?
                                    <div className="text-white mt-8">
                                        <div className="flex flex-row ml-10 gap-x-4">
                                            <h2 className='text-semibold  mt-2'>Select Language</h2>
                                            <select className="bg-slate-700 px-3 text-white p-2 rounded-md
                                                    focus:outline-none"
                                                id="lang" onChange={handleLanguageChange}>
                                                <option value="javascript">JavaScript</option>
                                                <option value="cpp">C++</option>
                                                <option value="python">Python</option>
                                                <option value="kotlin">Kotlin</option>
                                                <option value="java">Java</option>
                                            </select>
                                        </div>


                                        <div>
                                            <CodeEditor
                                                className="h-[50vh] m-auto p-10 bg-gray-800 text-white"
                                                defaultLanguage={lang}
                                                defaultValue="// Write your code here..."
                                                language={languages[index]}
                                                onChange={(val) => handleCodeChange(val, index)}
                                                value={codes[index]}
                                                onMount={(editor, monaco) => handleEditorDidMount(editor, monaco, index)}
                                            />

                                            <button
                                                onClick={() => submitCode(index)}
                                                className="bg-green-400 text-gray-900 rounded-md my-5 px-3 py-3
                                                shadow-md shadow-green-200
                                                hover:scale-95 transition-all"
                                            >
                                                Save Code Progress
                                            </button>

                                            <button
                                                onClick={() => handleCodeBlock(index)}
                                                className="bg-red-400 text-gray-900 ml-5 rounded-md my-5 px-3 py-3
                                                shadow-md shadow-green-200 hover:scale-95 transition-all"
                                            >
                                                Remove CodeBlock
                                            </button>

                                            <button
                                                onClick={() => handleFileUploadBlock(index)}
                                                className="bg-blue-700 text-white my-4 px-4 py-2 flex justify-end rounded-md
                                             hover:bg-blue-900 focus:outline-none focus:ring
                                              focus:ring-blue-400 hover:scale-95 transition-all duration-300"
                                            >
                                                Upload File
                                            </button>

                                        </div>
                                    </div>
                                    :
                                    <div className=' flex flex-row gap-x-9'>
                                        <button
                                            onClick={() => handleCodeBlock(index)}
                                            className="bg-blue-700 text-white my-4 px-4 py-2 flex justify-end rounded-md
                                             hover:bg-blue-900 focus:outline-none focus:ring
                                              focus:ring-blue-400 hover:scale-95 transition-all duration-300"
                                        >
                                            Add Code Block
                                        </button>

                                        <button
                                            onClick={() => handleFileUploadBlock(index)}
                                            className="bg-blue-700 text-white my-4 px-4 py-2 flex justify-end rounded-md
                                             hover:bg-blue-900 focus:outline-none focus:ring
                                              focus:ring-blue-400 hover:scale-95 transition-all duration-300"
                                        >
                                            Upload File
                                        </button>

                                    </div>
                                }

                                {(uploadFileBlock[index] === true)
                                    ?

                                    <div className="text-white mt-8">
                                        {/* {filesForSections[index].map((sectionFiles, sectionIndex) => ( */}
                                        {/* <div key={sectionIndex}> */}

                                        <div className="grid grid-cols-3 gap-4 mb-3">
                                            {filesForSections[index] && filesForSections[index].map((fileURL, fileIndex) => (
                                                <div key={fileIndex} className="p-4 border border-gray-300 rounded-md flex items-center">
                                                    {fileURL ? (
                                                        <>
                                                            <FontAwesomeIcon icon={faFilePdf} className="text-red-500 mr-2" />
                                                            {/* <a href={fileURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{fileURL}</a> */}
                                                            <button onClick={() => removeFile(index, fileIndex)} className="ml-2 text-red-500 hover:text-red-700">Remove</button>
                                                        </>
                                                    ) : (
                                                        <span className="text-gray-500">No file uploaded</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="bg-blue-200 w-[80%] mx-[10%] h-60 rounded-3xl border-2 border-black border-dotted flex items-center justify-center" onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, sectionIndex)}>

                                            <div className="rounded-full pt-2 pb-4">
                                                <div className="flex flex-col items-center py-8"
                                                    onDrop={(event) => handleDrop(event, index)}>

                                                    <h1 className='text-3xl mb-2 text-slate-900 mt-2'>Drag and drop resources to upload</h1>
                                                    <h1 className='text-xl mb-2 text-blue-600'>or Click here</h1>
                                                    <label htmlFor={`fileInput-${index}`}>
                                                        <img className="w-24 h-24 cursor-pointer" src={PDF} alt="PDF Icon" />
                                                    </label>
                                                    <input
                                                        id={`fileInput-${index}`}
                                                        type="file"
                                                        className="hidden"
                                                        accept="application/pdf"
                                                        onChange={(e) => handleFileChange(e, index)}
                                                    />
                                                    <span className="text-gray-500 text-sm mt-2">{fileName}</span>
                                                    <span className="text-gray-500 text-xs mt-2">Icon by <a className="text-blue-900 hover:text-blue-700" target="_blank" rel="noopener noreferrer" href="https://www.svgrepo.com">svgrepo</a></span>
                                                </div>
                                            </div>
                                        </div>
                                        <input id={`fileInput-${index}`} type="file" className="hidden" accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(event) => handleFileChange(event, sectionIndex)} />


                                        <button
                                            onClick={() => handleFileUploadBlock(index)}
                                            className="bg-red-400 text-gray-900 ml-5 rounded-md my-5 px-3 py-3"
                                        >
                                            Remove File Upload Block
                                        </button>

                                    </div>
                                    :
                                    <>
                                    </>
                                }

                            </div>
                        ))}



                        <div className='mt-6 mb-3 flex justify-between'>
                            <button
                                onClick={handleAddNewSection}
                                className="bg-blue-950 text-white px-4 py-2 text-xl
                    rounded-md hover:bg-blue-900 shadow-md shadow-green-200
                    hover:scale-95 transition-all"
                            >
                                Add New Section
                            </button>

                            <button
                                onClick={handleRemoveSection}
                                className="bg-blue-950 text-white px-4 py-2 text-xl
                    rounded-md hover:bg-blue-900 shadow-md shadow-green-200
                    hover:scale-95 transition-all"
                            >
                                Remove this section
                            </button>

                            <button
                                onClick={handleSaveContent}
                                className="bg-blue-950 text-white px-4 py-2 text-xl
                    rounded-md hover:bg-blue-900 shadow-md shadow-green-200
                    hover:scale-95 transition-all"
                            >
                                Save Sections
                            </button>
                        </div>

                    </div>


                    {/* editor for blog summary */}
                    <div className='my-4'>
                        <h3 className='text-center text-white text-xl mb-4 font-bold'>Add Blog summary</h3>
                        <Editor
                            apiKey='aflhte2kchgwcgg6wo27mxqz79lhro2h443k16fftegeoo6x'
                            onInit={(evt, editor) => (blogSummaryEditor.current = editor)}
                            init={{
                                menubar: false,
                                height: 300,
                                plugins: 'anchor autolink charmap codesample emoticons link lists searchreplace  wordcount',
                                toolbar: 'undo redo | blocks fontsize | bold underline strikethrough | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                            }}
                            initialValue="Write blog summary"
                        />
                    </div>

                    {/* to add blog poster image */}

                    <div className='mt-6'>

                        <div className='flex flex-row gap-6'>
                            {!useImageUrl ? (
                                <div>
                                    <label htmlFor="imageUrl"
                                        className="block text-sm mt-2 font-medium text-gray-200 mb-3">
                                        Want to upload Image URL
                                    </label>

                                </div>
                            ) : (
                                <div>
                                    <label htmlFor="imageFile"
                                        className="block text-sm mt-2 font-medium text-gray-200 mb-3">
                                        Want to upload Image File
                                    </label>

                                </div>
                            )}

                            <input
                                type="checkbox"
                                id="useImageUrl"
                                checked={useImageUrl}
                                onChange={handleCheckboxChange}
                                className="mr-2 px-11 py-11 transform scale-150"
                            />

                        </div>


                        {useImageUrl ? (
                            <div>
                                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-200 mb-3">
                                    Image URL
                                </label>
                                <input type="text"
                                    value={blog.imageUrl}
                                    onChange={(e) => setBlog({ ...blog, blogPoster: e.target.value })}
                                    name='imageurl'
                                    className=' bg-gray-600 mb-4 px-2 py-3 my-2 w-full rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
                                    placeholder='Add Blog Poster'
                                />
                            </div>
                        ) : (
                            <div>
                                <label htmlFor="imageFile" className="block text-sm font-medium text-gray-200 mb-3">
                                    Upload Blog Poster
                                </label>
                                <input
                                    type="file"
                                    id="imageFile"
                                    accept="image/*"
                                    onChange={handleImageFileChange}
                                    className="bg-gray-600 mb-4 px-2 py-3 my-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none"
                                />
                            </div>
                        )}
                    </div>

                    {/* blog department selection */}

                    <div className="items-center justify-center h-full">
                        <div className="text-center">
                            <h2 className='text-white flex justify-start text-xl mb-2 font-semibold ml-3'>Select Department</h2>

                            {blog?.department === '' ? '' :
                                <div className='flex justify-start mb-5'>
                                    <BtnTemplate header={blog?.department} />
                                </div>

                            }

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-5">
                                {departmentsInDevComm.map((dept) => (
                                    <div
                                        key={dept}
                                        onClick={() => {
                                            setBlog({ ...blog, department: dept });
                                        }}>
                                        <BtnTemplate header={dept} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* codelinks associated with blogs */}

                    {/* <div className="mt-4">
                        <h2 className='text-white flex justify-start text-xl mb-2 font-semibold ml-3'>Links for Code included in Blog (Optional)</h2>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {codelinks?.map((codelink, index) => (
                                <div className='rounded-full bg-slate-500 py-1 px-4 shadow-md shadow-green-300
                    hover:scale-95 transition-all' key={index}>
                                    {codelink}
                                    <button
                                        onClick={() => handleLinkRemove(index)}
                                        className={`rounded-full text-white px-3 py-1`}
                                    >
                                        &#x2715;
                                    </button>
                                </div>

                            ))}
                        </div>

                        <input
                            type="text"
                            value={currentLink}
                            onChange={handleCodeInputChange}
                            onKeyDown={handleLinkInputKeyDown}
                            placeholder="Type and press Enter to add Code links (example: wtools links)"
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
                        />

                        {
                            showWrongURLMsg
                                ?
                                <h3 className='text-red-600 text-left mb-3'>
                                    Pls add a valid URL
                                </h3>
                                : ""
                        }
                    </div> */}


                    {/* minutes read of blog */}
                    <div className="items-center justify-center h-full">
                        <div className="text-center">
                            <h2 className='text-white flex justify-start text-xl mb-4 font-semibold ml-3'>Quick Read Estimate</h2>

                            {blog?.minutesRead === 0 ? '' :
                                <div className='flex justify-start mb-2'>
                                    <h2 className='text-white flex mb-4 font-normal font-sans ml-3'>Estimated Blog read time is {blog?.minutesRead} mins.</h2>
                                    {/* <BtnTemplate header={blog?.minutesRead} msg='mins'/> */}
                                </div>

                            }



                            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-5">
                                {[2, 5, 10, 15, 20].map((minutes) => (
                                    <div
                                        key={minutes}
                                        onClick={() => {
                                            setBlog({ ...blog, minutesRead: minutes });
                                        }}>
                                        <BtnTemplate header={minutes} msg={"mins"} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* tags associated with blogs input */}
                    <div className="mt-4">
                        <h2 className='text-white flex justify-start text-xl mb-4 font-semibold ml-3'>Blog Tags</h2>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {tags.map((tag, index) => (
                                <div className='rounded-full bg-slate-500 py-1 px-4 shadow-md shadow-green-300
                    hover:scale-95 transition-all' key={index}>
                                    {tag}
                                    <button
                                        onClick={() => handleTagRemove(index)}
                                        className={`rounded-full text-white px-3 py-1`}
                                    >
                                        &#x2715;
                                    </button>
                                </div>

                            ))}
                        </div>

                        <input
                            type="text"
                            value={currentTag}
                            onChange={handleInputChange}
                            onKeyDown={handleInputKeyDown}
                            placeholder="Type and press Enter to add tags"
                            className=' bg-inherit mb-4 px-2 py-2 w-full rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
                        />
                    </div>

                    {/* blog submission button */}
                    <div>
                        {!postPreview && (
                            <div className='flex items-center justify-center mb-3 mt-7'>
                                <button
                                    onClick={checkIfAllFieldsAreFilled}
                                    className='w-[60%] md:w-[40%] bg-slate-500
                                     text-white shadow-md hover:scale-95 transition-all
                                     shadow-green-400 font-bold px-2 py-2 rounded-lg'
                                >
                                    Publish Blog
                                </button>
                            </div>
                        )}

                        {postPreview && (
                            <div className='flex items-center justify-center mb-3 mt-7'>
                                <button
                                    onClick={uploadBlog}
                                    className='w-[90%] text-sm md:w-[50%] bg-slate-500 text-white shadow-md
                                     shadow-green-400 font-bold md:text-lg px-2 py-2 rounded-lg'
                                >
                                    Confirm Blog to BlogX community
                                </button>
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </div >
    )
}

export default AddBlog




{/* editor for blog content */ }
{/* <div>
                        <h2 className='text-white flex justify-start text-xl mb-4 font-semibold ml-3'>Tell your story...</h2>

                        <Editor
                            apiKey='aflhte2kchgwcgg6wo27mxqz79lhro2h443k16fftegeoo6x'
                            onInit={(evt, editor) => (blogEditor.current = editor)}
                            init={{
                                menubar: 'favs file edit view format tools table',
                                height: 500,
                                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                            }}
                            initialValue="Write blog"
                        />
                    </div> */}
