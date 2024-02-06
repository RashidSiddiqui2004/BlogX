 
async function getUserID() { 
  
    try {
        const userid = await JSON.parse(localStorage.getItem('user'))?.user?.uid;
  
        if(userid===undefined) return -1;

        return userid;
        
    } catch (error) {
        console.error('Error fetching USERID:', error);
        return null;
    }

}
 
export default getUserID;