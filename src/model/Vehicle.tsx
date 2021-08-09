import React from 'react';


export class VehicleData {
    public id:number;
    public imageUrl:string|null;
    public manager:Manager|null;
    public model:string|null;
    public modelYear:string|null;
    public name:string;
    public odometer:number;
    public reservationAutoAccept:boolean;
    public vehicleNumber:string;
    public createAt:string;
    public updateAt:string;

    constructor(id: number=0,
                imageUrl: string="",
                manager: Manager|null= null,
                model: string="",
                modelYear: string="",
                name: string="",
                odometer: number=0,
                reservationAutoAccept: boolean=false,
                vehicleNumber: string="",
                createAt: string="",
                updateAt: string="") {
        this.id = id;
        this.imageUrl = imageUrl;
        this.manager = manager;
        this.model = model;
        this.modelYear = modelYear;
        this.name = name;
        this.odometer = odometer;
        this.reservationAutoAccept = reservationAutoAccept;
        this.vehicleNumber = vehicleNumber;
        this.createAt = createAt;
        this.updateAt = updateAt;
    }
}

export type Manager = {
    email:String,
    id:number,
    imageUrl:String,
    username:String
}
