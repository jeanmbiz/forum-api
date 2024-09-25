import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
// sut = system under test
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    // automatiza a criação do DB em memória e use case
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch question answers', async () => {
    // criar 3 respostas no repositório no mesmo id de pergunta
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1'),
      }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1'),
      }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1'),
      }),
    )

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(answers).toHaveLength(3)
  })

  it.only('should be able to fetch paginated question answers', async () => {
    // criar 22 perguntas no repositório
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID('question-1'),
        }),
      )
    }

    // retorno somente a página 2
    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    // espero que o array tenha 2 itens
    expect(answers).toHaveLength(2)
  })
})