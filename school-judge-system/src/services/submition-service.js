import firebase from '../firebase';
import userService from './user-service';
import questionService from './question-service';

const submitionsRef = firebase.database().ref('/submitions');

export default {
    createSubmition: async (data) => {
        submitionsRef.child(data.id)
            .set(data);

        for (let index = 0; index < data.answers.length; index++) {
            const answer = data.answers[index];
            const question = await questionService.findQuestionById(answer.questionId);
            if (question.type === 'choosable') {
                if (question.correctAnswer === answer.content) {
                    data.answers[index].IsCorrected = true;
                    data.answers[index].points = question.points;
                    data.points += question.points;
                }
                else {
                    data.answers[index].IsCorrected = false;
                }
                firebase.database()
                    .ref(`/submitions/${data.id}`)
                    .update(data);
            }
        }
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
    },
    getSubmitionWithQuestions: async (id) => {
        let snapshot = await submitionsRef.once('value');
        let submitionObject = snapshot.val();
        if (submitionObject) {
            for (let submitionId of Object.keys(submitionObject)) {
                let submition = submitionObject[submitionId];
                if (submitionId === id) {
                    for (let index = 0; index < submition.answers.length; index++) {
                        const answer = submition.answers[index];
                        submition.answers[index].question = await questionService.findQuestionById(answer.questionId);
                    }
                    return submition;
                }
            }
        }
        return null;
    }
}