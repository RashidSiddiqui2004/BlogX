
function extractFirstXWords(htmlString, wordCount=-1) {
    // Remove HTML tags
    const plainText = htmlString?.replace(/<[^>]*>/g, '');

    // Extract first 30 words
    const words = plainText?.split(/\s+/);
    const first30Words = words?.slice(0, (wordCount==-1 ? words.length : wordCount)).join(' ');

    return first30Words;
}

export default extractFirstXWords