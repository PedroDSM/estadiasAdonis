'use strict'
const Rol = use('App/Models/Rol')
const { validateAll } = use('Validator')

const storeRole = use('App/Validators/storeRole')
const validaciones = new storeRole()

class RoleController {
    
    async index ({response}){

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
        try{
            const valid = await validateAll( request.only(Rol.store), validaciones.rules, validaciones.messages)
            if(valid.fails()){
                return response.status(401).send({message:valid.messages()})
            }

            const roladata = request.only(Rol.store)

            await Rol.create(roladata)
            return response.status(201).send({
                Roles: roladata,
                message:"Rol Creado Correctamente",
            })
        }catch(e){
            return response.status(401).send({
                message:"Rol No Creado",
                error:e
            })
        }
      
    }

    async destroy({params, response}) {
        try {
          const US =  await Rol.findOrFail(params.id)
          let mensaje = ""
          if(US.status){ mensaje = "Status InActivo" }
          if(!US.status){ mensaje = "Status Activo" }
          US.status = !US.status 
          await US.save()
          return response.status(200).send({
            rol: US,
            mensaje:mensaje
          })
          }catch (e) {
            return response.status(400).send({
                Fail:"No Se Logro Cambiar El Status",
                error: e.code})
      }
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
