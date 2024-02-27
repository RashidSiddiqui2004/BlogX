
import React from 'react'  
import { Link } from 'react-router-dom'; 
import RecommendationCard from './RecommendationCard';

const RecommendedBlogs = ({ author, authorSpecificBlogs}) => {
 

    return (
        <div>

            <div className="more-from-author-container mt-8 text-left ml-4">
                <h2 className="text-xl font-semibold mb-4">{`More from ${author}`}</h2>
                
            </div>

            <div className="px-5 mt-10 w-full max-md:max-w-full mb-7">
                <div className="gap-y-4">
                    {
                        authorSpecificBlogs && authorSpecificBlogs.slice(0, 2)?.map((item, index) => {

                            const { title, 
                                // summary, 
                                department,
                                blogPoster,
                                tags, 
                                date,
                                id,
                                minutesRead
                            } = item;

                            // let shortSummary = extractFirstXWords(summary, 30);
                            // shortSummary += ' ...'

                            return (
                                <Link to={`/blog/${title}/${id}`} key={index}>
                                    <RecommendationCard title={title} publishDate={date}
                                        department={department} blogPoster={blogPoster}
                                        tags={tags} minsRead={minutesRead}/>
                                </Link>
                            )

                        })
                    }


                </div>
            </div>
        </div>
    )
}

export default RecommendedBlogs