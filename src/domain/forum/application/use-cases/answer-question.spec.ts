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
    const result = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Conteúdo da Resposta',
    })

    // espero que seja sucesso
    expect(result.isRight()).toBe(true)
    // certificar que o answer foi salvo no repositório
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)
  })
})
