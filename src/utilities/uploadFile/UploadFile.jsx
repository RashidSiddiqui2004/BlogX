import { auth, storage } from "../../firebase/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Function to upload a file and get its download URL
export const uploadFile = async (file) => {
    try {
         const user = auth.currentUser;
        if (!user) {
            throw new Error('User not authenticated');
        }
 
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');

        const customFormattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        // Create a reference to the storage location (e.g., 'images/my-file.jpg')
        const storageRef = ref(storage, `resources/${customFormattedDateTime}-${file.name}`);

        // Upload the file
        const snapshot = await uploadBytes(storageRef, file);

        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);

        return downloadURL;

    } catch (error) {
        console.error('Error uploading file:', error.message); 
    }
};