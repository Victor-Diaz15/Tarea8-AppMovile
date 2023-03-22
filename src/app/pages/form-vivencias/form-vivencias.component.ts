import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Vivencia } from 'src/app/interfaces/vivencia';
import { CrudStorageService } from 'src/app/services/crud-storage.service';
import { PhotoService } from 'src/app/services/photo.service';
import { VoiceRecorder, VoiceRecorderPlugin, RecordingData, GenericResponse, CurrentRecordingStatus } from 'capacitor-voice-recorder';
import { Filesystem, Directory } from '@capacitor/filesystem';

@Component({
  selector: 'app-form-vivencias',
  templateUrl: './form-vivencias.component.html',
  styleUrls: ['./form-vivencias.component.scss'],
})
export class FormVivenciasComponent  implements OnInit {

  data: Vivencia[] = [];
  image: string = "";
  private audio: string = "";
  private type: string = "";

  constructor(
    private _crudService: CrudStorageService,
    private _photoService: PhotoService
    ) { }

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
    form.value.audio = this.audio;
    form.value.type = this.type;
    form.value.image = this._photoService.imageUrl;
    this._crudService.saveIdentity(form.value).then(rs => {
      form.reset();
      this.image = "";
      this.getVivencias();
      console.log("data", this.data);
    });
  }

  recordAudio() {
    VoiceRecorder.canDeviceVoiceRecord()
      .then((result: GenericResponse) => {
        if (result.value) {
          VoiceRecorder.requestAudioRecordingPermission()
            .then((result: GenericResponse) => {
              if (result.value) {
                VoiceRecorder.hasAudioRecordingPermission().then((result: GenericResponse) => {
                    if (result.value) {
                      VoiceRecorder.startRecording()
                        .then((result: GenericResponse) => console.log(result.value))
                        .catch(error => console.log(error))
                    }
                  })
              }
            })
        }
    });
  }

  stopRecording() {
    VoiceRecorder.stopRecording()
      .then((result: RecordingData) => {
        this.audio = result.value.recordDataBase64;
        this.type = result.value.mimeType;
      })
      .catch(error => console.log(error))
  }

  addPhotoToGallery() {
    this._photoService.takePicture()
      .then(rs => {
        this.image = `data:png;base64,${this._photoService.imageUrl}`;
      })
  }

}
