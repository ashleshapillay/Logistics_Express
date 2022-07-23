
export interface DeliveryNote{
    deliveryNoteID: number;
    dateSubmitted: Date;
    //pod_image: ImageBitmap;
    deliveryID: number;
    quotationID: number;
    cosginee:string;
    deliverTo:string;
    collectFrom: string;
    quantity:number;
    weight:number;
    description:string;
    receivedQuality: boolean;
    driverName:string;
    vehReg:string;
    time: Date;
    printName:string;
    trailerReg:string;
    //signature:string;
}