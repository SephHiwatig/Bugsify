/**
 * Solution data access layer
 */
const assert = require("assert");
const initDbConnection = require('../utils/mongoConnection');

const addNewSolution = async (solution, userId, kataId) => {
    try {
        const newSolution = {
            solution,
            answeredById: userId,
            likes: [],
            comments: [],
            dateAnswered: new Date(),
            kataId
        }
    
        const connection = await initDbConnection();
        const insert = await connection.insertItem('solutions', newSolution);
        connection.closeConnection();
        return insert.insertedId
    } catch (err) {
        return undefined;
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

        connection.closeConnection();


        // Selection sort: sort by the number of likes      
        const n = solutions.length; 
  
        // One by one move boundary of unsorted subarray 
        for (let i = 0; i < n-1; i++) 
        { 
            // Find the maximum element in unsorted array 
            let max_idx = i; 
            for (let j = i+1; j < n; j++) 
                if (solutions[j].likes > solutions[max_idx].likes) 
                    max_idx = j; 
  
            // Swap the found minimum element with the first 
            // element 
            let temp = solutions[max_idx]; 
            solutions[max_idx] = solutions[i]; 
            solutions[i] = temp; 
        } 

        return { succeeded: true, solutions }
    } catch (err) {
        return { succeeded: false, solutions: [] }
    }
}

const likeSolution = async (_id, userId) => {

    try {
        const connection = await initDbConnection();
        const solution = await connection.findByField('solutions', "_id", _id);

        solution.isLiked = !solution.isLiked;

        if(solution.isLiked) {
            if(!solution.likes.includes(userId))
                solution.likes.push(userId)
        } else {
            if(solution.likes.includes(userId)) {
                const index = solution.likes.findIndex(id => id === userId);
                solution.likes.splice(index, 1);
            }
        }

        const modify = await connection.update('solutions', solution);
        assert.strictEqual(1, modify.modifiedCount);

        connection.closeConnection();

        return { succeeded: true }

    } catch (err){

        return { succeeded: false }
    }

};

module.exports = {
    addNewSolution,
    getSolutions,
    likeSolution
}