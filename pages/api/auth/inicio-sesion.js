import { Funcionario } from "../../../entities";

export default async function InicioSesion(req, res) {
  if (req.method === "POST") {
    try {
      const { correo, contrasena } = req.body;
    if (correo && contrasena) {
      
      const funcionario = await Funcionario.findOne({
        where: {
          correo
        }
      });

      if (!funcionario) {
        return res.status(404).json({
          ok: false,
          message: "No se encontro el usuario"
        });
      }

      if (funcionario.contrasena !== contrasena) {
        return res.status(401).json({
          ok: false,
          message: "La contraseña es incorrecta"
        });
      }

      return res.status(200).json({
        ok: true,
        data: funcionario
      });
    } else {
      res.status(400).json({
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