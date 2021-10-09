const {consultar, agregar, editar, consultarPorRut, eliminar} = require('./modulos')

const [accion, ...datos] = process.argv.slice(2)
console.log(accion, datos)

const acciones = {
    consulta: consultar,
    nuevo: agregar,
    editar: editar,
    rut: consultarPorRut,
    eliminar: eliminar
}

if (acciones[accion]){
    if (datos.length == 0){
        acciones[accion]()
    }
    else{
        acciones[accion](datos)
    }
}
else{
    console.log("NO VALIDO")
}