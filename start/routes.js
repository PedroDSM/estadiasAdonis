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
  Route.get('/roles', 'Controllers/RoleController.index');
  Route.get('/rol/:id', 'Controllers/RoleController.show');
  Route.post('/rol', 'Controllers/RoleController.store');
  Route.put('/rol/:id', 'Controllers/RoleController.update');
  Route.delete('/rol/:id', 'Controllers/RoleController.destroy');
}).prefix('Roles')

Route.group(()=>{
  Route.get('/users', 'Controllers/UserController.index');
  Route.get('/user', 'Controllers/UserController.show');
  Route.get('/user/:id', 'Controllers/UserController.view');
  Route.put('/user/:id', 'Controllers/UserController.update');
  Route.delete('/user/:id', 'Controllers/UserController.destroy');
  Route.get('logout', 'Controllers/UserController.logout');
}).middleware('auth').prefix('Users')

