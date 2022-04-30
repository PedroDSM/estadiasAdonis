'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VistaRolesSchema extends Schema {
  up () {
    this.create('vista_roles', (table) => {
      table.increments()
      table.integer('rol_id').unsigned().references('id').inTable('rols')
      table.integer('vista_id').unsigned().references('id').inTable('vistas')
      table.timestamps()
    })
  }

  down () {
    this.drop('vista_roles')
  }
}

module.exports = VistaRolesSchema
