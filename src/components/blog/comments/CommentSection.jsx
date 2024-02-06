
import { useContext } from 'react';
import Comment from './Comment';
import myContext from '../../../context/data/myContext';

function CommentSection({comments}) {

    const context = useContext(myContext);
    const { mode } = context;

    const isDarkTheme = (mode === 'dark');

    return (
        <div className="my-6 mx-[2%] mb-11">
            <h2 className=
                {`text-2xl font-semibold text-slate-800 underline mb-4 text-center
            ${isDarkTheme ? 'text-white' : 'text-slate-950'}`}>Comments</h2>
            <div className="space-y-4"> 

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

