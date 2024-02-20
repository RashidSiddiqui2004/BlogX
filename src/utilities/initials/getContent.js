

function extractText(htmlString) {
    // Remove HTML tags
    const plainText = htmlString?.replace(/<[^>]*>/g, '');
    
    console.log(htmlString);
    return plainText;
}

export default extractText