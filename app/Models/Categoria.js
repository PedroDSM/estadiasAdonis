'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Categoria extends Model {
    static get table () {
        return 'categorias'
      }
}

module.exports = Categoria
