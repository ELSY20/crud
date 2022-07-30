import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Funcionario = sequelize.define('funcionarios', {
  idfuncionario: {
    type: DataTypes.INTEGER(12),
    allowNull: false,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    },
    allowNull: false,
  },
  contrasena: {
    type: DataTypes.STRING(100),
    allowNull: false,
  }
}, {
  timestamps: false,
  freezeTableName: true
});

export default Funcionario;