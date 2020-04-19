import firebase from '../firebase';
import userService from './user-service';

const submitionsRef = firebase.database().ref('/submitions');

export default {
    createSubmition: async (data) => {
        submitionsRef.child(data.id)
            .set(data);
    },
    getAllSubmitionsForTest: async (testId) => {
        let snapshot = await submitionsRef.once('value');
        let questionObject = snapshot.val();
        let submitions = [];
        if (questionObject) {
            for (let question of Object.keys(questionObject)) {
                if (questionObject[question].testId === testId) {
                    questionObject[question]['user'] = await userService.findUserById(questionObject[question].userId);
                    submitions.push(questionObject[question]);
                }
            }
        }
        return submitions;
    }
}