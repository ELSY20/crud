import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Area = sequelize.define('areas', {
  idarea: {
    type: DataTypes.INTEGER(12),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  timestamps: false,
  freezeTableName: true
});

export default Area;