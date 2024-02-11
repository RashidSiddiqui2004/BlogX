
function getEncodedTitle(str) {
    return str?.replace(/\s+/g, '-');
}

export default getEncodedTitle; 