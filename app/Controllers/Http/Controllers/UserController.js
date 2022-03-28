'use strict'

const User = use('App/Models/User')

class UserController {

    async index ({request, response}){

        const users = await User.all()
        return response.status(200).send({
            usuario: users,
        })
         
    }

    async update({ params, request, response }){
        const nombre = request.input('nombre')
        const roles_id = request.input('roles_id')
        const email = request.input('email')
        const password = request.input('password')

        let user =  await User.find(params.id)

        user.nombre = nombre
        user.roles_id = roles_id
        user.email = email
        user.password = password

        await user.save()
        return response.status(201).send({
            usuario: user,
            message:"Usuario Modificado Correctamente"
        })
    }

    async store ({ request, response, auth }){
        const nombre = request.input('nombre')
        const roles_id = request.input('roles_id')
        const email = request.input('email')
        const password = request.input('password')

        const user = new User()
        user.nombre = nombre
        user.roles_id = roles_id
        user.email = email
        user.password = password

        await user.save()
        let accesToken = await auth.generate(user)
        return response.status(201).send({
            usuario: user,
            message:"Usuario Creado Correctamente",
            access_token: accesToken
        })
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
                return response.json({"message":"Logueado Exitosamente", "user":user, "access_token": accesToken})
            }
        } catch (e) {
            return response.status(500).send({
                message:"Necesitas Registrarte"
            })
        }
    }
}

module.exports = UserController
