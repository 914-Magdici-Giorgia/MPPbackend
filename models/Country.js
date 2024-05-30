import {DataTypes} from "sequelize";
import { sequelize } from './ModelSequelizer.js';

export const Country = sequelize.define("Country",{
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

    description:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        },
    }

});

export default Country;