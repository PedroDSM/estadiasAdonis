'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VistasSchema extends Schema {
  up () {
    this.table('vistas', (table) => {
      table.integer('categorias' ).unsigned().references('id').inTable('categorias').after('nivel')
    })
  }

  down () {
    this.table('vistas', (table) => {
    })
  }
}

module.exports = VistasSchema
