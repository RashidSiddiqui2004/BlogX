
import React, { useState } from 'react'
import MyContext from './myContext'
import {
    Timestamp, addDoc, collection, deleteDoc, doc, getDocs,
    onSnapshot, orderBy, query, setDoc, getDoc, updateDoc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { where } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import blogModel from './BlogModal';
import deptMap from '../../utilities/departments/DepartmentMap';

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

    const [blog, setBlog] = useState(blogModel);

    const createBlog = async () => {
        if (blog.title == "" || blog.department == "" || blog.description == "<p>Write blog</p>" || 
            blog.summary === "<p>Write blog summary</p>" || blog.tags.length < 1) {
            return toast.error("All fields are required")
        }

        setLoading(true)

        try {
            const blogRef = collection(fireDB, 'blogs')
            await addDoc(blogRef, blog)

            const permanentBlogRef = collection(fireDB, 'recoveryBlogs')
            await addDoc(permanentBlogRef, blog)
            
            toast.success('Blog added', {
                position: 'top-right',
                autoClose: 800,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

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

    const [allBlogs, setAllBlogs] = useState([]);

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
                setAllBlogs(blogArray);
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
            const blogRef = doc(fireDB, 'blogs', blogId);

            // Get the document snapshot
            const blogSnapshot = await getDoc(blogRef);

            if (!blogSnapshot.exists()) {
                return;
            }

            // Get the current views count
            const data = blogSnapshot.data();
            const currentViews = data.views || 0;

            // Update the views count by 1
            const updatedViews = currentViews + 1;

            // Update the views count in the document
            await updateDoc(blogRef, { views: updatedViews });

            return data;
        } catch (error) {
            console.error('Error updating views count:', error);
        }
    };


    const updateBlog = async (blogId, updatedBlog) => {
        try {
            const blogRef = doc(fireDB, 'blogs', blogId);
            await updateDoc(blogRef, updatedBlog); 
            toast.success("Blog updated", {
                position: 'top-right',
                autoClose: 800,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };

    const deleteBlog = async ( blogId ) => {
        setLoading(true);

        try {
            // Fetch the blog data
            const blogDoc = await getDoc(doc(fireDB, 'blogs', blogId));

            // Check if the user is the author
            // if (blogDoc.exists() && blogDoc.data().authorId === userID) {
                if (blogDoc.exists()) {
                await deleteDoc(doc(fireDB, 'blogs', blogId));
                toast.success('Blog deleted!'); 
            } else {
                toast.error('You do not have permission to delete this blog');
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const isBlogXAuthor = async (userId) => {
        try {
            const q = query(
                collection(fireDB, 'creators'),
                where('creatorID', '==', userId)
            );
    
            const querySnapshot = await getDocs(q);

            const authorData = querySnapshot.docs.map(doc => doc.data());

            const isAuthor =  authorData.length >= 1;

            return isAuthor;

        } catch (error) {
            console.error('Error checking if user is blog author:', error);
            return false;
        }
    };

    
    const [trendingBlogs, setTrendingBlogs] = useState([]);


    const getTrendingBlogs = async () => {
        setLoading(true)

        if(trendingBlogs.length >= 1){
            return;
        } 

        try {
            const q = query(
                collection(fireDB, 'blogs'),
                orderBy('views', 'desc'), 
            ); 

            const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
                let blogArray = [];
                QuerySnapshot.forEach((doc) => {
                    blogArray.push({ ...doc.data(), id: doc.id });
                });
                setTrendingBlogs(blogArray);
                setLoading(false);
            });
 
    
            return unsubscribe;  

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const [comments, setComments] = useState([]);

    const getCommentsForBlog = async (blogId) => {
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

    const [deptBlogs, setDeptBlogs] = useState([]);

    
    const getDepartmentBlogs = async ( department ) => {
        setLoading(true)

        const deptKey = deptMap.get(department)

        try {
            const q = query(
                collection(fireDB, 'blogs'),
                orderBy('timeOfCreation', 'desc'),
                where('department', "==", deptKey)
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let deptBlogsArray = [];

                QuerySnapshot.forEach((doc) => {
                    deptBlogsArray.push({ ...doc.data(), id: doc.id });
                });

                setDeptBlogs(deptBlogsArray);
                setLoading(false);

            });

            return true; 

        } catch (error) {
            setLoading(false)
            return false;
        }

    }

    const [authorSpecificBlogs, setAuthorBlogs] = useState([]);

    const getAuthorBlogs = async (authorId ) => {
        setLoading(true)

        try {
            const q = query(
                collection(fireDB, 'blogs'),
                orderBy('timeOfCreation', 'desc'),
                where('authorId', "==", authorId)
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let blogsArray = [];

                QuerySnapshot.forEach((doc) => {
                    blogsArray.push({ ...doc.data(), id: doc.id });
                });

                setAuthorBlogs(blogsArray);
                setLoading(false);

            });

            return true;

        } catch (error) {
            setLoading(false)
            return false;
        }

    }
    
    const getFeaturedBlogs = async () => {
        try {
            const blogCollection = collection(fireDB, 'blogs');
            const q = query(blogCollection, where('isFeatured', '==', true));
            const querySnapshot = await getDocs(q);

            const featuredBlogs = [];
            querySnapshot.forEach((doc) => {
                featuredBlogs.push({ id: doc.id, ...doc.data() });
            });

            return featuredBlogs;
        } catch (error) {
            console.error('Error getting featured blogs:', error);
            return [];
        }
    };

    const clapBlog = async (userId, blogId, claps, blog) => {
        try {

            const likeRef = doc(fireDB, 'claps', `${userId}_${blogId}`);
            const likeDoc = await getDoc(likeRef);

            if (likeDoc.exists()) {
                // The user has already clapped the blog, so "take the clap back" 
                const updatedVotes = claps - 1;
                const updatedBlog = {
                    ...blog,
                    claps: updatedVotes,
                };

                await setDoc(doc(fireDB, 'blogs', blogId), updatedBlog);

                await deleteDoc(likeRef);

                toast.info('You have removed your clap', {
                    position: 'top-right',
                    autoClose: 500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                // The user hasn't clapped the blog yet, so "like" it
                const updatedVotes = claps + 1; // Increment the likes
                const updatedBlog = {
                    ...blog,
                    claps: updatedVotes,
                };

                // Update the post in the database
                await setDoc(doc(fireDB, 'blogs', blogId), updatedBlog);
                await setDoc(likeRef, { userId, blogId });

                toast.success('Thanks for clapping 👏', {
                    position: 'top-right',
                    autoClose: 500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.error('Error while liking a blog:', error);
        }
    }

    const commentOnBlog = async (blogId, user_id, comment, username) => {
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

        await setDoc(doc(commentsRef), newComment);

        toast.success("Comment added", {
            position: 'top-right',
            autoClose: 600,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }


    const followAuthor = async (followerId, followingId, followingUsername) => {
        try {

            if (followerId == followingId) { 
                toast.error("You can't follow yourself !", {
                    position: 'top-right',
                    autoClose: 800,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return false;
            }

            const followingsQuery = query(
                collection(fireDB, 'followings'),
                where('follower', '==', followerId),
                where('following', '==', followingId)
            );

            const followingsSnapshot = await getDocs(followingsQuery);

            if (!followingsSnapshot.empty) { 
                toast.info(`You are already following ${followingUsername}`, {
                    position: 'top-right',
                    autoClose: 800,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }); 
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
                toast.success(`Now following ${followingUsername}`, {
                    position: 'top-right',
                    autoClose: 800,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }); 

                return true;
            }

        } catch (error) {  
            return false;
        }
    };

    const getFollowersCount = async (authorId) => {
        // Get the followings count 
        const followersQuery = query(collection(fireDB, 'followings'), where('following', '==', authorId));
        const followersSnapshot = await getDocs(followersQuery);
        const followersCount = followersSnapshot.size;

        // const followingsQuery = query(collection(fireDB, 'followings'), where('follower', '==', userId));
        // const followingsSnapshot = await getDocs(followingsQuery);
        // const followingsCount = followingsSnapshot.size;

        return followersCount;
    }

    const fetchNumPosts = async () => {
        const querySnapshot = await getDocs(collection(fireDB, 'blogs'));
        return querySnapshot.size 
    };

    // Function to fetch number of users
    const fetchNumUsers = async () => {
        const querySnapshot = await getDocs(collection(fireDB, 'users'));
        return querySnapshot.size 
    };

    const fetchPosts = async () => {
        const querySnapshot = await getDocs(collection(fireDB, 'blogs'));
        const fetchedPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return fetchedPosts; 
    };

    const [searchkey, setSearchkey] = useState('')
    const [department, setDepartment] = useState('');

    return (
        <MyContext.Provider value={{
            mode, loading, setLoading, toggleMode,
            blog, allBlogs, setBlog, getBlogData,
            createBlog, updateBlog, deleteBlog,
            isBlogXAuthor,
            trendingBlogs, getTrendingBlogs, getAllBlogs,
            getDepartmentBlogs, deptBlogs, getFeaturedBlogs,
            getAuthorBlogs, authorSpecificBlogs,
            clapBlog, commentOnBlog, comments, setComments,
            followAuthor, getFollowersCount,
            getCommentsForBlog,
            fetchNumPosts, fetchNumUsers,fetchPosts,
            searchkey, setSearchkey
        }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default myState