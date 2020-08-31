import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Comentarios } from 'app/models/comentarios.model';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ComentariosService } from 'app/services/comentarios.service';
import { SimpleChanges } from '@angular/core';
import { timer } from 'rxjs/internal/observable/timer';

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.component.html',
  styleUrls: ['./comunidad.component.scss']
})
export class ComunidadComponent implements OnInit {
  comentario: Comentarios;
  emailUser: string;
  comentarios: Comentarios[] = [];

  constructor(private comentarioService: ComentariosService) { }

  ngOnInit(): void {
    console.log('En comentarios');
    this.comentario = new Comentarios();
    this.comentario.statusLectura = false;
    this.emailUser = localStorage.getItem('email');
  
    this.comentarioService.getComentarios()
      .subscribe( resp => {
        this.comentarios = resp;
        //this.cargando = false;
      });

  }


  onSubmit( form: NgForm ) {
    console.log('Formulario de comentarios');
    if ( form.invalid ) {
      console.log('Formulario no válido');
      return; }
  
    let timerInterval;
    Swal.fire({
      title: 'Auto close alert!',
      html: 'I will close in <b></b> milliseconds.',
      timer: 500,
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
          const content = Swal.getContent()
          if (content) {
            const b = content.querySelector('b')
            if (b) {
              b.textContent = Swal.getTimerLeft().toString();
            }
          }
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    });
      Swal.showLoading();
  
      let peticion: Observable<any>;
  
      if ( this.comentario.uid ) {
        peticion = this.comentarioService.actualizarComentario( this.comentario );
      } else {
        peticion = this.comentarioService.crearComentario( this.comentario );
      }
  
      peticion.subscribe( resp => {
      console.log(resp);
      Swal.fire({
        //position: 'top-end',
        icon: 'success',
        title: 'Mensaje guardado.',
        showConfirmButton: false,
        timer: 1000
      });
       Swal.hideLoading();
      });

  }

  actualizar(com: Comentarios){
    com.statusLectura = true;
    console.log(com);
   this.comentarioService.actualizarComentario( com ).subscribe();

   const contador = timer(500);
        contador.subscribe((n) => {
          this.comentarioService.getComentarios()
          .subscribe( resp => {
            this.comentarios = resp;
          });
            });
  }


  eliminar(uid: string){
    console.log(uid);


    Swal.fire({
      title: 'Estas seguro?',
      text: "Estas seguro de querer eliminar el comentario!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if ( result.value ) {
        //this.comentarioService.splice(uid, 1);
        this.comentarioService.borrarComentario( uid ).subscribe();

        const contador = timer(500);
        contador.subscribe((n) => {
          this.comentarioService.getComentarios()
          .subscribe( resp => {
            this.comentarios = resp;
          });
            });
      }
    })
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.comentarioService.getComentarios()
        .subscribe( resp => {
          this.comentarios = resp;
        });
  }

}
