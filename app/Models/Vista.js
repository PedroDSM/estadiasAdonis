'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Vista extends Model {
    static get table () {
        return 'vistas'
      }

      static get store(){
        return[
        'nombre', 
        'icono' , 
        'nivel', 
        'categorias',
        'ruta', 
        'status'
      ]
    }
    roles() {
      return this.belongsToMany('App/Models/Rol')
      .pivotTable('vista_roles')
    }
    categoria () {
      return this.belongsTo('App/Models/Categoria', 'categorias', 'id')
    }
  
}

module.exports = Vista
