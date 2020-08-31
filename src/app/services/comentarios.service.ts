import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { Comentarios } from 'app/models/comentarios.model';


@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private url = 'https://academia-angular-5d908.firebaseio.com';


  constructor( private http: HttpClient ) { }


  crearComentario( comentario: Comentarios ) {

    return this.http.post(`${ this.url }/comentarios.json`, comentario)
            .pipe(
              map( (resp: any) => {
                comentario.uid = resp.uid;
                return comentario;
              })
            );

  }

  actualizarComentario( comentario: Comentarios ) {

    let comentarioTemp: Comentarios;
    comentarioTemp = new Comentarios();
    comentarioTemp.email = comentario.email;
    comentarioTemp.nombre = comentario.nombre;
    comentarioTemp.mensaje = comentario.mensaje;
    comentarioTemp.statusLectura = comentario.statusLectura;

    return this.http.put(`${ this.url }/comentarios/${ comentario.uid }.json`, comentarioTemp);
    delete comentario.uid;

  }

  borrarComentario( uid: string ) {

    return this.http.delete(`${ this.url }/comentarios/${ uid }.json`);

  }


  getHeroe( uid: string ) {

    return this.http.get(`${ this.url }/comentarios/${ uid }.json`);

  }


  getComentarios() {
    return this.http.get(`${ this.url }/comentarios.json`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  private crearArreglo( comentariosObj: object ) {

    const comentarios: Comentarios[] = [];

    Object.keys( comentariosObj ).forEach( key => {

      const comentario: Comentarios = comentariosObj[key];
      comentario.uid = key;

      comentarios.push( comentario );
    });


    return comentarios;

  }


}
