import React from 'react';


export class User {
  public apiClientId:string|null;
  public apiClientToken:string|null;
  public userName:string;
  public email:string;
  public imageUrl:string|null;


  constructor(apiClientId: string="", apiClientToken: string="", userName: string="", email: string="", imageUrl: string="") {
    this.apiClientId = apiClientId;
    this.apiClientToken = apiClientToken;
    this.userName = userName;
    this.email = email;
    this.imageUrl = imageUrl;
  }
}
