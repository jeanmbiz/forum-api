import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteAnswerUseCase } from './delete-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswerRepository
// sut = system under test
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    // automatiza a criação do DB em memória e use case
    inMemoryAnswersRepository = new InMemoryAnswerRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })
  it('should be able to delete a answer by id', async () => {
    // criar pergunta c/ id pelo Factory
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    // salvo pergunta no repositório
    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: 'author-1',
      answerId: 'answer-1',
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer by id from another author', async () => {
    // criar pergunta c/ id pelo Factory
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    // salvo pergunta no repositório
    await inMemoryAnswersRepository.create(newAnswer)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        answerId: 'answer-1',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
