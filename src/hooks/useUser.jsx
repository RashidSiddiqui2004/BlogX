
import React, { useContext, useEffect, useState } from "react"
import getUserID from "../utilities/userData/GetUserID";
import myContext from "../context/data/myContext";

export const useUser = () => {

    const [loading, setLoading] = useState(true);
   
    const context = useContext(myContext);
    const {isBlogXAuthor } = context;

    const [userId, setUserId] = useState(null);
    const [isAuthor, setIsAuthor] = useState(false);

    const fetchUserData = async () => {

        setLoading(false);

        try {
            const uid = await getUserID();

            if (uid !== -1) {
                setUserId(uid);
                const isUseraAuthor = await isBlogXAuthor(uid);
                setIsAuthor(isUseraAuthor);
            }
        } catch (err) {
            console.log(err);
        } finally{
            setLoading(false);
        }
    };

    useEffect(() => { 
        fetchUserData();
    }, []);

    return (
        {userId, isAuthor}
    )

}