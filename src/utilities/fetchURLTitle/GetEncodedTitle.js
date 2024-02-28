
function getEncodedTitle(str) {
    // Remove question marks from the string
    const stringWithoutQuestionMarks = str?.replace(/\?/g, '');
    
    // Replace spaces with dashes
    return stringWithoutQuestionMarks?.replace(/\s+/g, '-');
}

export default getEncodedTitle; 