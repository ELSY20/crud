import { Funcionario } from "../../entities"

export default function handler(req, res) {
  const funcionarios = Funcionario.findAll()
  res.status(200).json({
    status: "success",
    data: funcionarios
  })
}
