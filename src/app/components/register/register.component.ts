import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'app/models/usuario.model';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public formGroup: FormGroup;
  public usuario: UsuarioModel;
  recordarme = false;

  constructor(private formBuilder: FormBuilder, private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.usuario =  new UsuarioModel();
    this.buildForm();
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
    email: ['', Validators.compose([
      Validators.required,
      Validators.email
  ])],
    nombre: ['',  Validators.compose([
      Validators.maxLength(50),
      Validators.pattern('[A-Za-z0-9]*'),
      Validators.required
  ])],
    password: ['',  Validators.compose([
      Validators.required
  ])]
  });
}



public getError(controlName: string): boolean {
  let error = false;
  const control = this.formGroup.get(controlName);
  if (control.touched && control.errors != null && control.status !== 'VALID') {
    // error = JSON.stringify(control.errors) + control.status;
    error = true;
  }
  return error;
}


onSubmit( form: NgForm ) {

  if ( form.invalid ) { return; }

 // Swal.fire({
 //   allowOutsideClick: false,
  //  type: 'info',
 //   text: 'Espere por favor...'
 // });
  Swal.showLoading();

  this.auth.nuevoUsuario( this.usuario )
    .subscribe( resp => {

      console.log(resp);
      Swal.close();

      if ( this.recordarme ) {
        localStorage.setItem('email', this.usuario.email);
      }

      Swal.fire({
        //position: 'top-end',
        icon: 'success',
        title: 'Usuario generado exitosamente!',
        showConfirmButton: false,
        timer: 2000
      });

      this.router.navigateByUrl('/home');

    }, (err) => {
      console.log(err.error.error.message);

    });
}

}
