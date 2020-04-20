import firebase from '../firebase';

const questionsRef = firebase.database().ref('/questions');

export default {
    getQuestionsForTest: async (id) => {
        let snapshot = await questionsRef.once('value');
        let questionObject = snapshot.val();
        let questions = [];
        if (questionObject) {
            for (let question of Object.keys(questionObject)) {
                if (questionObject[question].testId === id) {
                    questions.push(questionObject[question]);
                }
            }
        }
        return questions;
    },
    findQuestionById: async (id) => {
        let snapshot = await questionsRef.once('value');
        let questionObject = snapshot.val();
        if (questionObject) {
            for (let question of Object.keys(questionObject)) {
                if (question === id) {
                    return questionObject[question];
                }
            }
        }
        return null;
    }
}