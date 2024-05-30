import {Sequelize, DataTypes} from 'sequelize';
import('dotenv').config();
export const sequelize = new Sequelize(process.env.DB_NAME,'root',process.env.DB_PASSWORD,{
    host:process.env.DB_HOST,
    dialect:'mysql',
    port: process.env.DB_PORT,
})

try {
    await sequelize.authenticate();
    console.log('Connection has been established succesfully.');


}catch(error){
    console.error('Unable to connect to the database:', error)
}

// sequelize.sync()
//     .then(() => console.log('Users table has been successfully created, if one doesn\'t exist'))
//     .catch(error => console.log('This error occured', error));




