

import React, { useState, useEffect, useContext } from 'react';
import RenderHTMLContent from '../../utilities/htmlRenderer/RenderHTMLContent';
import myContext from '../../context/data/myContext';
import Modal from '../../utilities/modal/Modal';

const DashboardContent = () => {

    const context = useContext(myContext);

    const { fetchNumPosts, fetchNumUsers, fetchPosts, deleteBlog } = context;

    const [numPosts, setNumPosts] = useState(0);
    const [numUsers, setNumUsers] = useState(0);
    const [blogx, setBlogx] = useState([]);

    function extractFirst30Words(htmlString) {
        // Remove HTML tags
        const plainText = htmlString.replace(/<[^>]*>/g, '');

        // Extract first 30 words
        const words = plainText.split(/\s+/);
        const first30Words = words.slice(0, 30).join(' ');

        return first30Words;
    }


    const [openModals, setOpenModals] = useState(Array(blogx?.length).fill(false));
    const [deleteBlogId, setDeleteBlogId] = useState(null);


    const handleOpenModal = (index) => {
        setOpenModals(prevState => {
            const updatedModals = [...prevState];
            updatedModals[index] = true;
            return updatedModals;
        });
        setDeleteBlogId(index);
    };
 
    const handleDeleteBlog = async (blogid) => {
        //pop modal to confirm if sure or not -> display
        //if user clicks -> yes, sure 
        await deleteBlog(blogid);
    }

    useEffect(() => {
        // Function to fetch number of posts

        const fetchDetails = async () => {
            await fetchNumPosts().then((numPostsBlogX) => setNumPosts(numPostsBlogX));
            await fetchNumUsers().then((numUsersBlogX) => setNumUsers(numUsersBlogX));
            await fetchPosts().then((fetchedblogx) => setBlogx(fetchedblogx));
        }

        fetchDetails();
    }, []);

    return (
        <div>
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Number of Blogs: {numPosts}</h2>
                <h2 className="text-lg font-semibold">Number of Users: {numUsers}</h2>
            </div>


            {/* Grid layout for rendering posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {blogx?.map((blog, index) => {

                    const { id, title, summary, blogPoster } = blog;

                    let shortSummary = extractFirst30Words(summary);

                    shortSummary += ' ...'

                    return (
                        <div key={index} className="bg-white p-4 shadow rounded-md">
                            <img
                                src={blogPoster}
                                className="w-full aspect-[1.5] rounded-md fill-zinc-800"
                            />
                            <h3 className="text-lg font-semibold mb-2">{title}</h3>
                           

                            <button
                                onClick={() => handleOpenModal(index)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                            >
                                Delete Blog
                            </button>

                            <Modal
                                isOpen={openModals[index]}
                                onClose={() => setOpenModals(prevState => {
                                    const updatedModals = [...prevState];
                                    updatedModals[index] = false;
                                    return updatedModals;
                                })}
                                title="Confirm Delete"
                                blogTitle={title}
                                content="Are you really sure you want to delete this blog?"
                                onConfirm={() => handleDeleteBlog(id)}
                            />

                            <div className="mt-4 text-base font-light tracking-normal leading-6 text-opacity-80">
                                {shortSummary && <RenderHTMLContent htmlContent={shortSummary} />}
                            </div>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    );
};

export default DashboardContent;
