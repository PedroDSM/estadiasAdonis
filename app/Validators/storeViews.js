'use strict'

class storeViews {
  get rules () {
    return {
        nombre: "required",
        icono: "required",
        nivel: "required",
        categorias:"required",
        ruta:"required"
    }
  }
  get messages () {
    return {
        'nombre.required': 'You must to provide a Category name',
        'icono.required': 'You must provide a Icon.',
        'nivel.required': 'You must provide a Level.',
        'categoria.required': 'You must provide a Category_ID.',
        'ruta.required': 'You must provide a Route.',
    }
  }
}

module.exports = storeViews
