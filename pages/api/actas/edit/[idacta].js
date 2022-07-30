import { Acta } from "../../../../entities";

export default async function Editar(req, res) {
  if (req.method === "PUT") {
    try {
      const { idarea, tema, descripcion, responsabilidades } = req.body;
      const { idacta } = req.query;
      
      if (idarea && tema && descripcion && responsabilidades) {
        const acta = {
          idarea,
          tema,
          descripcion,
          responsabilidades,
        }

        const actaBD = Acta.update(acta, {
          where: {
            idacta
          }
        });

        if (!actaBD) {
          res.status(400).json({
            ok: false,
            message: "No se pudo actualizar el acta"
          })
        }

        return res.status(200).json({
          ok: true,
          data: actaBD,
          message: "Acta actualizada"
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