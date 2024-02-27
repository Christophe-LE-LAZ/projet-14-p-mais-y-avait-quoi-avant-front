// Typage de la partie "location" de ce qu'on envoie à l'API
export interface ILocationToCreate {
    area : string
    department: string
    district: string
    street : string
    city : string
    zipcode : number | undefined
    latitude : string
    longitude : string
  }
  
export interface ILocationCreated extends ILocationToCreate {
    id : number | null
  }