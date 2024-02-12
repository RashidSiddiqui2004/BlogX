
import React, { useContext, useEffect, useRef, useState } from 'react'
import myContext from '../../context/data/myContext';
import { Editor } from '@tinymce/tinymce-react';
import getUsernameByUID from '../.././utilities/userData/GetUser';
import { uploadFile } from '../.././utilities/uploadFile/UploadFile';
import getUserID from '../../utilities/userData/GetUserID';
import departmentsInDevComm from '../../utilities/departments/departmentsInDevComm.JS';
import BtnTemplate from '../../utilities/BtnTemplate2/BtnTemplate';
import { toast } from 'react-toastify';

function AddBlog() {

    const context = useContext(myContext);
    const { blog, setBlog, createBlog } = context;

    const [tags, setTags] = useState([]);
    const [codelinks, setCodelinks] = useState([]);
    const [useImageUrl, setUseImageUrl] = useState(false);
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

    const [currentLink, setCurrentLink] = useState('');

    const handleCodeInputChange = (e) => {
        const newlink = e.target.value.trim();
        setCurrentLink(newlink);
    };

    const handleLinkInputKeyDown = (e) => {
        if (e.key === 'Enter' && currentLink.trim() !== '') {
            const newLink = e.target.value.trim();

            setCodelinks([...codelinks, currentLink.trim()]);

            setBlog((prevBlog) => ({ ...prevBlog, codelinks: [...prevBlog.codelinks, newLink] }));
            setCurrentLink('');
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


    const [u_name, setUser] = useState('');
    const [userId, setUserId] = useState('');

    // Reference to the TinyMCE editor
    const blogEditor = useRef(null);

    const blogSummaryEditor = useRef(null);

    const checkIfAllFieldsAreFilled = async () => {

        const content = await blogEditor.current.getContent();
        const blogSummary = await blogSummaryEditor.current.getContent();

        // Update state using the state updater function
        setBlog((prevBlog) => ({ ...prevBlog, description: content, summary: blogSummary }));

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

        if (!(blog.title == "" || blog.department == "" || blog.description == "<p>Write blog</p>" ||
            blog.summary === "<p>Write blog summary</p>" || blog.tags.length < 1)) {
            setPostPreview(true);
        }
        else{
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
        const postUploadstate = await createBlog();

        return postUploadstate;
    }

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

        fetchData();
    }, []);

    return (
        <div>
            <div className='flex justify-center items-center postbg py-8' style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                <div className='bg-gray-800 px-10 py-10 rounded-xl w-[90%] md:w-[80%]'>
                    <div className='flex gap-4 justify-center'>
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Publish Blog</h1>

                        <span className='-my-3'><img src="https://res.cloudinary.com/drlkkozug/image/upload/v1705042854/ynrer4jfk9ywantavge8.png" alt="New Post" width={50} srcSet="" /></span>
                    </div>


                    {/* title of blog */}
                    <div>
                        <input type="text"
                            value={blog.title}
                            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                            name='title'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
                            placeholder='Add Post title'
                        />
                    </div>


                    {/* editor for blog content */}
                    <div>
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


                    {/* <div>
                        <input type="text"
                            value={posts.imageUrl}
                            onChange={(e) => setPosts({ ...posts, imageUrl: e.target.value })}
                            name='imageurl'
                            className=' bg-gray-600 mb-4 px-2 py-3 my-2 w-full  rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
                            placeholder='Add an Image Url'
                        />
                    </div> */}

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
                                    placeholder='Add an Image Url'
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
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
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

