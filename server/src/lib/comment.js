/**
 * Comment data access layer
 */
const assert = require("assert");
const initDbConnection = require('../utils/mongoConnection');

const addNewComment = async (args) => {

    try {

        const connection = await initDbConnection();

        const newComment = {
            commentById: args.commentById,
            commentBy: args.commentBy,
            commentDate: args.commentDate,
            comment: args.comment,
            solutionId: args.solutionId
        }
        const insert = await connection.insertItem('comments', newComment);
        assert.strictEqual(1, insert.insertedCount);

        const solution =  await connection.findByField('solutions', '_id', args.solutionId);

        solution.comments.push(insert.insertedId);
        const modify = await connection.update('solutions', solution);
        assert.strictEqual(1, modify.modifiedCount);

        newComment._id = insert.insertedId;
        return { succeeded: true, comment: newComment }

    } catch (err) {
        console.log(err);
        return { succeeded: false, comment: null }
    }
};

module.exports = {
    addNewComment
}