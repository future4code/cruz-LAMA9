import { BandInputDTO } from "../model/Band";
import { IdGenerator } from "../services/IdGenerator";
import { BandDataBase } from "../data/BandDataBase"
import { Authenticator } from "../services/Authenticator";
import { UserRole } from "../model/User";

export class BandBusiness {

    constructor(
        
    )
    {}

    async createBand(band: BandInputDTO, token: string){
        const idGenerator = new IdGenerator()
        const id = idGenerator.generate()

        const authenticator = new Authenticator()
        const admin = authenticator.getData(token)

        if(admin.role !== UserRole.ADMIN) {
            throw new Error("Unauthorized")
        }

        const bandDataBase = new BandDataBase()
        await bandDataBase.createBand(id, band.name, band.music_genre, band.responsible)
    }

    async getSpecificBand(input: any){
        if(!input.id && !input.name){
            throw new Error("Specify a band")
        }

        const bandDataBase = new BandDataBase()
        const bandFromDb = await bandDataBase.getSpecificBand(input)

        if(!bandFromDb){
            throw new Error("This band doesn't exist")
        }
        return bandFromDb
    }
}