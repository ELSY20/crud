import { Area} from "../../entities"

export default async function areas(req, res) {
  if (req.method === "GET") {
    try {
      const areas = await Area.findAll({
        attributes: ["idarea", "nombre"]
      })

      if (areas.length > 0) {
        res.status(200).json({
          ok: true,
          data: areas
        })
      } else {
        res.status(404).json({
          ok: false,
          message: "No hay areas"
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