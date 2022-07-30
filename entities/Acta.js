import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Acta = sequelize.define('actas', {
  idacta: {
    type: DataTypes.INTEGER(12),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  tema : {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  descripcion : {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  responsabilidades : {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  timestamps: true,
  freezeTableName: true
});

export default Acta;