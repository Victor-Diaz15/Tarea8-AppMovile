import { Injectable } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { CameraSource } from '@capacitor/camera/dist/esm/definitions';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public imageUrl: any;
  constructor() { }

  public async takePicture(){
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    this.imageUrl = image.base64String;
    console.log("img", image);
  };

}
