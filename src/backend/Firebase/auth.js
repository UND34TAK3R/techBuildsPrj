import { createUserWithEmailAndPassword, signInWithEmailAndPassword , sendEmailVerification, sendPasswordResetEmail, updatePassword, updateProfile, signInWithCustomToken } from 'firebase/auth';
import {auth} from '../../backend/Firebase/firebase.js';



export const doCreateUserWithEmailAndPassword = (email, password) =>{
    return createUserWithEmailAndPassword(auth, email, password);
};

export const doUpdateDisplayName = (user ,name) => {
    return updateProfile(user, { displayName: name });
}

export const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithToken = (tokenId) =>{
    return signInWithCustomToken(auth, tokenId);
}

export const doSignOut = () => {
    return auth.signOut();
};

export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth,email);  
};

export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password);
};

export const dosendEmailVerification = () => {
    return sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/home`,
    });
};
