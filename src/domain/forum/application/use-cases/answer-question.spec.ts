import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
// sut = system under test
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    // automatiza a criação do DB em memória e use case
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })
  it('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Conteúdo da Resposta',
    })

    // checkar pelo id que foi criada
    expect(answer.id).toBeTruthy()
    // certificar que o id foi salvo no repositório
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
  })
})
