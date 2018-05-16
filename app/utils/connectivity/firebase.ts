import * as firebase from "nativescript-plugin-firebase";

export function startup() {
    console.log('start init');
    firebase.init({
        persist: true,
    }).then(() => {
        console.log('firebase initialized');
    });
}