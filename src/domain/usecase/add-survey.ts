export interface AddSurveyDto {
  question: string
  answers: SurveyAnswer[]
}

export interface SurveyAnswer {
  image: string
  answer: string
}

export interface AddSurvey {
  add (data: AddSurveyDto): Promise<void>
}
