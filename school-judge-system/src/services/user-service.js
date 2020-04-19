import firebase from '../firebase';

const usersRef = firebase.database().ref('/users');
const submitionsRef = firebase.database().ref('/submitions');

export default {
    isUserSubmittedThisTest: async (userId, testId) => {
        let snapshot = await submitionsRef.once('value');
        let snapshotValue = snapshot.val();
        if (snapshotValue) {
            for (let key of Object.keys(snapshotValue)) {
                if (snapshotValue[key].userId === userId && snapshotValue[key].testId === testId) {
                    return true;
                }
            }
        }
        return false;
    },
    findUserById: async (currUserId) => {
        let snapshot = await usersRef.once('value');
        let userObject = snapshot.val();
        if (userObject) {
            for (let userId of Object.keys(userObject)) {
                if (userId === currUserId) {
                    return userObject[userId];
                }
            }
        }
        return null;
    }
}