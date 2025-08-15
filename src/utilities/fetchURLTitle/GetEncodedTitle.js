function getEncodedTitle(title) {
    // Remove question marks from the string
    const stringWithoutQuestionMarks = title?.replace(/\?/g, '');
    // Replace spaces with dashes
    return stringWithoutQuestionMarks?.replace(/\s+/g, '-');
}

export default getEncodedTitle; 