'use strict'

const User = use('App/Models/User')
const { validateAll } = use('Validator')

const storeUser = use('App/Validators/storeUser')
const validaciones = new storeUser()


class UserController {

    async index ({response}){

        const users = await User.query()
        .with('rol')
        .fetch()
        return response.status(200).send({
            usuario: users,
        })
         
    }

    async show({auth, response}){
        try {
            const user = await auth.getUser()
            response.status(200).send({
                usuario:user
            })
          } catch (error) {
            response.status(400).send('Missing or invalid jwt token')
          }
    }

    async view({response, params}){
        const us =  await User.find(params.id)
        if( us == null){
            return response.status(400).send({
                message: "User No Encontrado",
            })
        }else{
            return response.status(200).send({
                user: us,
            })
        }      
    }

    async update({ params, request, response }){
        const userdata = request.only(User.store)
        let user =  await User.find(params.id)
        try {
        user.merge(userdata)
        await user.save()

        return response.status(201).send({
            usuario: user,
            message:"Usuario Modificado Correctamente"
        })}catch (e) {
            return response.status(400).send({
                Fail:"Ha Ocurrido Un Error"
            })}
    }

    async store ({ request, response, auth }){
        try{
        const valid = await validateAll( request.only(User.store), validaciones.rules, validaciones.messages)
        if(valid.fails()){
            return response.status(401).send({message:valid.messages()})
        }
        const userdata = request.only(User.store)
        const user = await User.create(userdata)

            let accesToken = await auth.withRefreshToken().generate(user)
            return response.status(201).send({"message":"Usuario Creado Exitosamente", "user":user, "token": accesToken
            })}catch (e) {
                return response.status(400).send({
                    Fail:"Ha Ocurrido Un Error"
                })}
        
    }

     async destroy({params, response}) {
        try {
          const US =  await User.findOrFail(params.id)
          let mensaje = ""
          if(US.status){ mensaje = "Status InActivo" }
          if(!US.status){ mensaje = "Status Activo" }
          US.status = !US.status 
          await US.save()
          return response.status(200).send({
            usuario: US,
            mensaje:mensaje
          })
          }catch (e) {
            return response.status(400).send({
                Fail:"No Se Logro Cambiar El Status",
                error: e.code})
      }
    }
    async login ({ request, auth, response}) {
        const userdata = request.only(User.login)

        let user = await User.findBy('email', userdata.email)
        let accesToken = await auth.withRefreshToken().generate(user)

        return response.status(200).send({"message":"Logueado Exitosamente", "user":user, "token": accesToken})

    }
    async logout({ auth, response }){
        const refreshToken = User.accesToken
       try {
        await auth
        .authenticator('jwt')
        .revokeTokens([refreshToken], true)
        return response.status(200).send({
            message:"Sesion Terminada"
        })
       } catch (e) {
        return response.status(400).send({
            Fail:"No Se Logro Cerrar Sesion",
            error: e.code
        })
       } 

    }
}

module.exports = UserController
