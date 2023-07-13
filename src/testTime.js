const Sequelize = require('sequelize');
require('dotenv').config();

const testTimeExec = (app) => {
    app.get('/old', (req, res) => {
        let totalExec = 0;
        for (let i = 0; i < 10000; i++) {
            let pre_query = new Date().getTime();
            let sequelize = new Sequelize('courses', process.env.USER, process.env.PASSWORD, {
                dialect: 'postgres',
                port: 5432,
            });
            sequelize.query(`SELECT * FROM courses`, {type: sequelize.QueryTypes.SELECT});
            let post_query = new Date().getTime();
            let duration = (post_query - pre_query) / 1000;
            totalExec += duration;
    
            if (i === 9999) {
                const ave = totalExec / 10000;
                return res.send("Ave = " + ave);
            }
    
            sequelize.close();
        }
    })
    
    app.get('/pool', (req, res) => {
        let totalExec = 0;
        for (let i = 0; i < 10000; i++) {
            let pre_query = new Date().getTime();
            let sequelize = new Sequelize('courses', process.env.USER, process.env.PASSWORD, {
                dialect: 'postgres',
                port: 5432,
                pool: {
                    max: 10,
                    min: 0
                }
            });
            sequelize.query(`SELECT * FROM courses`, {type: sequelize.QueryTypes.SELECT});
            let post_query = new Date().getTime();
            let duration = (post_query - pre_query) / 1000;
            totalExec += duration;
    
            if (i === 9999) {
                const ave = totalExec / 10000;
                return res.send("Ave = " + ave);
            }
    
            sequelize.close();
        }
    })
}

module.exports = testTimeExec;