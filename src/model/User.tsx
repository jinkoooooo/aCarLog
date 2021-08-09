import React from 'react';


export class AuthData {
  public apiClientId:string;
  public apiClientToken:string;
  public acessToken:string;
  public userData:UserData|null

  constructor(apiClientId: string="", apiClientToken: string="", acessToken: string="") {
    this.apiClientId = apiClientId;
    this.apiClientToken = apiClientToken;
    this.acessToken = acessToken;
    this.userData = null;
  }
}

export type UserData = {
  authApis:AuthApis[],
  department: Department,
  position: Position,
  email:String,
  id:number,
  imageUrl:String,
  updateAt:String,
  username:String
}

type Department = {
  id:number,
  name:string
}

type Position = {
  id:number,
  name:string
}

class AuthApis{
  public name:string;
  public authList:AuthApis[] | [];

  constructor(name:string = "") {
    this.name = name;
    this.authList = [];
  }
}
