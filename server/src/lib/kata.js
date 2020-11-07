/**
 * Kata data access layer
 */
const assert = require("assert");
const initDbConnection = require('../utils/mongoConnection');
const babel = require("babel-core");
const loopcontrol = require("../utils/ast");
const { parseInputs } = require("../utils/kataHelpers");
const { addNewSolution } = require('../lib/solution');
const { addUserExp } = require('../lib/user');
const { ObjectID } = require("mongodb");


const addNewKata = async (kata) => {
    try {
        // Add extra fields to kata
        kata.likes = [];
        kata.solutions = [];

        // Connect to database and insert the new Kata,
        // Verify that new kata is added with assert
        const connection = await initDbConnection();
        const insert = await connection.insertItem('katas', kata);
        connection.closeConnection();

        assert.strictEqual(1, insert.insertedCount);

        return { succeeded: true, message: "Ok" };
    } catch {
        return { succeeded: false, message: "Something went wrong." };
    }
}

const getPagedKatas = async (pagingInfo) => {

    try {

        // Connect to database and insert the new Kata,
        // Verify that new kata is added with assert
        const connection = await initDbConnection();
        let allKatas = await connection.findAll('katas', {});
        connection.closeConnection();

        if(pagingInfo.filterState) {
            allKatas = allKatas.filter(kata => 
                kata.title.toLowerCase().includes(pagingInfo.filterState.toLowerCase()));
        }

        const totalCount = allKatas.length;
        const skipAmount = (pagingInfo.pageNumber - 1) * pagingInfo.pageSize;
        allKatas.splice(0, skipAmount);

        const pagedKatas = allKatas.slice(0, pagingInfo.pageSize);

        const pInfo = {
            pageSize: pagingInfo.pageSize,
            pageNumber: pagingInfo.pageNumber,
            totalCount,
            filterState: pagingInfo.filterState
        }

        return { succeeded: true, message: "Ok", katas: pagedKatas, pagingInfo: pInfo };
    } catch {
        return { succeeded: false, message: "Something went wrong.", katas: [] };
    }
};

const searchKatas = async (keyWord, pageSize) => {
    try {
        const connection = await initDbConnection();
        let allKatas = await connection.findAll('katas', {});
        connection.closeConnection();

        if(!keyWord) {
            const allCount = allKatas.length;
            allKatas = allKatas.slice(0, pageSize);
            return {succeeded: true, katas: allKatas, totalCount: allCount};
        }

        let newSet = allKatas.filter(kata => kata.title.toLowerCase().includes(keyWord.toLowerCase()));
        const filteredCount = newSet.length;
        newSet = newSet.slice(0, pageSize);

        return {succeeded: true, katas: newSet, totalCount: filteredCount};
    } catch (err) {
        return { succeeded: false, katas: [], totalCount: 0 };
    }
}

const updateKata = async (kata) => {
    try {
        const connection = await initDbConnection();
        let modify = await connection.update('katas', kata);
        connection.closeConnection();

        assert(1, modify.modifiedCount );
        return { succeeded: true }
    } catch (err) {
        return { succeeded: false }
    }
}

const parseKataTestOutput = (kata) => {
    const temp = { ...kata };
    temp.tests.forEach(items => {
        switch(items[2]) {
            case "number": {
                items[1] = Number(items[1]);
                break;
            }
            case "boolean": {
                items[1] = items[1] === 'true';
                break;
            }
            default:
                break;
        }
    })

    return kata;
}

const getSampleKata = async () => {
    try {
        const connection = await initDbConnection();
        const kata = await connection.findByField('katas', 'isSampleKata', true);
        connection.closeConnection();
    
        if(kata) {
            return { succeeded: true, kata}
        } else {
            return { succeeded: false, kata: null}
        }
    } catch (err) {
        return { succeeded: false, kata: null}
    }
};

const getKataToAnswer = async (userId) => {
    try {
        // Would be better to make a query to 
        // filter the katas instead of using array functions
        const connection = await initDbConnection();
        let katas = await connection.findAll('katas', {});
        let userAnswers = await connection.findAll('solutions', { answeredById: userId });
        userAnswers = userAnswers.map(solution => solution.kataId);
        connection.closeConnection();

        // DO NOT get a kata that's already been answered by the user
        // const filteredKatas = katas.filter(kata => !kata.isSampleKata && !userAnswers.includes(kata._id.toString()));
        const filteredKatas = katas.filter(kata => !kata.isSampleKata);

        // Kata length > 0 means user has not yet answered all the katas
        if(filteredKatas.length > 0) {
            // const randomIndex = Math.floor(Math.random() * Math.floor(filteredKatas.length));
            // return { succeeded: true, kata: filteredKatas[randomIndex]};
            return { succeeded: true, kata: filteredKatas[13]};
        } else {
            katas = katas.filter(kata => !kata.isSampleKata);
            const randomIndex = Math.floor(Math.random() * Math.floor(katas.length));
            return { succeeded: true, kata: katas[randomIndex]};
        }

    } catch (err) {
        return { succeeded: false, kata: null};
    }
};

