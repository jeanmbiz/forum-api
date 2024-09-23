import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
// sut = system under test
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    // automatiza a criação do DB em memória e use case
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })
  it('should be able to edit a answer by id', async () => {
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
      answerId: newAnswer.id.toValue(),
      authorId: 'author-1',
      content: 'Content test',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Content test',
    })
  })

  it('should not be able to edit a answer by id from another author', async () => {
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
        answerId: newAnswer.id.toValue(),
        authorId: 'author-2',
        content: 'Content test',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
