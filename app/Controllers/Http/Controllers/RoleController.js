'use strict'
const Rol = use('App/Models/Rol')

class RoleController {
    
    async index ({request, response}){

        const roles = await Rol.all()
        return response.status(200).send({
            Roles: roles,
        })
    }
    async show({response, params}){
        const rol =  await Rol.find(params.id)
        if( rol == null){
            return response.status(400).send({
                message: "Rol No Encontrado",
            })
        }else{
            return response.status(200).send({
                Roles: rol,
            })
        }      
    }
    async store ({ request, response}){

        const roladata = request.only(Rol.store)

        await Rol.create(roladata)
        // const roles = new Rol()
        // roles.nombre = nombre
        // roles.descripcion = descripcion

        // await roles.save()
        return response.status(201).send({
            Roles: roladata,
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
        const roladata = request.only(Rol.store)

        let roles =  await Rol.find(params.id)

        roles.merge(roladata)
        await roles.save()
        return response.status(201).send({
            Roles: roles,
            message:"Rol Modificado Correctamente"
        })
    }

}

module.exports = RoleController
