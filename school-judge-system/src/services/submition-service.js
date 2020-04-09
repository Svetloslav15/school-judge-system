import firebase from '../firebase';

const submitionsRef = firebase.database().ref('/submitions');

export default {
    createSubmition: async (data) => {
        submitionsRef.child(data.id)
            .set(data);
    }
}