import { NgModule } from "@angular/core";
import { Routes, Router, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ServersComponent } from "./servers/servers.component";
import { ServerComponent } from "./servers/server/server.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthGuard } from "./auth-guard.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from "./servers/server-resolver.service";


const appRoutes: Routes  = [
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent }
    ] },
    { 
      path: 'servers', 
      // canActivate: [AuthGuard], 
      canActivateChild: [AuthGuard],
      component: ServersComponent, 
      children: [
      { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} }, //Esto mapea la data que nos devuelve el ServerResolver y lla guarda en la variable server
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] },
    ] },
    // { path: 'not-found', component: PageNotFoundComponent },
    { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
    { path: '**', redirectTo: '/not-found' }
  ]
  
@NgModule({
//no necesito agregar declarations porque los componentes ya están declarados en app module
    imports: [
        RouterModule.forRoot(appRoutes)
        // RouterModule.forRoot(appRoutes, {useHash: true}) 
        //Este hash le informa al server que no le preste atención a lo que está después del # porque es lo que usa Angular.
        //Se usa si no se puede "configurar" bien el routeo de Angurar con el server
    ],
    // le dice que si fuera a agregar este modulo a otro qué debería ser accesible
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}