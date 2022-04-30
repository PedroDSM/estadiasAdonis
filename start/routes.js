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
}).prefix('Roles').middleware('auth')

Route.group(()=>{
  Route.get('/users', 'Controllers/UserController.index');
  Route.get('/user', 'Controllers/UserController.show');
  Route.get('/user/:id', 'Controllers/UserController.view');
  Route.put('/user/:id', 'Controllers/UserController.update');
  Route.delete('/user/:id', 'Controllers/UserController.destroy');
  Route.get('logout', 'Controllers/UserController.logout');
}).middleware('auth').prefix('Users')

Route.group(()=>{
  Route.get('/vistas', 'Controllers/VistaController.index');
  Route.get('/vista/:id', 'Controllers/VistaController.view');
  Route.post('/vista', 'Controllers/VistaController.store');
  Route.put('/vista/:id', 'Controllers/VistaController.update');
  Route.delete('/vista/:id', 'Controllers/VistaController.destroy');
}).prefix('Vistas').middleware('auth')

Route.group(()=>{
  Route.get('/categorias', 'Controllers/CategoriaController.index');
  Route.get('/categoria/:id', 'Controllers/CategoriaController.view');
  Route.post('/categoria', 'Controllers/CategoriaController.store');
  Route.put('/categoria/:id', 'Controllers/CategoriaController.update');
  Route.delete('/categoria/:id', 'Controllers/CategoriaController.destroy');
  Route.get('/categories', 'Controllers/CategoriaController.AllVistas');
  Route.get('/category', 'Controllers/CategoriaController.vistas');
}).prefix('Categorias').middleware('auth')

