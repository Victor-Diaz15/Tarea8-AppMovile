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

  play(audio: string, type: string) {
    const audioRef = new Audio(`data:${type};base64,${audio}`)
    audioRef.oncanplaythrough = () => audioRef.play()
    audioRef.load()
  }

  convertPhotoFromBase64(base: string): string {
    return `data:png;base64,${base}`;
  }

  clearData() {
    this._crudStorage.delete().then(_data => {
      this.listOfVivencias = [];
    })
  }

}
