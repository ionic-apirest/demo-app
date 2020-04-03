import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarcasPage } from './marcas.page';

const routes: Routes = [
  {
    path: '',
    component: MarcasPage
  },
  {
    path: 'detalle',
    loadChildren: () => import('../marcas/detalle/detalle.module').then( m => m.DetallePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarcasPageRoutingModule {}
