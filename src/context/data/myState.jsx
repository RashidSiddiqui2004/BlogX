
import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import {
    Timestamp, addDoc, collection, deleteDoc, doc, getDocs,
    onSnapshot, orderBy, query, setDoc, getDoc, updateDoc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { where } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';


function myState(props) {

    const [mode, setMode] = useState('light');

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = "rgb(42, 44, 56)"
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = "white"
        }
        console.log(mode);
    }

    const [loading, setLoading] = useState(false);

    const [blog, setBlog] = useState({
        title: "",
        description: "",
        author: null,
        authorId: "",
        department: "",
        tags: null,
        claps: 0,
        minutesRead: 0,
        timeOfCreation: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    const createBlog = async () => {
        if (blog.title == null || blog.department == null || blog.description == null) {
            return toast.error("All fields are required")
        }

        setLoading(true)

        try {
            const blogRef = collection(fireDB, 'blogs');
            await addDoc(blogRef, blog)
            toast.success("Added blog successfully");

            setTimeout(() => {
                window.location.href = '/'
            }, 1000);

            setLoading(false)

            return true;
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const [blogs, setBlogs] = useState([]);

    const getBlogData = async (id) => {
        setLoading(true)

        try {
            const q = query(
                collection(fireDB, 'blogs'),
                orderBy('timeOfCreation', 'desc')
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let blogArray = [];
                QuerySnapshot.forEach((doc) => {
                    blogArray.push({ ...doc.data(), id: doc.id });
                });
                setBlogs(blogArray);
                setLoading(false);
            });

            return () => data;

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const updateBlog = async () => {

    }
    const deleteBlog = async ({ userID, blogId }) => {

    }
    const getUserBlogs = async ({ userId }) => {

    }
    const getLatestBlogs = async () => {

    }

    const [comments, setComments] = useState([]);

    const getCommentsForBlog = async ({ blogId }) => {
        try {
            const commentsRef = collection(fireDB, 'comments');  

            // Create a query to filter comments by postId
            const commentsQuery = query(commentsRef, where('blog_id', '==', postId));

            const querySnapshot = await getDocs(commentsQuery);

            const comments = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setComments(comments);

            return comments;

        } catch (error) {
            console.error('Error fetching comments:', error.message);
        }

        return;
    }
    const getAllBlogs = async () => {

    }
    const getDepartmentBlogs = async ({ department }) => {

    }
    const getFeaturedBlogs = async () => {

    }
    const clapBlog = async ({ userId, blogId }) => {

    }
    const commentOnBlog = async ({ blogId }) => {

    }
    const followAuthor = async ({ userID, authorId }) => {

    }
    const getFollowersCount = async ({ authorId }) => {

    }

    return (
        <MyContext.Provider value={{
            mode, loading, setLoading, toggleMode,
            createBlog, updateBlog, deleteBlog,
            getUserBlogs, getLatestBlogs,
            getAllBlogs, getDepartmentBlogs,
            getFeaturedBlogs,
            clapBlog, commentOnBlog,
            followAuthor, getFollowersCount,
            getCommentsForBlog,
        }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default myState