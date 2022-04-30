'use strict'
const Vista = use('App/Models/Vista')
const { validateAll } = use('Validator')

const storeViews = use('App/Validators/storeViews')
const validaciones = new storeViews()


class VistaController {

    async index ({response}){

        const vistas = await Vista.query()
        .with('categoria')
        .fetch()
        return response.status(200).send({
            Vistas: vistas,
        })
    }

    async view({response, params}){
        const vis =  await Vista.find(params.id)
        if( vis == null){
            return response.status(400).send({
                message: "Vista No Encontrada",
            })
        }else{
            return response.status(200).send({
                view: vis,
            })
        }      
    }

    async store ({ request, response}){
        try{
            const valid = await validateAll( request.only(Vista.store), validaciones.rules, validaciones.messages)
            if(valid.fails()){
                return response.status(401).send({message:valid.messages()})
            }

            const vistadata = request.only(Vista.store)

            await Vista.create(vistadata)
            return response.status(201).send({
                Vista: vistadata,
                message:"Vista Creada Correctamente",
            })
        }catch{
            return response.status(401).send({
                message:"Vista No Creada",
            })
        }
        
    }

    async update({ params, request, response }){
        const vistadata = request.only(Vista.store)
        let vista =  await Vista.find(params.id)
        try {
        categoria.merge(vistadata)
        await vista.save()

        return response.status(201).send({
            vista: vista,
            message:"Vista Modificada Correctamente"
        })}catch (e) {
            return response.status(401).send({
                Fail:"Ha Ocurrido Un Error"
            })}
    }

    async destroy({params, response}) {
        try {
          const vis =  await Vista.findOrFail(params.id)
          let mensaje = ""
          if(vis.status){ mensaje = "Status InActivo" }
          if(!vis.status){ mensaje = "Status Activo" }
          vis.status = !vis.status 
          await vis.save()
          return response.status(200).send({
            vista: vis,
            mensaje:mensaje
          })
          }catch (e) {
            return response.status(401).send({
                Fail:"No Se Logro Cambiar El Status",
                error: e.code})
      }
    }
}

module.exports = VistaController
