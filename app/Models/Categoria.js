'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Categoria extends Model {
    static get table () {
        return 'categorias'
      }

      static get store(){
        return[
        'nombre', 
        'icono' , 
        'nivel', 
        'status'
      ]
    }
    
    vistas () {
      return this.hasMany('App/Models/Vista', 'id','categorias')
    }
}

module.exports = Categoria
