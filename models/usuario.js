// se va encargar de manejar el modelo de los datos


const unique_validator = require('mongoose-unique-validator');
/**
 * const uniqeu_validator = require('mongoose-unique-validator');
 * Da una mejor covertura al error de usuario con una propiedad repetida
 */
const mongoose = require('mongoose');

// user validos para la aplicación
let roles_validos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} NO ES UN ROL VALIDO' // {VALUE} va a tomar el role que el usuario digito 
}


let Schema = mongoose.Schema;

// se define un esquema
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'la contraseña es necesaria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: roles_validos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});
/**
 * Con usuarioSchema.methods.toJSON = function()
 * me mongoose me permite modificar los metodos, y la data
 * que hay en el registro
 */
usuarioSchema.methods.toJSON = function() {
    let user = this; // aqui hago que la variable consiga la info del usuario
    let userObject = user.toObject();
    delete userObject.password; // aqui borro el campo password de la salida
    return userObject;
}
usuarioSchema.plugin(unique_validator, {
    message: '{PATH} debe de ser unico'
        /**
           con este {PATH} le indico a mongoose que busque el campo que esta
           unique y lo imprima como un mensaje
        */
});
module.exports = mongoose.model('usuario', usuarioSchema); // usuario se puede cambiar aqui se le da un nombre cualquiera