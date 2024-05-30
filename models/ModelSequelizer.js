import {Sequelize, DataTypes} from 'sequelize';

export const sequelize = new Sequelize('millsdb','root','xsljqgyrn3pfw',{
    host:'localhost',
    dialect:'mysql',
    port: '3306'
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




