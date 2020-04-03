import { Component, OnInit } from "@angular/core";
import { Marcas } from "../model/marcas";
import { MarcasService } from "../marcas/marcas.service";
import { MarcasRestControllerService } from '../api/marcasRestController.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-marcas",
  templateUrl: "./marcas.page.html",
  styleUrls: ["./marcas.page.scss"]
})
export class MarcasPage implements OnInit {
  public titulo: string = "Inicio";
  marcas: Marcas[];

  constructor(
//    private marcasService: MarcasService,
    public activatedRoute: ActivatedRoute,
    private marcasControlerService: MarcasRestControllerService
  ) {}

  ngOnInit() {
    this.marcasControlerService.indexUsingGET1().subscribe(marcas => (this.marcas = marcas));
  //  this.marcasService.getMarcas().subscribe(marcas => (this.marcas = marcas));
  }

  ionViewWillEnter() {
    //this.marcasService.getMarcas().subscribe(marcas => (this.marcas = marcas));
    this.marcasControlerService.indexUsingGET1().subscribe(marcas => (this.marcas = marcas));
    console.log("entre al willenter: ");
  }

  ionViewDidEnter() {
    //this.marcasService.getMarcas().subscribe(marcas => (this.marcas = marcas));
    this.marcasControlerService.indexUsingGET1().subscribe(marcas => (this.marcas = marcas));
    this.listadoMarcas()
    console.log("ionViewDidEnter");
  }


  private listadoMarcas() {
  //  this.marcasService.getMarcas().subscribe(marcas => (this.marcas = marcas));
  }
}
