import { BandInputDTO } from "../model/Band";
import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";

export class BandController {
    async createBand(req: Request, res: Response){
        try {

            const input: BandInputDTO = {
                name: req.body.name,
                music_genre: req.body.music_genre,
                responsible: req.body.responsible
            }

            const token = req.headers.authorization as string

            const bandBusiness = new BandBusiness()
            await bandBusiness.createBand(input, token)

            res.status(200).send("Success")
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    async getSpecificBand(req: Request, res: Response) {
        try {
            const input = {
                id: req.query.id as string ,
                name: req.query.name as string 
            }

            const bandBusiness = new BandBusiness()
            const result = await bandBusiness.getSpecificBand(input)

            res.status(200).send({result})
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
}