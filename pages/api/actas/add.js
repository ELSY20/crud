import { Acta, Funcionario } from "../../../entities";

export default async function Agregar(req, res) {
  if (req.method === "POST") {
    try {
      const { area, tema, descripcion, responsabilidades, funcionario } = req.body;                  
      if (area && tema && descripcion && responsabilidades && funcionario) {
        const acta = {
          idarea: area,
          tema,
          descripcion,
          responsabilidades,
          idfuncionario: funcionario
        }

        const actaBD = await Acta.create(acta);

        if(!actaBD) {
          res.status(400).json({
            ok: false,
            message: "No se pudo crear el usuario"
          })
        }

        return res.status(200).json({
          ok: true,
          data: actaBD,
          message: "Acta creada"
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