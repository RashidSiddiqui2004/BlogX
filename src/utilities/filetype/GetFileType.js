
function getFileType(url) {
    const fileName = url.split('/').pop();

    const fileSecondName = fileName.split('.').pop();

    let fileType = fileSecondName.split('?');
    
    fileType.pop();

    fileType = fileType[0];

    return fileType
}

export default getFileType