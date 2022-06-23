export function getFileCountInFolder(path: string) {
    const fs = require('fs');
    var length = fs.readdirSync(path).length;

    return length;
}