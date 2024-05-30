import { sequelize } from './ModelSequelizer.js';
import Country from './Country.js';
import Mill from './Mill.js';

Country.hasMany(Mill);
Mill.belongsTo(Country);

export { Country, Mill };