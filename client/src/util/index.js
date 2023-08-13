import { surpriseMePrompts } from "../constants";
import FileSaver from "file-saver";


export function getRandomPrompt(prompt){
    const index = Math.floor(Math.random()*surpriseMePrompts.length);
    const pr = surpriseMePrompts[index];
    if(pr === prompt) return getRandomPrompt(prompt);

    return pr;
}


export async function downloadImage(_id,photo){
    FileSaver.saveAs(photo,`download-${_id}.jpg`);
}