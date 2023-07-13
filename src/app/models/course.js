const {DataTypes, Model} = require('sequelize');
const {sequelize} = require('../../config/db');
const SequelizeSlugify = require('sequelize-slugify');

class Course extends Model {
    // function for check and sort
    // C1:
    // static Sortable(req, condition){
    //     if (req.query.hasOwnProperty('_sort')){
    //         let isValidType = ['asc', 'desc'].includes(req.query.type);
    //         let column = req.query.column;
    //         let type = isValidType? req.query.type: 'asc';
    //         let query = Object.assign({}, condition, {order: [[column, type]]});
    //         return this.findAll(query);
    //     }
    //     return this.findAll(condition);
    // }

    // C2:
    static Sortable(req, condition){
        if (req.query.hasOwnProperty('_sort')){
            let isValidType = ['asc', 'desc'].includes(req.query.type);
            let column = req.query.column;
            let type = isValidType? req.query.type: 'asc';
            let query = `SELECT * FROM courses WHERE ${condition} ORDER BY "${column}" ${type}`;
            return sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT
            });
        }

        let query = `SELECT * FROM courses WHERE ${condition}`;
        return sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });
    }

    // function for calculate the number of records that satisfy the condition
    static Count(condition){
        let query = `SELECT COUNT(*) FROM courses WHERE ${condition}`;
        return sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });
    }
}

Course.init({
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING(100)},
    image: {type: DataTypes.STRING(200)},
    description: {type: DataTypes.TEXT},
    videoID: {type: DataTypes.STRING(100)},
    level: {type: DataTypes.STRING(100)},
    slug: {type: DataTypes.STRING(200), unique: true},
}, {
    sequelize, 
    modelName: 'course',
    paranoid: true,
    timestamps: true,
})

// Add slug to Course
SequelizeSlugify.slugifyModel(Course, {
    source: ['name']
});

//sequelize.sync({ alter: true });

module.exports = Course;