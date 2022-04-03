'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
});
Route.post('/auth/register', 'Controllers/UserController.store');
Route.post('/auth/login', 'Controllers/UserController.login');

Route.group(()=>{
  Route.get('/rol', 'Controllers/RoleController.index');
  Route.post('/rol', 'Controllers/RoleController.store');
  Route.put('/rol/:id', 'Controllers/RoleController.update');
  Route.delete('/rol/:id', 'Controllers/RoleController.destroy');
}).prefix('Roles')

Route.group(()=>{
  Route.get('/user', 'Controllers/UserController.index');
  Route.put('/user/:id', 'Controllers/UserController.update');
  Route.delete('/user/:id', 'Controllers/UserController.destroy');
}).middleware('auth').prefix('Users')

