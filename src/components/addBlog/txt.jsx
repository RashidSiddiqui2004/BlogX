
// file upload feature code here

// const [filesForSections, setFilesForSections] = useState([]);
// const [fileName, setFileName] = useState('');

// const handleDragOver = (event) => {
//     event.preventDefault();
// };

// const handleDrop = (event, sectionIndex) => {
//     event.preventDefault();
//     const file = event.dataTransfer.files[0];
//     setFileName(file.name);
//     submitFileforSections(file, sectionIndex);
// };

// const submitFileforSections = async (file, sectionIndex) => {

//     let fileURL = null;

//     if (file) {
//         try {
//             // Handle file upload logic here
//             // For example, uploadFile is a function to upload the file to a server
//             const pdfURLfromFB = await uploadFile(file);

//             // Update state with the pdf URL
//             if (pdfURLfromFB !== null) {
//                 fileURL = pdfURLfromFB;
//             }
//         } catch (error) {
//             console.error('Error uploading file:', error);
//         }
//     }

//     const index = sectionIndex * maxFilesPerSection;

//     setFilesForSections((prevFiles) => {
//         const newFiles = [...prevFiles];

//         // Add null values for missing elements in the 2D array
//         while (newFiles.length <= index) {
//             newFiles.push(null);
//         }

//         // Add the saved file URL at the specified index
//         newFiles[sectionIndex] = [...newFiles[sectionIndex], fileURL];

//         return newFiles;
//     });

// };

// const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setFileName(file.name);
//     submitFileforSections(file);
// };


// for adding links (resources) in blog
// const [currentLink, setCurrentLink] = useState('');

// const handleCodeInputChange = (e) => {
//     const newlink = e.target.value.trim();
//     setCurrentLink(newlink);
// };

// const [showWrongURLMsg, setShowWrongURLMsg] = useState(false);

// const handleLinkInputKeyDown = (e) => {
//     if (e.key === 'Enter' && currentLink.trim() !== '') {
//         const newLink = e.target.value.trim();

//         if (isValidUrl(newLink) == true) {
//             setCodelinks([...codelinks, currentLink.trim()]);

//             setBlog((prevBlog) => ({ ...prevBlog, codelinks: [...prevBlog.codelinks, newLink] }));
//             setCurrentLink('');
//             setShowWrongURLMsg(false);
//         }

//         else {
//             setShowWrongURLMsg(true);
//             return;
//         }
//     }
// };

// const handleLinkRemove = (index) => {
//     const updatedLinks = [...codelinks];
//     updatedLinks.splice(index, 1);
//     setCodelinks(updatedLinks);
//     setBlog((prevBlog) => {
//         const updatedLinks = [...prevBlog.codelinks];
//         updatedLinks.splice(index, 1);
//         return { ...prevBlog, codelinks: updatedLinks };
//     });
// };

// const submitFileforSections = async (file, sectionIndex) => {

//     let fileURL = null;
    
//     const filename = file.name;

//     if (file) {
//         try {
//             const uploadedFileURL = await uploadFile(file);
//             if (uploadedFileURL) {
//                 fileURL = uploadedFileURL;
//             }
//         } catch (error) {
//             console.error('Error uploading file:', error);
//         }
//     }

//     const sectionFiles = filesForSections[sectionIndex];

//     if (sectionFiles && sectionFiles.length < maxFilesPerSection) {
//         const updatedFiles = [...sectionFiles, fileURL];
//         const newFilesForSections = [...filesForSections];
//         newFilesForSections[sectionIndex] = updatedFiles;
//         setFilesForSections(newFilesForSections);
//     }

//     else if (sectionFiles === undefined) {
//         const updatedFiles = [fileURL];
//         const newFilesForSections = [...filesForSections];
//         newFilesForSections[sectionIndex] = updatedFiles;
//         setFilesForSections(newFilesForSections);
//     }
//     else {
//         alert('Maximum number of files reached for this section');
//     }
// };


  {/* codelinks associated with blogs */}

                    {/* <div className="mt-4">
                        <h2 className='text-white flex justify-start text-xl mb-2 font-semibold ml-3'>Links for Code included in Blog (Optional)</h2>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {codelinks?.map((codelink, index) => (
                                <div className='rounded-full bg-slate-500 py-1 px-4 shadow-md shadow-green-300
                    hover:scale-95 transition-all' key={index}>
                                    {codelink}
                                    <button
                                        onClick={() => handleLinkRemove(index)}
                                        className={`rounded-full text-white px-3 py-1`}
                                    >
                                        &#x2715;
                                    </button>
                                </div>

                            ))}
                        </div>

                        <input
                            type="text"
                            value={currentLink}
                            onChange={handleCodeInputChange}
                            onKeyDown={handleLinkInputKeyDown}
                            placeholder="Type and press Enter to add Code links (example: wtools links)"
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
                        />

                        {
                            showWrongURLMsg
                                ?
                                <h3 className='text-red-600 text-left mb-3'>
                                    Pls add a valid URL
                                </h3>
                                : ""
                        }
                    </div> */}
