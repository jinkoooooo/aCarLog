import React from 'react';


export class User {
  public apiClientId:string|null;
  public apiClientToken:string|null;
  public userName:string;
  public email:string;
  public imageUrl:string|null;

  public department:Department|null;
  public position:Position|null;


  constructor(apiClientId: string="", apiClientToken: string="", userName: string="", email: string="", imageUrl: string="") {
    this.apiClientId = apiClientId;
    this.apiClientToken = apiClientToken;
    this.userName = userName;
    this.email = email;
    this.imageUrl = imageUrl;
    this.department = null;
    this.position = null;
  }
}

export class Department{
  public id:number;
  public name:string;

  constructor(id:number = 0, name:string = "") {
    this.id = id;
    this.name = name;
  }
}

export class Position{
  public id:number;
  public name:string;

  constructor(id:number = 0, name:string = "") {
    this.id = id;
    this.name = name;
  }
}

export class AuthApis{
  public name:string;
  public authList:AuthApis[] | [];

  constructor(name:string = "") {
    this.name = name;
    this.authList = [];
  }
}
