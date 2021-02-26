import { Request, Response } from "express"
import { getCustomRepository, RepositoryNotTreeError } from "typeorm"
import { SurveysRepository } from "../repositories/SurveysRepository"

class SurveyController {
    async create(request: Request, response: Response) {
        const { title, description } = request.body

        const surveysRepository = getCustomRepository(SurveysRepository)

        const surveyAlreadyExists = await surveysRepository.findOne({title})

        if (surveyAlreadyExists) {
            return response.status(400).json({
                error: "Survey already exists"
            })
        }
        const survey = surveysRepository.create({
            title, description
        })

        await surveysRepository.save(survey)

        return response.json(201)
    }

    async show(request: Request, response: Response) {
        const surveysRepository = getCustomRepository(SurveysRepository)

        const all = await surveysRepository.find()

        return response.json(all)
    }
}

export default SurveyController