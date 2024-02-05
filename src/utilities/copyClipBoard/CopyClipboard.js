
function copyToClipboard() {
    const urlToCopy = window.location.href;

    // Create a temporary input element
    const tempInput = document.createElement('input');
    tempInput.value = urlToCopy;
    document.body.appendChild(tempInput);

    // Select the text inside the input element
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);

    // Copy the text to the clipboard
    document.execCommand("copy");

    // Remove the temporary input element
    document.body.removeChild(tempInput);

    // const messagePointer = document.getElementById('copyConf');

    // messagePointer.classList.remove('hidden');

    // setTimeout(() => {
    //     messagePointer.classList.add('hidden');
    // }, 1000);

}

export default copyToClipboard;