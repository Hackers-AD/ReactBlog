import * as actionTypes from './actionTypes';
import { app } from '../../firebase';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export const fetch_auth = () => async(dispatch, getState) => {
    onAuthStateChanged(auth, (user) => {
        if(user){
            dispatch({
                type: actionTypes.FETCH_AUTH,
                payload: {
                    user: user.providerData[0],
                    is_authenticated: true,
                }
            });
        }else{
            console.log("No user was previously logged in");
        }
    })
}

export const login_user = (data) => async (dispatch, getState) => {
    let user;
    await signInWithEmailAndPassword(auth, data.email, data.password).then(userCredential => {
            user = userCredential.user.providerData[0];
        }).catch(err => {
            console.log(err);
        });

    dispatch({
        type: actionTypes.LOGIN_USER,
        payload: user,
    })
}

export const logout_user = (data) => async (dispatch, getState) => {
    
    await signOut(auth).then(() => {
      }).catch((err) => {
        console.log(err)
      });
    
    dispatch({
        type: actionTypes.LOGOUT_USER,
    });
}

export const create_user = (data) => async (dispatch, getState) => {
    let userdata = {};
    await createUserWithEmailAndPassword(auth, data.email, data.password).then(userCredential => {
            dispatch({
                type: actionTypes.CREATE_USER,
                payload: userCredential.user,
            })
            userdata = userCredential.user.providerData[0]
        }).catch(err => {
            console.log(err);
        });

    await addDoc(collection(db, "users"), userdata);
    dispatch(fetch_user());
}

export const fetch_user = () => async(dispatch, getState) => {
    const querySnapshot = await getDocs(collection(db, "users"));
    let userList = [];
    querySnapshot.forEach((doc) => {
        if(doc.data().uid){
            userList.push(doc.data());
        }
      });

    dispatch({
        type: actionTypes.FETCH_USER,
        payload: userList,
    })
}

export const fetch_post = () => async(dispatch, getState) => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    let posts = [];
    querySnapshot.forEach((doc) => {
        posts.push(doc.data());
      });
    dispatch({
        type: actionTypes.FETCH_POST,
        payload: posts,
    })  
}

export const create_post = (data) => async(dispatch, getState) => {
    let image_url = null;

    if(data.file){
        let storageRef = ref(storage, `posts/${data.file.name}`);

        await uploadBytes(storageRef, data.file).then(snapshot => {
            console.log("File uploaded successfully");
        }).catch(err => {
            console.log(err);
        });

        await getDownloadURL(storageRef).then(url => {
            image_url = url;
        }).catch(err => console.log(err));
    }

    let datetime = new Date();
    let postData = {
        id: data.id,
        user: auth.currentUser.providerData[0],
        title: data.title,
        image_url: image_url,
        created_date : datetime.toLocaleDateString(),
        created_time : datetime.toLocaleTimeString()
    }
    await addDoc(collection(db, "posts"), postData);
    dispatch({
        type: actionTypes.CREATE_POST,
        payload: postData,
    });
}

export const edit_post = (data) => async(dispatch, getState) => {
    let docId, docData;
    const querySnapshot = await getDocs(collection(db, "posts"));
        querySnapshot.forEach((doc) => {
            if(doc.data().id == data.id){
                docId = doc.id
                docData = doc.data()
            }
        });
    const postRef = doc(db, "posts", docId);
    await updateDoc(postRef, {
        title: data.title,
      });
    dispatch({
        type: actionTypes.EDIT_POST,
        payload: {
            ...docData,
            title: data.title,
        }
    })
}

export const delete_post = (postId) => async(dispatch, getState) => {
    let docId;
    const querySnapshot = await getDocs(collection(db, "posts"));
        querySnapshot.forEach((doc) => {
            if(doc.data().id == postId){
                docId = doc.id
            }
        });

    await deleteDoc(doc(db, "posts", docId));
    console.log("Sucessfuly deleted the post.")
    dispatch({
        type: actionTypes.DELETE_POST,
        payload: { id: postId},
    });
}