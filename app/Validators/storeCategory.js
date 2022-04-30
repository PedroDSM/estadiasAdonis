'use strict'

class storeCategory {
  get rules () {
    return {
        nombre: "required",
        icono: "required",
        nivel: "required",
  
    }
  }
  get messages () {
    return {
        'nombre.required': 'You must to provide a Category name',
        'icono.required': 'You must provide a Icon.',
        'nivel.required': 'You must provide a Level.',
    }
  }
}

module.exports = storeCategory
