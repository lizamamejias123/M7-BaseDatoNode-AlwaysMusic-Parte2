const {
    Pool
} = require('pg')

const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '123123123',
    port: 5432,
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000
}
const pool = new Pool(config)


const consulta = async (consulta) => {
    pool.connect(async (errorConexion, cliente, release) => {
        if (errorConexion) return errorConexion
        try {
            const res = await cliente.query(consulta)
            console.log(res.rows)
        } catch (error) {
            console.log(error.code)
        }
        release()
        pool.end()
    })
}
const agregar = async (datos) => {
    const objeto = {
        name: 'agregar-estudiante',
        rowMode: 'array',
        text: `INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *;`,
        values: datos
    }
    consulta(objeto)
}

const consultar = async () => {
    const objeto = {
        name: 'consultar-estudiantes',
        rowMode: 'array',
        text: 'SELECT * FROM estudiantes'
    }
    consulta(objeto)
}

const editar = async (datos) => { 
    const objeto = {
        name: 'editar-estudiante',
        rowMode: 'array',
        text: `UPDATE estudiantes SET rut = $2, curso = $3, nivel = $4 WHERE nombre = $1 RETURNING *;`,
        values: datos
    }
    consulta(objeto)
}

const consultarPorRut = async (datos) => {
    const objeto = {
        name: 'consultar-rut',
        rowMode: 'array',
        text: `SELECT * FROM estudiantes WHERE rut = $1`,
        values: datos
    }
    consulta(objeto)
}

const eliminar = (datos) => {
    const objeto = {
        name: 'eliminar-rut',
        rowMode: 'array',
        text: `DELETE FROM estudiantes WHERE rut = $1 RETURNING *;`,
        values: datos
    }
    consulta(objeto)
}

module.exports = {
    agregar,
    consultar,
    editar,
    consultarPorRut,
    eliminar
}