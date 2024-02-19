

function extractText(htmlString) {
    // Remove HTML tags
    const plainText = htmlString?.replace(/<[^>]*>/g, '');
 
    return plainText;
}

export default extractText