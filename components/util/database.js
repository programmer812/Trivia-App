import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('trivia-app.db');

export const initDB = () => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS quizzes (
                id INTEGER PRIMARY KEY NOT NULL,
                category TEXT NOT NULL,
                difficulty TEXT NOT NULL,
                grade FLOAT NOT NULL,
                date DATETIME NOT NULL
            )`,
            [],
            () => {
                resolve();
            },
            (_, error) => {
                reject(error);
            })
        })  
    })

    return promise;
}

export const insertQuizScore = (quizScore) => {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`INSERT INTO quizzes (category, difficulty, grade, date) VALUES (?, ?, ?, ?)`, 
            [quizScore.category, quizScore.difficulty, quizScore.grade, quizScore.date],
            (_, result) => {
                resolve(result);
            },
            (_, error) => {
                reject(error);
            })
        })
    })

    return promise;
}

// export const fetchQuizScores = () => {
//     const promise = new Promise((resolve, reject) => {
//         database.transaction((tx) => {
//             tx.executeSql(`SELECT * FROM quizzes`,
//             [],
//             (_, result) => {
//                 resolve(result.rows._array);
//             },
//             (_, error) => {
//                 reject(error);
//             })
//         })
//     })
    
//     return promise;
// }