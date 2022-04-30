'use strict'

const Rol = require("../../../Models/Rol")
const Vista = require("../../../Models/Vista")

const Categoria = use('App/Models/Categoria')
const { validateAll } = use('Validator')

const storeCategory = use('App/Validators/storeCategory')
const validaciones = new storeCategory()

class CategoriaController {

    async index ({response}){

        const categoria = await Categoria.all()
        return response.status(200).send({
            Categorias: categoria,
        })
    }

    async view({response, params}){
        const cat =  await Categoria.find(params.id)
        if( cat == null){
            return response.status(400).send({
                message: "Categoria No Encontrada",
            })
        }else{
            return response.status(200).send({
                categoria: cat,
            })
        }      
    }

    async store ({ request, response}){
        try{
            const valid = await validateAll( request.only(Categoria.store), validaciones.rules, validaciones.messages)
            if(valid.fails()){
                return response.status(401).send({message:valid.messages()})
            }

            const categoriadata = request.only(Categoria.store)

            await Categoria.create(categoriadata)
            return response.status(201).send({
                Categoria: categoriadata,
                message:"Categoria Creada Correctamente",
            })
        }catch{
            return response.status(401).send({
                message:"Categoria No Creada",
            })
        }
       
    }

    async update({ params, request, response }){
        const categoriadata = request.only(Categoria.store)
        let categoria =  await Categoria.find(params.id)
        try {
        categoria.merge(categoriadata)
        await categoria.save()

        return response.status(201).send({
            categoria: categoria,
            message:"Categoria Modificada Correctamente"
        })}catch (e) {
            return response.status(400).send({
                Fail:"Ha Ocurrido Un Error"
            })}
    }

    async destroy({params, response}) {
        try {
          const Cat =  await Categoria.findOrFail(params.id)
          let mensaje = ""
          if(Cat.status){ mensaje = "Status InActivo" }
          if(!Cat.status){ mensaje = "Status Activo" }
          Cat.status = !Cat.status 
          await Cat.save()
          return response.status(200).send({
            categoria: Cat,
            mensaje:mensaje
          })
          }catch (e) {
            return response.status(400).send({
                Fail:"No Se Logro Cambiar El Status",
                error: e.code})
      }
    }

    async vistas({response, auth}){
        try {
            const user = await auth.getUser()
            const Cat = await Categoria
            .query()
            .whereHas('vistas', (query) => {
              query.whereHas('roles', (builder) => {
                builder.where('rol_id', user.roles_id)
              })
            })
            .with('vistas', (query) => {
              query.whereHas('roles', (builder) => {
                builder.where('rol_id', user.roles_id)
                builder.where('vistas.status', 1)
                
              })
            })
            .where('status', 1)
            .fetch()

        return response.status(200).send({
            categoria:Cat
          })

        }catch(e){
            console.log(e)
            return response.status(401).send({
                Fail:"Fallo"
            })
        }

    }

    async AllVistas({response}){
        try {
            const Cat = await Categoria
            .query()
            .with('vistas', (query) => {
              query.whereHas('roles')
            })
            .with('vistas', (query) => {
              query.whereHas('roles', (builder) => {
                builder.where('vistas.status', 1)
              })
            })
             .where('status', 1)
            .fetch()

        return response.status(200).send({
            categoria:Cat
          })

        }catch(e){
            console.log(e)
            return response.status(401).send({
                Fail:"Fallo"
            })
        }
    }
}

module.exports = CategoriaController
