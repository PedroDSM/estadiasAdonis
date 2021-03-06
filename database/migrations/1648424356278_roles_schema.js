'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RolesSchema extends Schema {
  up () {
    this.create('rols', (table) => {
      table.increments()
      table.string('nombre', 80).notNullable()
      table.string('descripcion', 150).notNullable()
      table.string('status',50).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('rols')
  }
}

module.exports = RolesSchema
