import { Sequelize } from 'sequelize';

const DATABASE = process.env.DB_NAME;
const USERNAME = process.env.DB_USER;
const PASSWORD = process.env.DB_PASS;
const PORT = process.env.DB_PORT;
const HOST = process.env.DB_HOST;
const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  logging: false,
})

;(()=>{
  sequelize.authenticate()
    .then(() => {
      console.log('La conexion a la base de datos se ha realizado correctamente')
    }).catch(err => {
      console.log('Error al conectar a la base de datos: ', err)
    }
  )  
})()

// Se exporta la conexion a la BD
export default sequelize;