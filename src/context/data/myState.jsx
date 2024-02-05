
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
    }

    const [loading, setLoading] = useState(false);

    const [blog, setBlog] = useState({
        title: "",
        description: "",
        summary: "",
        author: null,
        authorId: "",
        department: "",
        tags: [],
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
        if (blog.title == "" || blog.department == "" || blog.description == "<p>Write blog</p>" || blog.tags.length < 1) {
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

    const getAllBlogs = async () => {
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

    const getBlogData = async (blogId) => {
        setLoading(true);
        try {
          const productTemp =  await getDoc(doc(fireDB, 'blogs', blogId));
          const data = productTemp.data(); 
          setLoading(false);
          return data;
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }


    //   not done yet
    const updateBlog = async () => {

    }

    const deleteBlog = async ({ userID, blogId }) => {
        setLoading(true);

        try {
            // Fetch the blog data
            const blogDoc = await getDoc(doc(fireDB, 'blogs', blogId));

            // Check if the user is the author
            if (blogDoc.exists() && blogDoc.data().authorId === userID) { 
                await deleteDoc(doc(fireDB, 'blogs', blogId));
                toast.success('Blog deleted!');
                // getAllBlogs();  
            } else { 
                toast.error('You do not have permission to delete this blog');
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const getUserBlogs = async ({ userId }) => {
        setLoading(true)

        try {
            const q = query(
                collection(fireDB, 'blogs'),
                orderBy('timeOfCreation', 'asc'),
                where('authorId', "==", userId)
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let userBlogsArray = [];

                QuerySnapshot.forEach((doc) => {
                    userBlogsArray.push({ ...doc.data(), id: doc.id });
                });

                // setReports(blogsArray);
                return userBlogsArray;
                setLoading(false);

            });

            return true;

        } catch (error) {
            setLoading(false)
            return false;
        }
    }

     //   not done yet
    const getTrendingBlogs = async () => {

    }

    const [comments, setComments] = useState([]);

    const getCommentsForBlog = async ( blogId ) => {
        try {
            const commentsRef = collection(fireDB, 'comments');

            // Create a query to filter comments by postId
            const commentsQuery = query(commentsRef, where('blogId', '==', blogId));

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

    const getDepartmentBlogs = async ({ department }) => {
        setLoading(true)

        try {
            const q = query(
                collection(fireDB, 'blogs'),
                orderBy('timeOfCreation', 'asc'),
                where('department', "==", department)
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let blogsArray = [];

                QuerySnapshot.forEach((doc) => {
                    blogsArray.push({ ...doc.data(), id: doc.id });
                });

                setReports(blogsArray);
                setLoading(false);

            });

            return true;

        } catch (error) {
            setLoading(false)
            return false;
        }

    }

    const getFeaturedBlogs = async () => {

    }

     //   not done yet
    const clapBlog = async (userId, blogId ) => {

    }

    const commentOnBlog = async (blogId, user_id, comment, username ) => {
        const commentsRef = collection(fireDB, 'comments');

        // Create a new comment document
        const newComment = {
            blogId,
            user_id,
            comment,
            username,
            timestamp: new Date(),
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        };

        console.log(newComment);

        await setDoc(doc(commentsRef), newComment);
    }


    const followAuthor = async (followerId, followingId, followingUsername) => {
        try {

            if (followerId == followingId) {
                toast.error(`You can't follow yourself !`);
                return false;
            }

            const followingsQuery = query(
                collection(fireDB, 'followings'),
                where('follower', '==', followerId),
                where('following', '==', followingId)
            );

            const followingsSnapshot = await getDocs(followingsQuery);

            if (!followingsSnapshot.empty) {
                toast.info(`You are already following ${followingUsername}`);
                return false;
            }

            const followingsCollection = collection(fireDB, 'followings');

            const followingsDocRef = await addDoc(followingsCollection, {
                follower: followerId,
                following: followingId,
                time: Timestamp.now(),
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            });

            if (followingsDocRef) {
                toast.success(`You are now following ${followingUsername}`);

                return true;
            }

        } catch (error) {
            console.error('Error following user:', error.message);
            return false;
        }
    };
 
    const getFollowersCount = async ( authorId ) => {
        // Get the followings count 
        const followersQuery = query(collection(fireDB, 'followings'), where('following', '==', authorId));
        const followersSnapshot = await getDocs(followersQuery);
        const followersCount = followersSnapshot.size;

        // const followingsQuery = query(collection(fireDB, 'followings'), where('follower', '==', userId));
        // const followingsSnapshot = await getDocs(followingsQuery);
        // const followingsCount = followingsSnapshot.size;

        return followersCount;
    }

    const [searchkey, setSearchkey] = useState('')
    const [department, setDepartment] = useState('');

    return (
        <MyContext.Provider value={{
            mode, loading, setLoading, toggleMode,
            blog,setBlog,getBlogData,
            createBlog, updateBlog, deleteBlog,
            getUserBlogs, getTrendingBlogs, getAllBlogs, 
            getDepartmentBlogs, getFeaturedBlogs,
            clapBlog, commentOnBlog, comments, setComments,
            followAuthor, getFollowersCount,
            getCommentsForBlog,
        }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default myState