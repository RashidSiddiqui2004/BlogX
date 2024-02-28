
function replaceHtmlEntities(text) {
    const entitiesMap = {
        '&nbsp;': ' ',
        '&ldquo;': '“',
        '&rdquo;': '”',
        '&lsquo;': '‘',
        '&rsquo;': '’',
        // Add more entities as needed
    };

    // Replace HTML entities with their corresponding characters
    return text.replace(/&[a-zA-Z]+;/g, match => entitiesMap[match] || match);
}

function extractPlainText(html) {
    // Extract paragraph tags from HTML
    const paragraphMatches = html.match(/<p[^>]*>.*?<\/p>/gs);

    if (!paragraphMatches) return [];

    // Process each paragraph
    const paragraphs = paragraphMatches.map(paragraph => {
        // Remove HTML tags and trim whitespace
        const plainText = paragraph.replace(/<[^>]*>/g, '').trim();

        // Replace HTML entities with their corresponding characters
        return replaceHtmlEntities(plainText);
    });

    return paragraphs;
}

// const html = `<p id="375b" class="pw-post-body-paragraph wi wj qv mq b wk wl wm wn wo wp wq wr ma ws wt wu mf wv ww wx mk wy wz xa xb jh bq" data-selectable-paragraph="">Interviewer:&nbsp;<span class="mq gl">Can you stop a forEach loop in JavaScript?</span>&nbsp;This is a question I was once asked during an interview, and my initial response was,&nbsp;<span class="mq gl">&ldquo;No, I can&rsquo;t do that.&rdquo;</span></p> <p id="352b" class="pw-post-body-paragraph wi wj qv mq b wk wl wm wn wo wp wq wr ma ws wt wu mf wv ww wx mk wy wz xa xb jh bq" data-selectable-paragraph=""><span class="mq gl">Unfortunately, my response led the interviewer to end the interview</span><span class="mq gl">.</span></p> <p id="1215" class="pw-post-body-paragraph wi wj qv mq b wk wl wm wn wo wp wq wr ma ws wt wu mf wv ww wx mk wy wz xa xb jh bq" data-selectable-paragraph="">Frustrated with the outcome, I asked the interviewer, &ldquo;Why? Is it actually possible to stop a forEach loop in JavaScript?&rdquo;</p> <p id="e5b2" class="pw-post-body-paragraph wi wj qv mq b wk wl wm wn wo wp wq wr ma ws wt wu mf wv ww wx mk wy wz xa xb jh bq" data-selectable-paragraph="">Before the interviewer could answer, I took a moment to explain my understanding of why we couldn&rsquo;t directly stop a forEach loop in JavaScript.</p>`;

// const paragraphs = extractPlainText(html);
// console.log(paragraphs);


export default extractPlainText