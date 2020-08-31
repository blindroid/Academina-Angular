import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'app/models/usuario.model';
import { AuthService } from 'app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    public usuario: UsuarioModel;
    @Output() emailUser: string;
    recordarme = false;

    test : Date = new Date();
    focus;
    focus1;

    constructor(private formBuilder: FormBuilder, private auth: AuthService,
        private router: Router) { }

    ngOnInit() {
        this.usuario =  new UsuarioModel();

        if ( localStorage.getItem('email') ) {
            this.usuario.email = localStorage.getItem('email');
            this.recordarme = true;
          }
    }

  login( form: NgForm ) {

    if (  form.invalid ) { return; }

    //Swal.fire({
     // allowOutsideClick: false,
     // type: 'info',
     // text: 'Espere por favor...'
    //});
    Swal.showLoading();


    this.auth.login( this.usuario )
      .subscribe( resp => {
        this.emailUser = this.usuario.email;
        console.log(resp);
        Swal.close();

        if ( this.recordarme ) {
          localStorage.setItem('email', this.usuario.email);
        }


        this.router.navigate(['/home', {}])
        

      }, (err) => {

        console.log(err.error.error.message);
        //Swal.fire({
        //  type: 'error',
        //  title: 'Error al autenticar',
        //  text: err.error.error.message
        //});
      });

  }
  
    public goToRegister() {
        this.router.navigate(['/register', {}]);
    }
}
