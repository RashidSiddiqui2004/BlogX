 
function extractPlainText(html) {

    if(html==undefined){
        return null;
    }

    const entitiesMap = {
        '&nbsp;': ' ',
        '&ldquo;': '“',
        '&rdquo;': '”',
        '&lsquo;': '‘',
        '&rsquo;': '’', 
    };

    // Replace HTML entities with their corresponding characters
    html = html.replace(/&[a-zA-Z]+;/g, match => entitiesMap[match] || match);

    // Extract paragraph tags from HTML
    const paragraphMatches = html.match(/<p[^>]*>.*?<\/p>/gs);
    const listMatches = html.match(/<ol[^>]*>.*?<\/ol>/gs);
    const listMatches2 = html.match(/<ul[^>]*>.*?<\/ul>/gs);

    if (!paragraphMatches && !listMatches) return [];

    const result = [];

    // Process each paragraph
    if (paragraphMatches) {
        paragraphMatches?.forEach(paragraph => {
            // Remove HTML tags and trim whitespace
            const plainText = paragraph.replace(/<[^>]*>/g, '').trim();
            result.push({ type: 'paragraph', content: plainText });
        });
    }

    // Process each list
    if (listMatches) {
        listMatches?.forEach(list => {
            // Remove HTML tags and trim whitespace
            const listItems = list.replace(/<[^>]*>/g, '').trim().split('\n').map(item => item.trim());
            result.push({ type: 'list', items: listItems });
        });
    }

    if (listMatches2) {
        listMatches?.forEach(list => {
            // Remove HTML tags and trim whitespace
            const listItems = list.replace(/<[^>]*>/g, '').trim().split('\n').map(item => item.trim());
            result.push({ type: 'list', items: listItems });
        });
    }

    return result;
}


// const html = `<p id="375b" class="pw-post-body-paragraph wi wj qv mq b wk wl wm wn wo wp wq wr ma ws wt wu mf wv ww wx mk wy wz xa xb jh bq" data-selectable-paragraph="">Interviewer:&nbsp;<span class="mq gl">Can you stop a forEach loop in JavaScript?</span>&nbsp;This is a question I was once asked during an interview, and my initial response was,&nbsp;<span class="mq gl">&ldquo;No, I can&rsquo;t do that.&rdquo;</span></p> <p id="352b" class="pw-post-body-paragraph wi wj qv mq b wk wl wm wn wo wp wq wr ma ws wt wu mf wv ww wx mk wy wz xa xb jh bq" data-selectable-paragraph=""><span class="mq gl">Unfortunately, my response led the interviewer to end the interview</span><span class="mq gl">.</span></p> <p id="1215" class="pw-post-body-paragraph wi wj qv mq b wk wl wm wn wo wp wq wr ma ws wt wu mf wv ww wx mk wy wz xa xb jh bq" data-selectable-paragraph="">Frustrated with the outcome, I asked the interviewer, &ldquo;Why? Is it actually possible to stop a forEach loop in JavaScript?&rdquo;</p> <ol><li>Write blog here</li> <li>Publish it on BlogX</li> </ol> <p id="e5b2" class="pw-post-body-paragraph wi wj qv mq b wk wl wm wn wo wp wq wr ma ws wt wu mf wv ww wx mk wy wz xa xb jh bq" data-selectable-paragraph="">Before the interviewer could answer, I took a moment to explain my understanding of why we couldn&rsquo;t directly stop a forEach loop in JavaScript.</p>`;

// const html2 = `<ol>
// <li>Write blog here</li>
// <li>Publish it on BlogX</li>
// <li>Get Famous in Campus</li>
// </ol>`

// const paragraphs = extractPlainText(html2);
// console.log(paragraphs);

export default extractPlainText;
