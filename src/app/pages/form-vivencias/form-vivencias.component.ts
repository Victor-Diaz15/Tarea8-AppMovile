import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Vivencia } from 'src/app/interfaces/vivencia';
import { CrudStorageService } from 'src/app/services/crud-storage.service';

@Component({
  selector: 'app-form-vivencias',
  templateUrl: './form-vivencias.component.html',
  styleUrls: ['./form-vivencias.component.scss'],
})
export class FormVivenciasComponent  implements OnInit {

  data: Vivencia[] = [];

  constructor(private _crudService: CrudStorageService) { }

  ngOnInit() {
    this.getVivencias();
  }

  getVivencias() {
    this._crudService.getAll().then(data => {
      this.data = data;
      console.log("data", this.data);
    });
  }

  saveVivencia(form: NgForm){
    console.log("formulario", form);
    this._crudService.saveIdentity(form.value).then(rs => {
      form.reset();
      this.getVivencias();
      console.log("data", this.data);
    });
  }

}
