import { Injectable } from "@angular/core";
import { firestore } from "nativescript-plugin-firebase";

// Nicht benötigte imports?
// ------------------------
// import QuerySnapshot = firestore.QuerySnapshot;
// import CollectionReference = firestore.CollectionReference;
// import DocumentSnapshot = firestore.DocumentSnapshot;
// import get = Reflect.get;

// Kann direkt über den firestore import angesprochen werden
// ---------------------------------------------------------
// const firebase = require("nativescript-plugin-firebase/app");

// Wird bei Firestore default auf true gesetzt
// -------------------------------------------
// firebase.initializeApp({
//     persist: true
// });

@Injectable()
export class ContentService {

    appointments = firestore.collection("appointments");
    countries = firestore.collection("countries");
    customers = firestore.collection("customers");
    locations = firestore.collection("locations");
    notes = firestore.collection("notes");
    parts = firestore.collection("parts");
    sites = firestore.collection("sites");
    tasks = firestore.collection("tasks");
    technicans = firestore.collection("technicans");
    warehouses = firestore.collection("warehouses");

    attachOnDataChangeListener(collection: firestore.CollectionReference,
        callback: (snapshot: firestore.QuerySnapshot) => void) {

        collection.onSnapshot(callback);
    }

    add(collection: firestore.CollectionReference, data: any): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            collection.add(data)
                .then((onFulfilled) => {
                    resolve(onFulfilled.id);
                }, (onRejected) => {
                    reject(onRejected);
                });
        });
    }

    getAll<T>(collection: firestore.CollectionReference): Promise<Array<T>> {
        return new Promise<Array<T>>((resolve, reject) => {
            collection.get().then((onFulfilled) => {
                const array = new Array<T>();

                onFulfilled.forEach((documentSnapshot) => {
                    array.push(documentSnapshot.data() as T);
                });

                resolve(array);
            });
        });
    }

    get<T>(collection: firestore.CollectionReference, id: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            collection.doc(id).get().then((onFulfilled) => {
                resolve(onFulfilled.data() as T);
            }, (onRejected) => {
                reject();
            });
        });
    }

    update(collection: firestore.CollectionReference, document: string, changes: any): Promise<void> {
        return new Promise((resolve, reject) => {
            collection.doc(document).update(changes)
                .then((onFulfilled) => {
                    resolve();
                }, (onRejected) => {
                    reject();
                });
        });
    }

    delete(collection: firestore.CollectionReference, document: string): Promise<void> {
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
