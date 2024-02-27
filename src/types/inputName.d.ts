import { ICredentials } from "./credentials";
import { IMemoryToCreate, IPlaceToCreate} from "./memory";
import { ILocationToCreate } from "./location";
import { IUserToCreate } from "./user";

// Typage d'inputName comme étant une clé de l'interface ICredentials
export type TInputNameCred = keyof ICredentials;
export type TInputNameRegister = keyof IUserToCreate;

export type TInputNameMemory = keyof IMemoryToCreate;
export type TInputNamePlace = keyof IPlaceToCreate;
export type TInputNameLocation = keyof ILocationToCreate;