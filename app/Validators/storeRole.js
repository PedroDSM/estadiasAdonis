'use strict'

class storeRole {
  get rules () {
    return {
      nombre: 'required'
    }
  }
  get messages () {
    return {
        'nombre.required': 'You must to provide a Rol name'
    }
  }
}

module.exports = storeRole
