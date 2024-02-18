
import React, { useContext, useEffect, useRef, useState } from 'react'
import myContext from '../../context/data/myContext';
import { Editor } from '@tinymce/tinymce-react';
import getUsernameByUID from '../.././utilities/userData/GetUser';
import { uploadFile } from '../.././utilities/uploadFile/UploadFile';
import getUserID from '../../utilities/userData/GetUserID';
import departmentsInDevComm from '../../utilities/departments/departmentsInDevComm.JS';
import BtnTemplate from '../../utilities/BtnTemplate2/BtnTemplate';
import { toast } from 'react-toastify';
import { Editor as CodeEditor } from '@monaco-editor/react';
import isValidUrl from './CheckIfUrl'; 

function AddBlog() {

    const context = useContext(myContext);
    const { blog, setBlog, createBlog } = context;

    // for saving blog content if user has not published it yet -> for user convenience
    // smooth experience on website

    const [tags, setTags] = useState([]);
    const [codelinks, setCodelinks] = useState([]);
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


    // for adding links (resources) in blog

    const [currentLink, setCurrentLink] = useState('');

    const handleCodeInputChange = (e) => {
        const newlink = e.target.value.trim();
        setCurrentLink(newlink);
    };

    const [showWrongURLMsg, setShowWrongURLMsg] = useState(false);

    const handleLinkInputKeyDown = (e) => {
        if (e.key === 'Enter' && currentLink.trim() !== '') {
            const newLink = e.target.value.trim();

            if (isValidUrl(newLink) == true) {
                setCodelinks([...codelinks, currentLink.trim()]);

                setBlog((prevBlog) => ({ ...prevBlog, codelinks: [...prevBlog.codelinks, newLink] }));
                setCurrentLink('');
                setShowWrongURLMsg(false);
            }

            else {
                setShowWrongURLMsg(true);
                return;
            }
        }
    };

    const handleLinkRemove = (index) => {
        const updatedLinks = [...codelinks];
        updatedLinks.splice(index, 1);
        setCodelinks(updatedLinks);
        setBlog((prevBlog) => {
            const updatedLinks = [...prevBlog.codelinks];
            updatedLinks.splice(index, 1);
            return { ...prevBlog, codelinks: updatedLinks };
        });
    };


    // author details

    const [u_name, setUser] = useState('');
    const [userId, setUserId] = useState('');

    // reference to title input

    const titleRef = useRef(null);

    // Reference to the TinyMCE editor
    const blogEditor = useRef(null);

    const blogSummaryEditor = useRef(null);

    const [sections, setSections] = useState([{ id: 1 }]);
    const editorRefs = useRef([]);

    const handleAddNewSection = () => {
        const newSection = { id: sections.length + 1 };
        setSections([...sections, newSection]);
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


    // add code block code below

    const lang = "javascript";

    const [languages, setLang] = useState(["javascript", "C++"]);
    const [codes, setCodes] = useState([""]);
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
                newCodes[i] = null;
            }

            // Add the saved code at the specified index
            newCodes[index] = savedCode;

            return newCodes;
        });

        console.log(codes);
    };


    // use this
    // const editor = editorRefs.current[0];
    // const content2 = await editor.getContent();
    // const newSection = new SectionClass(blog?.sectionTitles[0], content2);
    // console.log(newSection);


    // handle section save code

    const handleSaveContent = async () => {
        const updatedBlogContent = [...blog.blogContent];

        // Create an array to store promises for each section update
        const updatePromises = editorRefs.current.map(async (editor, index) => {
            const content = await editor.getContent();

            const codeForSection = codes[index];

            const newSection = {
                title: blog?.sectionTitles[index],
                content: content,
                code: codeForSection,
            };

            // Update or add the new section to the array
            if (index >= 0 && index < updatedBlogContent.length) {
                updatedBlogContent[index] = newSection;
            } else {
                updatedBlogContent.push(newSection);
            }
        });

        await Promise.all(updatePromises);

        setBlog({ ...blog, blogContent: updatedBlogContent });
        localStorage.setItem('temporaryBlog', JSON.stringify(blog));

        console.log(blog);
    };



    const checkIfAllFieldsAreFilled = async () => {

        // const content = await blogEditor.current.getContent();
        const blogSummary = await blogSummaryEditor.current.getContent();

        localStorage.setItem('temporaryBlog', JSON.stringify(blog));

        // Update state using the state updater function
        setBlog((prevBlog) => ({ ...prevBlog, summary: blogSummary }));
        // setBlog((prevBlog) => ({ ...prevBlog, description: content, summary: blogSummary }));

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
            // blog.description == "<p>Write blog</p>" ||
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
            console.log(blog);
        }

        return;
    };

    const uploadBlog = async () => {
        const postUploadstate = await createBlog();

        localStorage.removeItem('temporaryBlog');

        return postUploadstate;
    }

    // update here

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
                                                    sectionTitlesCopy.push('');
                                                }
                                                sectionTitlesCopy[index] = e.target.value;
                                                return { ...prevBlog, sectionTitles: sectionTitlesCopy };
                                            });
                                        }}

                                        name='sectionTitle'
                                        className='bg-inherit text-3xl mb-4 px-2 py-2 w-full rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
                                        placeholder={`Section ${index + 1} title`}
                                    />
                                </div>

                                <Editor
                                    apiKey='aflhte2kchgwcgg6wo27mxqz79lhro2h443k16fftegeoo6x'
                                    onInit={(evt, editor) => (editorRefs.current[index] = editor)}
                                    init={{
                                        menubar: 'favs file edit view format tools table',
                                        height: 500,
                                        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
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


                                        {/* <CodeEditor
                                            className='h-[50vh] m-auto p-10 bg-gray-800 text-white'
                                            defaultLanguage="javascript"
                                            defaultValue="// Write your code here..."
                                            language={lang}
                                            onChange={(val) => handleCodeChange(val, index)}
                                            value={code}
                                            onMount={(evt, editor) => (codeEditorRefs.current[index] = editor)}
                                        /> */}


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
                                                className="bg-green-400 text-gray-900 rounded-md my-5 px-3 py-3"
                                            >
                                                Save Code Progress
                                            </button>

                                            <button
                                                onClick={() => handleCodeBlock(index)}
                                                className="bg-red-400 text-gray-900 ml-5 rounded-md my-5 px-3 py-3"
                                            >
                                                Remove CodeBlock
                                            </button>

                                        </div>
                                    </div>
                                    :
                                    <>
                                        <button
                                            onClick={() => handleCodeBlock(index)}
                                            className="bg-blue-700 text-white my-4 px-4 py-2 flex justify-end rounded-md
                                             hover:bg-blue-900 focus:outline-none focus:ring
                                              focus:ring-blue-400 hover:scale-95 transition-all duration-300"
                                        >
                                            Add Code Block
                                        </button>

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

                            {/* <button
                                onClick={ () => handleCodeBlock(index)}
                                className="bg-blue-950 text-white px-4 py-2 text-xl
                    rounded-md hover:bg-blue-900 shadow-md shadow-green-200
                    hover:scale-95 transition-all"
                            >
                                Add Code Block
                            </button> */}

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
                                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
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

                    <div className="mt-4">
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
                    </div>


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



// const handleSaveContent2 = async () => {

//     const updatedBlogContent = [...blog.blogContent];

//     editorRefs.current.forEach(async (editor, index) => {

//         const content = await editor.getContent();

//         const codeeditor = codeEditorRefs?.current[index];
//         // console.log(codeeditor);

//         const codecontent = await codeeditor.getValue();

//         // console.log(codecontent);


//         const newSection = {
//             title: blog?.sectionTitles[index],
//             content: content,
//             code: codecontent,
//         }

//         // Check if the blogContent array is empty
//         if (updatedBlogContent.length === 0) {
//             // If empty, add the new section to the array
//             updatedBlogContent.push(newSection);
//         } else {
//             // If not empty, update the value at the specified index
//             if (index >= 0 && index < updatedBlogContent.length) {
//                 updatedBlogContent[index] = newSection;
//             } else {
//                 updatedBlogContent.push(newSection);
//             }
//         }
//     });

//     setBlog({ ...blog, blogContent: updatedBlogContent });

//     localStorage.setItem('temporaryBlog', JSON.stringify(blog))
// };
