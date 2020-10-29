/**
 * Kata data access layer
 */
const assert = require("assert");
const initDbConnection = require('../utils/mongoConnection');

const addNewKata = async (kata) => {
    try {
        // Add extra fields to kata
        kata.answers = [];
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
        let allKatas = await connection.findAll('katas');
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
        let allKatas = await connection.findAll('katas');
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

const test = async () => {
    const connection = await initDbConnection();
    const katas = await connection.findAll('katas');
    connection.closeConnection();

    return katas;
}

module.exports = {
    addNewKata,
    getPagedKatas,
    searchKatas,
    updateKata,
    test,
    parseKataTestOutput
}