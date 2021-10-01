import React from 'react';


export class VehicleData {
    public id:number;
    public imageUrl:string|null;
    public managerId:number|null;
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
                managerId: number|null= null,
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
        this.managerId = managerId;
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


export class DrivingLog {

    public id: number;
    public vehicleId: number;
    public driverId: number;
    public startDateTime: string;
    public arriveDateTime: string;
    public startOdometer: number;
    public arriveOdometer: number;
    public createAt:string;
    public updateAt:string;

    constructor(id: number=0,
                vehicleId: number=0,
                driverId: number=0,
                startDateTime: string="",
                arriveDateTime: string="",
                startOdometer: number=0,
                arriveOdometer: number=0,
                createAt: string="",
                updateAt: string="") {
        this.id = id;
        this.vehicleId = vehicleId;
        this.driverId = driverId;
        this.startDateTime = startDateTime;
        this.arriveDateTime = arriveDateTime;
        this.startOdometer = startOdometer;
        this.arriveOdometer = arriveOdometer;
        this.createAt = createAt;
        this.updateAt = updateAt;
    }
}