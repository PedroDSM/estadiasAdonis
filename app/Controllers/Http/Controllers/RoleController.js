'use strict'
const Rol = use('App/Models/Rol')

class RoleController {
    
    async index ({request, response}){

        const roles = await Rol.all()
        return response.status(200).send({
            Roles: roles,
        })
    }
    async store ({ request, response}){
        const nombre = request.input('nombre')
        const descripcion = request.input('descripcion')

        const roles = new Rol()
        roles.nombre = nombre
        roles.descripcion = descripcion

        await roles.save()
        return response.status(201).send({
            Roles: roles,
            message:"Rol Creado Correctamente",
        })
    }

    async destroy ({ params, request, response}){
        const roles =  await Rol.find(params.id)
        await roles.delete()
         return response.status(200).send({
             message:"Rol Eliminado Correctamente"
         })
     }

     async update({ params, request, response }){
        const nombre = request.input('nombre')
        const descripcion = request.input('descripcion')

        let roles =  await Rol.find(params.id)

        roles.nombre = nombre
        roles.descripcion = descripcion

        await roles.save()
        return response.status(201).send({
            Roles: roles,
            message:"Rol Modificado Correctamente"
        })
    }

}

module.exports = RoleController
