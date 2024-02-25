import { Timestamp } from "firebase/firestore";

const blogModel = {
    title: "",
    sectionTitles: [],
    // description: "",
    blogContent: [],
    summary: "",
    author: null,
    authorId: "",
    department: "",
    blogPoster: "",
    tags: [],
    // codelinks: [],
    claps: 0,
    views: 0,
    minutesRead: 0,
    isFeatured: false,
    timeOfCreation: Timestamp.now(),
    date: new Date().toLocaleString(
        "en-US",
        {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }
    )
}

export default blogModel;