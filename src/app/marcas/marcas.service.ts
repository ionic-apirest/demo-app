import { Injectable } from "@angular/core";
import { URL_BACKEND } from "../config/config";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { Marcas } from "../model/marcas";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class MarcasService {
  private urlEndPoint: string = URL_BACKEND + "/api/marcas";

  private httpHeaders = new HttpHeaders({ "Content-type": "application/json" });

  constructor(private http: HttpClient, private router: Router) {}

  getMarcas(): Observable<Marcas[]> {
    return this.http
      .get(this.urlEndPoint)
      .pipe(map(response => response as Marcas[]));
  }

  getMarca(id): Observable<Marcas> {
    return this.http.get<Marcas>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/marcas']);
        console.error(e.error.mensaje);
      //  Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Marcas> {
    return this.http.delete<Marcas>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje)
        return throwError(e)
      })
    )
  }

  update(marcas: Marcas): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${marcas.id}`, marcas, { headers: this.httpHeaders }).pipe(
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }

  create(marcas: Marcas): Observable<any> {
    return this.http.post(this.urlEndPoint, marcas, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.marcas as Marcas),
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }

}
