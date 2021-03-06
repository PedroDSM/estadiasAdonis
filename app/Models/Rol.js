'use strict'

const { description } = require('@adonisjs/ace/lib/commander')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Rol extends Model {

    
    static get table () {
        return 'rols'
      }

    static get store(){
        return [
            'nombre',
            'descripcion',
            'status'
        ]
    }
    
    vistas() {
      return this.belongsToMany('App/Models/Vista')
      .pivotTable('vista_roles')
    }

    categorias () {
      return this.manyThrough('App/Models/Vista', 'categorias')
    }
  
  
}

module.exports = Rol
