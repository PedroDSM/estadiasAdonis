'use strict'

const { description } = require('@adonisjs/ace/lib/commander')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Rol extends Model {
    rol () {
        return this.hasOne('App/Models/Rol')
    }

    static get store(){
        return [
            'nombre',
            'descripcion',
            'status'
        ]
    }
}

module.exports = Rol
