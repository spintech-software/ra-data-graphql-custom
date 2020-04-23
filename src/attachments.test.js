import {
    isAttachment,
    isAttachmentArray,
    toAttachment,
    toAttachmentArray
} from './attachments'

describe('attachments', function () {
    const attachment = {
        rawFile:{fileName: "itwillbefile"}
    }
    const attachments = [attachment];

    describe('isAttachment', function () {
        it('should return false for plain types', function () {
            expect(isAttachment(1)).toBeFalsy();
        });
        it('should return false for not attachment', function () {
            expect(isAttachment({})).toBeFalsy();
        });
        it('should return true for attachment', function () {
            expect(isAttachment(attachment)).toBeTruthy();
        });
    });
    describe('isAttachmentArray', function () {
        it('should return false for plain types', function () {
            expect(isAttachmentArray(1)).toBeFalsy();
        });
        it('should return false for object', function () {
            expect(isAttachmentArray({})).toBeFalsy();
        });
        it('should return false for empty array', function () {
            expect(isAttachmentArray([])).toBeFalsy();
        });
        it('should return false for array of non attachments', function () {
            expect(isAttachmentArray([{}])).toBeFalsy();
        });
        it('should return true for attachment', function () {
            expect(isAttachmentArray(attachments)).toBeTruthy();
        });
    });
    describe('toAttachment', function () {
        it('should return raw file', function () {
            expect(toAttachment(attachment)).toEqual({fileName: "itwillbefile"})
        });
    });
    describe('toAttachmentArray', function () {
        it('should return array of raw files', function () {
            expect(toAttachmentArray(attachments)).toEqual([{fileName: "itwillbefile"}])
        });
    });
});