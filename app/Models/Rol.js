'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Rol extends Model {
    rol () {
        return this.hasOne('App/Models/Rol')
    }
    
}

module.exports = Rol
