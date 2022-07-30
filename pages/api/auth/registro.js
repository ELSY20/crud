import { Funcionario } from "../../../entities";

export default async function Registro(req, res) {
  if (req.method === "POST") {
    try {
      const { id, nombre, apellido, correo, contrasena, contrasena2 } = req.body;
      if(contrasena !== contrasena2) {
        res.status(400).json({
          ok: false,
          message: "Las contraseñas no coinciden"
        })
      }
      
      if (id && nombre && apellido && correo && contrasena) {
        const user = {
          idfuncionario: id,
          nombre,
          apellido,
          correo,
          contrasena
        }

        const funcionario = await Funcionario.create(user);

        if(!funcionario) {
          res.status(400).json({
            ok: false,
            message: "No se pudo crear el usuario"
          })
        }

        return res.status(200).json({
          ok: true,
          data: funcionario
        })

      } else {
        return res.status(400).json({
          ok: false,
          message: "Faltan datos"
        })
      }

    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message
      })
    }
  } else {
    return res.status(405).json({
      ok: false,
      message: "Method not allowed"
    })
  }
}