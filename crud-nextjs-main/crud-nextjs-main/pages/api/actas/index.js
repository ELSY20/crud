import { Acta, Area, Funcionario } from "../../../entities"

export default async function actas(req, res) {
  if (req.method === "GET") {
    try {
      const actas = await Acta.findAll({
        include: [
          {
            model: Funcionario,
            as: "funcionario",
            attributes: ["idfuncionario", "nombre", "apellido"]
          },
          {
            model: Area,
            as: "area",
            attributes: ["idarea", "nombre"]                        
          }
        ]
      })

      if (actas.length > 0) {
        res.status(200).json({
          ok: true,
          data: actas
        })
      } else {
        res.status(404).json({
          ok: false,
          message: "No hay actas"
        })
      }
    } catch (error) {
      res.status(500).json({
        ok: false,
        message: error.message
      })
    }
  } else {
    res.status(405).json({
      ok: false,
      message: "Method not allowed"
    })
  }
}