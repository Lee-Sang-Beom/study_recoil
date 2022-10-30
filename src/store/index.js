import { atom, selector } from "recoil";

// todoList가 담길 배열
export const textListAtom = atom({
    key: 'textListAtom', // unique ID 
    default: [], // default value
})

// todoList의 각 내용이 담김
export const textAtom = atom({
    key: 'textAtom', // unique ID 
    default: '', // default value
})

