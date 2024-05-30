import  Sequelize, {DataTypes} from 'sequelize';
import { sequelize } from './ModelSequelizer.js';

export const Mill = sequelize.define("Mill",{
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
    year:{
        type:DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty:true
        },

    },
    type:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        },

    },
    place:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        },
    },
    countryId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }


});
export default Mill;