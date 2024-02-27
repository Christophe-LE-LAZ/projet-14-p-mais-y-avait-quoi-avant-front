import { IUser } from "./user"
import { ILocationToCreate, ILocationCreated } from "./location"

// Typage de ce qu'on envoie à l'API
export interface IDataToCreate {
  memory : IMemoryToCreate
  location : ILocationToCreate
  place : IPlaceToCreate
}

// Typage de la partie "memory" de ce qu'on envoie à l'API pour la création
export interface IMemoryToCreate {
  title: string
  content: string
  picture_date: string
}
// Typage de la partie "place" de ce qu'on envoie à l'API pour la création
export interface IPlaceToCreate {
  name : string
  type : string
}

// Typage de ce qu'on reçoit de l'API
export interface IDataCreated extends IMemoryCreated {
  location : ILocationCreated
  place : IPlaceCreated
  user : IUser
  picture : IPictureCreated[] | []
}

export interface IMemoryCreated  {
  id: number | null
  title: string
  content: string
  picture_date: string
  main_picture: string
}

export interface IPlaceCreated extends IPlaceToCreate { 
  id : number | null
}

export interface IPictureCreated {
  id : number | null
  picture : string
}

