const {DataTypes, Model} = require('sequelize');
const {sequelize} = require('../../config/db');

class User extends Model {
    static TellError(req, res) {
        let name = req.body.user_name;
        let account = req.body.account;
        let pass = req.body.password;
        let confpass = req.body.confirm_password;
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/; // Regex check email
        const phoneNumberRegex = /^\d{6,11}$/; // Regex check number phone
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+-=])[A-Za-z\d!@#$%^&*()_+-=]{8,}$/
        let checkInputAccount = emailRegex.test(account) || phoneNumberRegex.test(account);
        let checkInputPassword = passwordRegex.test(pass);
        let checkConfirm = pass === confpass;

        Object.assign(res.locals.errol, {
            name: name? null : 'User need name',
            account: checkInputAccount? null : 'Account must be either an email or a phone number!',
            password: checkInputPassword? 
                     null : 'Password must contain at least 8 characters, including at least 1 uppercase character, 1 number and 1 special character!', 
            confirm: checkConfirm? null : 'Confirm password errol!' 
        })

        return !(name && checkInputAccount && checkInputPassword && checkConfirm);
    }
}

User.init({
    userID: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    encodeID: {
        type: DataTypes.STRING(100), unique: true,
        set(value) {
            let encode_id = `${value}-${this.getDataValue('account')}`;
            this.setDataValue('encodeID', encode_id);
        }
    },
    user_name: {type: DataTypes.STRING(100), allowNull: false},
    account: {
        type: DataTypes.STRING(200), unique: true, allowNull: false,
        validate: {
            isEmailOrPhoneNumber(value) {
                const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/; // Regex check email
                const phoneNumberRegex = /^\d{6,11}$/; // Regex check number phone
        
                if (!emailRegex.test(value) && !phoneNumberRegex.test(value)) {
                   // res.locals.errol.password = 'Account must be either an email or a phone number';
                    throw new Error('Account must be either an email or a phone number!');
                }
              }
        }
    },
    password: {type: DataTypes.TEXT, allowNull: false},
    //refreshToken: {type: DataTypes.TEXT, allowNull: true}

}, {
    sequelize, 
    timestamps: false,
    modelName: 'user',
})

//sequelize.sync({ alter: true });

module.exports = User;