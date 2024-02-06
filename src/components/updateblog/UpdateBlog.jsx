
import React, { useContext, useEffect, useRef, useState } from 'react'
import myContext from '../../context/data/myContext';
import { Editor } from '@tinymce/tinymce-react';
import getUsernameByUID from '../.././utilities/userData/GetUser';
import { uploadFile } from '../.././utilities/uploadFile/UploadFile';
import getUserID from '../../utilities/userData/GetUserID';
import { Link, useParams } from 'react-router-dom';
import departmentsInDevComm from '../../utilities/departments/departmentsInDevComm.JS';
import BtnTemplate from '../../utilities/minutesRead/BtnTemplate';

const UpdateBlog = () => {
    const context = useContext(myContext);

    const { blog, setBlog, updateBlog, getBlogData } = context;

    const params = useParams();
    const blogId = params.id;

    const [blogState, setblogState] = useState('');

    const [tags, setTags] = useState([]);

    useEffect(() => {

        const fetchUserData = async () => {
            try {
                const uid = await getUserID();

                if (uid === -1) {
                    return;
                }

                const username = await getUsernameByUID(uid);

                if (username) {
                    setUser(username);
                    setUserId(uid);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchBlogData = async () => {
            try {
                // Fetch blog data
                const blogData = await getBlogData(blogId);
                setblogState(blogData);
                setTags(blogData?.tags)

            } catch (error) {
                // handle error
            }
        }

        fetchBlogData();
        fetchUserData();
    }, []);

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
            setblogState((prevBlog) => ({ ...prevBlog, tags: [...prevBlog.tags, newTag] }));
            setCurrentTag('');
            console.log(blog.tags);
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


    const [u_name, setUser] = useState('');
    const [userId, setUserId] = useState('');

    // Reference to the TinyMCE editor
    const blogEditor = useRef(null);

    const blogSummaryEditor = useRef(null);

    const handleFirstCheck = async () => {

        const content = await blogEditor.current.getContent();
        const blogSummary = await blogSummaryEditor.current.getContent();

        // Update state using the state updater function
        setblogState((prevBlog) => ({ ...prevBlog, description: content, summary: blogSummary }));

        if (!(imageFile == null)) {
            try {
                const imageUrlfromFB = await uploadFile(imageFile)

                // Update state with the image URL
                if (imageUrlfromFB !== null) {
                    setblogState((prevBlog) => ({ ...prevBlog, blogPoster: imageUrlfromFB }));
                }

            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        setPostPreview(true);
    };

    const uploadBlog = async () => {
        const postUploadstate = await updateBlog(blogId, blogState);

        return postUploadstate;
    }

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const uid = await getUserID();
    //             const username = await getUsernameByUID(uid);

    //             if (username) {
    //                 setUser(username);
    //                 setUserId(uid);
    //                 blog.authorId = uid;
    //                 blog.author = username;
    //             }
    //         } catch (error) {
    //             console.error('Error fetching user data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    return (
        <div>
            <div className='flex justify-center items-center postbg py-8'>
                <div className='bg-gray-800 px-10 py-10 rounded-xl w-[90%] md:w-[80%]'>
                    <div className='flex gap-4 justify-center'>
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Update Blog</h1>

                        <span className='-my-3'><img src="https://res.cloudinary.com/drlkkozug/image/upload/v1705042854/ynrer4jfk9ywantavge8.png" alt="New Post" width={50} srcSet="" /></span>
                    </div>


                    {/* title */}
                    <div>
                        <h2 className='text-white flex justify-start text-xl mb-4 font-semibold'>Blog Title</h2>

                        <input type="text"
                            value={blogState.title}
                            onChange={(e) => setblogState({ ...blogState, title: e.target.value })}
                            name='title'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full   rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
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
                                menubar: false,
                                height: 500,
                                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                            }}
                            initialValue={blogState?.description}
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
                            initialValue={blogState?.summary}
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
                                    value={blogState.imageUrl}
                                    onChange={(e) => setblogState({ ...blogState, blogPoster: e.target.value })}
                                    name='imageurl'
                                    className=' bg-gray-600 mb-4 px-2 py-3 my-2 w-full  rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
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

                    <div>
                        <input type="text"
                            value={blogState.department}
                            onChange={(e) => setblogState({ ...blogState, department: e.target.value })}
                            name='category'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full   rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
                            placeholder='Set Category'
                        />
                    </div>

                    <div className="items-center justify-center h-full">
                        <div className="text-center">
                            <h2 className='text-white flex justify-start text-xl mb-4 font-semibold ml-3'>Select Department</h2>

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-5">
                                {departmentsInDevComm.map((dept) => (
                                    <div
                                        key={dept}
                                        onClick={() => {
                                            setblogState({ ...blogState, department: dept });
                                        }}>
                                        <BtnTemplate header={dept} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                    {/* minutes read of blog */}
                    <div className="items-center justify-center h-full">
                        <div className="text-center">

                            <h2 className='text-white flex justify-start text-xl mb-2
                            font-semibold ml-3 italic'>What's Quick Read Estimate ?</h2>

                            <div className='flex flex-row gap-x-2 mb-4'>
                                <h3 className='text-white flex justify-start text-xl mb-4 mt-2
                                 font-semibold ml-3 mr-6'>Blog estimate time is </h3>
                                <BtnTemplate header={blogState?.minutesRead} msg={'mins'} />
                            </div>


                            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-5">
                                {[2, 5, 10, 15, 20].map((minutes) => (
                                    <div
                                        key={minutes}
                                        onClick={() => {
                                            setblogState({ ...blogState, minutesRead: minutes });
                                        }}>
                                        <BtnTemplate header={minutes} msg={"mins"} />
                                    </div>

                                    // <button
                                    //     key={minutes}
                                    //     onClick={() => { 
                                    //         setBlog({ ...blog, minutesRead: minutes }); 
                                    //     }}
                                    //     className={`rounded-full py-2 px-4 text-white ${blog.minutes === minutes
                                    //         ? 'bg-blue-500'
                                    //         : 'bg-gray-400 hover:bg-gray-500'
                                    //         }`}
                                    // >
                                    //     {minutes} mins
                                    // </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* tags associated with blogs input */}

                    <div className="mt-4">

                        <h2 className='text-white flex justify-start text-xl mb-2
                            font-semibold ml-3 italic'>Add blog tags here...</h2>

                        <div className="flex flex-wrap gap-2 mb-3">
                            {tags?.map((tag, index) => (
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
                                    onClick={handleFirstCheck}
                                    className='w-[60%] md:w-[40%] bg-slate-500 text-white shadow-md
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
                                    Confirm Blog to Community
                                </button>
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </div >
    )
}


export default UpdateBlog