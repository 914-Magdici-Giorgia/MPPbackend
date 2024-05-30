import  Sequelize, {DataTypes} from 'sequelize';
import { sequelize } from './ModelSequelizer.js';
export const User = sequelize.define("User",{
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty:true
            },
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty:true
            },

        },
        password:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty:true
            },
        },
        token:{
            type: DataTypes.STRING,
            allowNull:true
        }
    }
)

