// const {Client} = require('pg');
 
// const client = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'courses',
//   password: '16102001',
//   port: 5432,
// })

// async function connect() {
//     try {
//         await client.connect();
//         console.log('Connect successfully!!!');
//     }
//     catch(error) {
//         console.log('Connect failure!!!');
//     }
// }

// async function createTableCourse() {
//     const query = `
//         CREATE TABLE IF NOT EXISTS courses (
//             _id SERIAL,
//             name VARCHAR(200) NOT NULL,
//             description TEXT,
//             videoID VARCHAR(200) NOT NULL,
//             level VARCHAR(20) NOT NULL,
//             slug VARCHAR(200) NOT NULL UNIQUE,
//             createdAt TIMESTAMP DEFAULT NOW(),
//             updatedAt TIMESTAMP DEFAULT NOW(),
//             deleted VARCHAR(10) DEFAULT false,
//             deletedAt TIMESTAMP,
//             PRIMARY KEY (_id)
//         );`;
//     try {
//         await client.query(query);
//         console.log("Create table success!");
//     }
//     catch (err) {
//         console.log("Errol create table!");
//     }
// }

// module.exports = {connect, createTableCourse, client};

const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('courses', process.env.USER, process.env.PASSWORD, {
    dialect: 'postgres',
    port: 5432,
    pool: {
        max: 5,                   // Số lượng kết nối tối đa
        min: 0,                   // Số lượng kết nối tối thiểu
        acquire: 1000,           // Thời gian chờ tối đa (milliseconds)
        idle: 10000               // Thời gian giữ kết nối (milliseconds)
    }
});

function connect() {
    sequelize.authenticate()
            .then(() => console.log('Connect successfully!!!'))
            .catch((err) => console.log('Connect failure!!!'));
}

module.exports = {connect, sequelize}