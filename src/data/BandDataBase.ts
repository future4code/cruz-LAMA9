import { BaseDatabase } from "./BaseDatabase";
import { Band } from "../model/Band";

export class BandDataBase extends BaseDatabase {
    private static TABLE_NAME = "TABELA_BANDAS"

    public async createBand(
        id: string,
        name: string,
        music_genre: string,
        responsible: string
    ): Promise<void> {
        try {
            await this.getConnection()
            .insert({
                id,
                name,
                music_genre,
                responsible
            })
            .into(BandDataBase.TABLE_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getSpecificBand(
        input: any
        ): Promise<Band | undefined> {
            try {
                const result = await this.getConnection().raw(`
            SELECT * FROM ${BandDataBase.TABLE_NAME} WHERE id = '${input.id}' OR name = '${input.name}'
            `)
            // .select("*")
            // .from(BandDataBase.TABLE_NAME)
            // .where({id})
            // .orWhere({name})
            return Band.toBandModel(result[0][0])
            } catch (error) {
                throw new Error(error.sqlMessage || error.message)
            }
        }
}