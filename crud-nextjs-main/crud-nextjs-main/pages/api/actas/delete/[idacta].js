import { Acta } from "../../../../entities";

export default async function Editar(req, res) {
  if (req.method === "DELETE") {
    try {
      
      const { idacta } = req.query;

      if (idacta) {

        const actaBD = Acta.destroy({
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
          message: "Acta eliminada"
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