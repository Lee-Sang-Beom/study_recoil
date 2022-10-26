import { atom, selector } from "recoil";

export const textState = atom({
    key: 'textState', // unique ID 
    default: '', // default value
})

export const textSeletor = selector({
    key: 'textLengthState', // unique ID 
    get: ({get}) => { // get function
        const text = get(textState);
        const textLength = text.length;
        const isText = textLength ? true : false;
        return {
            textLength,
            isText,
        };
    }
})