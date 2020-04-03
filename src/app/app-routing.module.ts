import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'marcas', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'marcas',
    loadChildren: () => import('./marcas/marcas.module').then( m => m.MarcasPageModule)
  },
  {
    path: 'marcas/detalle/:id',
    loadChildren: () => import('./marcas/detalle/detalle.module').then( m => m.DetallePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
