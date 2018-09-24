import { Kinvey } from 'kinvey-nativescript-sdk';

export class BackendService {
  static kinveyAppKey = 'kid_Sys1m3XOX';
  static kinveyAppSecret = 'a4b02fe07d8b495195402e04cfc7ae6c';

  static setup() {
    Kinvey.init({
      appKey: BackendService.kinveyAppKey,
      appSecret: BackendService.kinveyAppSecret
    });
  }
}