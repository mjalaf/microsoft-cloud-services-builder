import { env } from "process";
const util = require('util');
const fs = require('fs');
const readFileAsync = util.promisify(fs.readFile);

export function appendFullAzureURL(partialURL: string) {
    return env.AZURE_URL + partialURL;
}
export function extImageNameAndExtenstion(imgURL) {
    // Remove everything to the last slash in URL
    imgURL = imgURL.substr(1 + imgURL.lastIndexOf("/"));
    // Break URL at ? and take first part (file name, extension)
    imgURL = imgURL.split('?')[0];

    return imgURL;
}
export async function readFile(fileName : string) {
    let data;
    try {
        data = await readFileAsync(fileName);
    } catch (err) {
        console.log('ERROR', err);
        throw err;
    }
    return data;
}