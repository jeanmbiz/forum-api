import { InMemoryQuestionsRepository } from './../../../../../test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
// sut = system under test
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    // automatiza a criação do DB em memória e use case
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'Nova Pergunta',
      content: 'Conteúdo da Pergunta',
    })

    // espero que seja sucesso
    expect(result.isRight()).toBe(true)
    // certificar que foi salvo no repositório
    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
  })
})
