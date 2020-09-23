const isAttachment = obj => {
    return obj !== null
        && (typeof obj === 'object')
        && obj.hasOwnProperty("rawFile")
}

const isAttachmentArray = obj => {
    return Array.isArray(obj) && obj.length !== 0 && isAttachment(obj[0])
}

const toAttachment = obj => obj.rawFile

const toAttachmentArray = arr => arr.map(item => toAttachment(item))

export {
    isAttachment,
    isAttachmentArray,
    toAttachment,
    toAttachmentArray
};