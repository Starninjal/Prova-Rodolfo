import lstAdressesData from "./lstAdressesData";
import { PerfilTypeData } from "./PerfilTypeData";

export interface UserData {
    name: string,
    email: string,
    senha: string,
    foto: string,
    tipoPerfil: PerfilTypeData,
    lstAddresses: lstAdressesData[],
    unidade: string
}