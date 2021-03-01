import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {
    // http://localhost:3333/answers/10?u=be69c553-3fed-449a-9720-787299c840f7
    async execute(request: Request, response: Response) {
        const { value } = request.params
        const {u} = request.query

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const surveyUser = await surveysUsersRepository.findOne({id: String(u)})
        
        if (!surveyUser) {
            throw new AppError('Survey user does not exists')
        }

        surveyUser.value = Number(value)

        await surveysUsersRepository.save(surveyUser)

        return response.json(surveyUser)
    }
}

export default AnswerController