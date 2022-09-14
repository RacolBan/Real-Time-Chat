import firebase, { db } from "./config"

export const addDocumentToDatabase = (collection, data) => {
    const query = db.collection(collection);
    query.add({
        ...data,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
}