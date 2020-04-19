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
    },
    toggleTestStatus: async (id) => {
        let snapshot = await testsRef.once('value');
        let testObject = snapshot.val();
        if (testObject) {
            for (let test of Object.keys(testObject)) {
                if (testObject[test].id === id) {
                    let currStatus = testObject[test].status;
                    if (currStatus === 'active') {
                        testObject[test].status = 'archived'
                    }
                    else {
                        testObject[test].status = 'active'
                    }
                    firebase.database().ref('/tests/' + test).update(testObject[test]);
                }
            }
        }
        return null;
    }
}