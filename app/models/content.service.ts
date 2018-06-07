import { Injectable } from "@angular/core";

import { firestore } from "nativescript-plugin-firebase";
import QuerySnapshot = firestore.QuerySnapshot;
import CollectionReference = firestore.CollectionReference;
import DocumentSnapshot = firestore.DocumentSnapshot;
import get = Reflect.get;

const firebase = require("nativescript-plugin-firebase/app");

firebase.initializeApp({
    persist: true
});

@Injectable()
export class ContentService {

    appointments = firebase.firestore().collection("appointments");
    countries = firebase.firestore().collection("countries");
    customers = firebase.firestore().collection("customers");
    locations = firebase.firestore().collection("locations");
    notes = firebase.firestore().collection("notes");
    parts = firebase.firestore().collection("parts");
    sites = firebase.firestore().collection("sites");
    tasks = firebase.firestore().collection("tasks");
    technicans = firebase.firestore().collection("technicans");
    warehouses = firebase.firestore().collection("warehouses");

    attachOnDataChangeListener(collection: CollectionReference, callback: (snapshot: QuerySnapshot) => void) {
        collection.onSnapshot(callback);
    }

    add(collection: CollectionReference, data: any): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            collection.add(data)
                .then((onFulfilled) => {
                    resolve(onFulfilled.id);
                }, (onRejected) => {
                    reject(onRejected);
                });
        });
    }

    getAll<T>(collection: CollectionReference): Promise<Array<T>> {
        return new Promise<Array<T>>((resolve, reject) => {
            collection.get().then((onFulfilled) => {
                const array = [];

                onFulfilled.forEach((documentSnapshot) => {
                    array.push(documentSnapshot.data() as T);
                });

                resolve(array);
            });
        });
    }

    get<T>(collection: CollectionReference, id: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            collection.doc(id).get().then((onFulfilled) => {
                resolve(onFulfilled.data() as T);
            }, (onRejected) => {
                reject();
            });
        });
    }

    update(collection: CollectionReference, document: string, changes: any): Promise<void> {
        return new Promise((resolve, reject) => {
            collection.doc(document).update(changes)
                .then((onFulfilled) => {
                    resolve();
                }, (onRejected) => {
                    reject();
                });
        });
    }

    delete(collection: CollectionReference, document: string): Promise<void> {
        return new Promise((resolve, reject) => {
            collection.doc(document).delete()
                .then((onFulfilled) => {
                    resolve();
                }, (onRejected) => {
                    reject();
                });
        });
    }
}
