import { AddSurveyDto, AddSurveyRepository } from './add-survey-protocols'
import { DbAddSurvey } from './db-add-survey'

const makeFakeSurveyData = (): AddSurveyDto => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (data: AddSurveyDto): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new AddSurveyRepositoryStub()
}

interface sutTypes {
  addSurveyRepositoryStub: AddSurveyRepository
  sut: DbAddSurvey
}

const makeSut = (): sutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRepository()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return {
    sut,
    addSurveyRepositoryStub
  }
}

describe('DbAddSurvey UseCase', () => {
  // nesse caso como o método de survey não tem retorno
  // será necessário implementar o teste sómente
  // com a integração de um repositóryo que implemente que
  // realize essa operação

  // garantindo a integração com o AddSurveyRepositóry
  test('Should call AddSurveyRepositóry with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSurveySpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    const surveyData = makeFakeSurveyData()
    await sut.add(surveyData)
    expect(addSurveySpy).toHaveBeenCalledWith(surveyData)
  })
})
