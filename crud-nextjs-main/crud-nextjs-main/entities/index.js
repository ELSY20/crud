// Se impoorta la conexion a la BD
import sequelize from "../config/database";

import Funcionario from "./Funcionario";
import Acta from "./Acta";
import Area from "./Area";

Funcionario.hasMany(Acta, {
  foreignKey: "idfuncionario",
  as: "funcionario",
  onDelete: "set null",
  onUpdate: "cascade"
});
Acta.belongsTo(Funcionario, { foreignKey: "idfuncionario" });

Area.hasMany(Acta, { 
  foreignKey: "idarea",
  as: "area",
  onDelete: "SET NULL",
  onUpdate: "CASCADE"
});

Acta.belongsTo(Area, { foreignKey: "idarea" });

; (async () => {
  try {
    
    await sequelize.sync({
      force: false
    })

    const funcionario = await Funcionario.findOne({
      where: {
        correo: "f@f.com"
      }
    })

    if (!funcionario) {
      await Funcionario.create({
        idfuncionario: 1,
        nombre: "Admin",
        apellido: "Admin",        
        correo: "f@f.com",
        contrasena: "123456"
      })
    }
    console.log("Sincronizado");
  } catch (error) {
    console.error({
      "error": "Error menor con mock iniciales",
      "sincronizado": "si... pero con error",
      "error_message": error
    });
  }
})();

export {
  Acta,
  Area,
  Funcionario,
};