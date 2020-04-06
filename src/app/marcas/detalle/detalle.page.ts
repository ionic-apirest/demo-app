import { Component, OnInit, Input } from '@angular/core';
import { MarcasService } from '../marcas.service';
import { MarcasRestControllerService } from '../../api/marcasRestController.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Marcas } from '../../model/marcas';
import { AlertController } from "@ionic/angular";


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

    marcas: Marcas[] = [];
  //  rows: Marcas[] = [];
  public rows: { id: number; nombre: string; numeroserie: string; fecharegistro: string; foto: string; }[]

  constructor(private marcasService: MarcasService,
    private marcasControlerService: MarcasRestControllerService,
    private router: Router,
    private alertCrtrl: AlertController,
    private activatedRoute: ActivatedRoute) {

    }
    errores: string[];



  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
      //  this.marcasService.getMarca(id).subscribe((marcas) => this.marcas = marcas);
        this.marcasControlerService.showUsingGET(id).subscribe((marcas) => this.marcas = marcas);
      }
    });


  }

  cargarMarca(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
      //  this.marcasService.getMarca(id).subscribe((marcas) => this.marcas = marcas);
        this.marcasControlerService.showUsingGET(id).subscribe((marcas) => this.marcas = marcas);
      }
    })
  }
 

  async deleteMarca() {

    const alertElement = await this.alertCrtrl.create({
      header: "Esta seguro de eliminar el registro?...",
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Delete',
        handler: () => {
        //  this.marcasService.delete(this.marcas.id).subscribe((marcas) => this.marcas = marcas);
          this.marcasControlerService.deleteUsingDELETE(this.marcas.id).subscribe((marcas) => this.marcas = marcas);
          this.router.navigate(['/marcas'])
        }
      }
    ]
    });
    await alertElement.present();
  }


  update(): void {
    console.log(this.marcas)
  //  this.marcasService.update(this.marcas)
/*
  this.marcasControlerService.updateUsingPUT(this.marcas.id, this.marcas)
      .subscribe(
        json => {
          this.router.navigate(['/marcas']);
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  */
 //Update item by taking id and updated data object
 this.marcasControlerService.updateUsingPUT(this.marcas.id, this.marcas).subscribe(response => {
  this.router.navigate(['/marcas']);
})

    }


  create(): void {
    console.log(this.marcas)
  //  this.marcasService.create(this.marcas)
  //  var test: Marcas = this.marcas
  //  this.marcas.push(test);
    let myArray = [];  
    myArray.push(this.marcas);

  
    this.marcasControlerService.createUsingPOST( {nombre:"hector", numero_serie: "1233", fechaRegistro: "2020-01-01", foto: ""} )

//      this.marcasControlerService.createUsingPOST(this.marcas)
      .subscribe(
        marcas => {
          this.router.navigate(['/marcas']);
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
    
  }

}