const initTest = async (kataId, solution, userId = null) => {

    try {
        // Get the kata to test
        const connection = await initDbConnection();
        let kata = await connection.findByField('katas', "_id", kataId);
        if(!kata) {
            return { succeeded: false, message: "Not found"}
        }

        // Use AST transform to add checks on user's code
        var out = babel.transform(solution, {
            plugins: [loopcontrol]
        });

        // Create the new function to run
        const funcSolution = new Function("return " + out.code)();

        // Variables to hold output informations
        const consoleList = [];
        let passed = true;

        try {

            // Loop through each tests, run the function and compare the
            // output with the test output
            for(let i = 0; i < kata.tests.length; i++) {
                // Input is stored as a string with pattern to determine type.
                // Parse the input before passing it to the new function
                const inputs = parseInputs(kata.tests[i][0]);

                const output = funcSolution(...inputs);

                if(output === kata.tests[i][1]) {
                    consoleList.push({ passedTest: true, message: "Passed"});
                } else {
                    passed = false;
                    consoleList.push({ passedTest: false, message: "Failed: Expected " + kata.tests[i][1] + " but got " + output});
                }
            }

        } catch (err) {
            // Catch the error thrown by the user's code and store it in consoleList
            // to return to the client
            passed = false;
            if(err === "Execution Timeout") {
                consoleList.push({ passedTest: false, message: err + ": Consider refactoring your code for better performance"});
            } else {
                consoleList.push({ passedTest: false, message: err.message});
            }
        }
        
        const result = {
            passed,
            consoleList,
            user: null
        }

        // If user is authenticated, modify the kata to add or update solution
        if(result.passed && userId) {
            let wasAnswered = false;
            let existingAnswer;
            for(let i = 0; i < kata.solutions.length; i++) {
                const existingSolution = await connection.findByField('solutions', '_id', kata.solutions[i]);
                if(existingSolution.answeredById === userId) {
                    wasAnswered = true;
                    existingAnswer = existingSolution;
                }
            }

            // If the kata has already been answered by the user update their answer
            // if not, create a new answer/solution
            let user = await connection.findByField('users', '_id', userId);

            if(wasAnswered) {
                existingAnswer.dateAnswered = new Date();
                existingAnswer.solution = solution;
                await connection.update('solutions', existingAnswer);
                const userToReturn = {
                    _id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    level: user.level,
                    exp: user.exp,
                    role: user.role
                };
                result.user = userToReturn;
            } else {
                const newSolutionId = await addNewSolution(solution, userId, kataId);
                kata.solutions.push(newSolutionId);
                await connection.update('katas', kata);
                result.user = await addUserExp(user);
            }
        }

        connection.closeConnection();
        return { succeeded: true, result, };

    } catch (err) {
        return { succeeded: false, result: null}
    }
};

const getSolutions = async (_id, userId) => {
   
    try {
        // Get the kata
        const connection = await initDbConnection();
        const kata = await connection.findByField('katas', "_id", _id);

        // Solutions to be returned
        const solutions = [];

        // Loop through each solutions id and create the solution object
        // then push to the solutions array
        for(let i = 0; i < kata.solutions.length; i++) {
            const solution =  await connection.findByField('solutions', "_id", kata.solutions[i]);
            const isLiked = solution.likes.includes(userId);
            const user =  await connection.findByField('users', "_id", solution.answeredById);
            solutions.push({
                _id: solution._id,
                solution: solution.solution, // Need better naming
                answeredBy: user.username,
                likes: solution.likes.length,
                isLiked,
                commentCount: solution.comments.length,
                dateAnswered: solution.dateAnswered
            })
        }
        
        return { succeeded: true, solutions }
    } catch (err) {
        return { succeeded: false, solutions: [] }
    }
}

module.exports = {
    addNewKata,
    getPagedKatas,
    searchKatas,
    updateKata,
    getSampleKata,
    getKataToAnswer,
    initTest,
    getSolutions,
    parseKataTestOutput
}