import React, { useEffect, useState } from "react"
import { db } from '../firebase/config'


const useFirestore = (collection, condition) => {
    const [documents, setDocument] = useState([])
    useEffect(() => {
        let collectionRef = db.collection(collection).orderBy("createdAt")

        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                return
            }
            collectionRef = collectionRef.where(condition.fieldName, condition.operator, condition.compareValue)
        }
        const unsubcribe = collectionRef.onSnapshot(snapshot => {
            const documents = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setDocument(documents)
        })
        return unsubcribe
    }, [collection, condition]);
    return documents
}

export default useFirestore
