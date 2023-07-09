document.addEventListener('click', (event) => {
    const clickedElement = document.elementFromPoint(event.clientX, event.clientY);
    if (clickedElement && clickedElement.innerText) {
        const text = clickedElement.innerText
        if (text.startsWith("s3://")){
            const url = makeAwsWebConsoleUrl(text)
            chrome.runtime.sendMessage({ action: 'openNewTab', url: url })
        }
    } 
});

function makeAwsWebConsoleUrl(s3Uri){
    const match = s3Uri.match(/^s3:\/\/([^\/]*)\/(.*)$/);
    const bucket = match[1]
    const prefix = match[2]
    url="https://s3.console.aws.amazon.com/s3/buckets/"+bucket+"?prefix="+prefix
    return url
}