import { Request, Response } from 'express'
import { FindAllAvailableUseCase } from './FindAllAvailableEndDateUseCase'

export class FindAllAvailableController {
  async handle (request: Request, response: Response) {
    const findAllAvailableUseCase = new FindAllAvailableUseCase()

    const deliveries = await findAllAvailableUseCase.execute()

    return response.json(deliveries)
  }
}