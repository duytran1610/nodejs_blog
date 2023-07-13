const {sequelize} = require('../../config/db');
const Course = require('./course');
const User = require('./user');


// create 1:M link between User and Course
User.hasMany(Course, {
    foreignKey: {
        name: 'userID'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'   
})


// dbSync() for using await
async function dbSync() {
    try {
        // Sync database with option alter
        await sequelize.sync({ alter: true });
    
        console.log('Database synchronized successfully!!!');  
  
    } catch (error) {
        console.error('Database synchronization error:', error);
    }
  }

// Call dbSync() to start the synchronization process
dbSync();


module.exports = {
    Course, User
}