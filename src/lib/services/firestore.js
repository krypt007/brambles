import { doc, getDoc, setDoc, addDoc, collection } from "firebase/firestore"; 
import { getDb } from "../firebase"

const collection_name = "users"

export const findUser = async id => {
    const d = await getDoc(doc(getDb(), collection_name, id)) 
    return d.data()
}

export const createUser = async (data) => {
    // Define the collection and document data
    const myCollection = collection(getDb(), collection_name);

    // // Add the document to the collection
    // const newDocRef = await addDoc(myCollection, data);

    // // Log the document ID
    // console.log('New document added with ID:', newDocRef.id);

    // Define the document reference
    const myDocRef = doc(myCollection, data.userId);

    // Add or update the document
    const newDocRef = await setDoc(myDocRef, data);

    // Log a success message
    console.log('Document added or updated successfully!');

    return newDocRef;
}