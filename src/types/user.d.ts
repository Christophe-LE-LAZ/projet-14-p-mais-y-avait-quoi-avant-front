export interface IUserBase {
  firstname : string
  lastname : string
  email : string
}

export interface IUserToCreate extends IUserBase {
    password : string
    password_check : string
  }

  export interface IUser extends IUserBase {
    id : number | null
    roles : string[]
  }