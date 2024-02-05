
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import Comment from './Comment';
import myContext from '../../../context/data/myContext';

function CommentSection({ blogId }) {

    const context = useContext(myContext);
    const { getCommentsForBlog, mode } = context;

    const isDarkTheme = mode === 'dark';

    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function fetchComments() {
            const cmts = await getCommentsForBlog(blogId);
            setComments(cmts);
        }

        fetchComments();
    }, [comments]);

    
    return (
        <div className="my-6 mx-[2%] mb-11">
            <h2 className=
                {`text-2xl font-semibold text-slate-800 underline mb-4 text-center
            ${isDarkTheme ? 'text-white' : 'text-slate-950'}`}>Comments</h2>
            <div className="space-y-4">

                {/* <Comment comment={comment1} />
                <Comment comment={comment1} /> */}

                {(comments?.length > 0) ?
                    comments.map((comment, index) => {
                        return (
                            <div key={index}>
                                <Comment comment={comment} />
                            </div>
                        )
                    })
                    :
                    <h3 className=
                        {`text-center text-xl my-10
            ${isDarkTheme ? 'text-white' : 'text-slate-950'}`}>Be the first one to comment..</h3>
                }

            </div>
        </div>
    );
}

export default CommentSection;

