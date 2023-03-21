import { Component, Input, OnInit } from '@angular/core';
import { Vivencia } from 'src/app/interfaces/vivencia';
import { CrudStorageService } from 'src/app/services/crud-storage.service';

@Component({
  selector: 'app-list-vivencias',
  templateUrl: './list-vivencias.component.html',
  styleUrls: ['./list-vivencias.component.scss'],
  providers: [CrudStorageService]
})
export class ListVivenciasComponent  implements OnInit {

  @Input() listOfVivencias!: Vivencia[];

  constructor( private _crudStorage: CrudStorageService ) {
  }

  ngOnInit() {
  }

  clearData() {
    this._crudStorage.delete().then(_data => {
      this.listOfVivencias = [];
    })
  }

}
