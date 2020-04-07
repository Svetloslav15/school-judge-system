import firebase from '../firebase';

const testsRef = firebase.database().ref('/tests');

export default {
    getTests: async () => {
        let snapshot = await testsRef.once('value');
        let testObject = snapshot.val();
        let tests = [];
        if (testObject) {
            for (let test of Object.keys(testObject)) {
                tests.push(testObject[test]);
            }
        }
        return tests;
    },
    getTestById: async (id) => {
        let snapshot = await testsRef.once('value');
        let testObject = snapshot.val();
        if (testObject) {
            for (let test of Object.keys(testObject)) {
                if (testObject[test].id === id) {
                    return testObject[test];
                }
            }
        }
        return null;
    }
}