'use strict'

const User = use('App/Models/User')
const { validateAll } = use('Validator')

const storeUser = use('App/Validators/storeUser')
const validaciones = new storeUser()


class UserController {

    async index ({request, response}){

        const users = await User.all()
        return response.status(200).send({
            usuario: users,
        })
         
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
                message:"Ha Ocurrido Un Error"
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

            let accesToken = await auth.generate(user)
            return response.status(201).send({
                usuario: user,
                message:"Usuario Creado Correctamente",
                access_token: accesToken
            })}catch (e) {
                return response.status(400).send({
                    message:"Ha Ocurrido Un Error"
                })}
        
    }

    async destroy ({ params, request, response}){
       const user =  await User.find(params.id)
       await user.delete()
        return response.status(200).send({
            message:"Usuario Eliminado Correctamente"
        })
    }
    async login ({ request, auth, response}) {
        const email = request.input("email")
        const password = request.input("password");
        try {
            if (await auth.attempt(email,password)){
                let user = await User.findBy('email', email)
                let accesToken = await auth.generate(user)
                return response.status(200).send({"message":"Logueado Exitosamente", "user":user, "access_token": accesToken})
            }
        } catch (e) {
            return response.status(400).send({
                Fail:"Email o Password Equivocados"
            })
        }
    }
}

module.exports = UserController
