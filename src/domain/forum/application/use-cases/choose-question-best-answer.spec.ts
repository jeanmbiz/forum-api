import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
// sut = system under test
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    // automatiza a criação do DB em memória e use case
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()

    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    )
  })
  it('should be able to choose the question best answer', async () => {
    // criar question pelo Factory
    const question = makeQuestion()

    // criar answeer pelo Factory com id da question
    const answer = makeAnswer({
      questionId: question.id,
    })

    // salva question e answer nos repositórios
    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    // executa o caso de uso
    await sut.execute({
      authorId: question.authorId.toString(),
      answerId: answer.id.toString(),
    })

    // espero que no repositório o bestAnswerId seja igual ao answerId
    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('should not be able to choose another user question best answer', async () => {
    // criar question passando authorId
    const question = makeQuestion({
      authorId: new UniqueEntityID('author-1'),
    })

    // criar answeer pelo Factory com id da question
    const answer = makeAnswer({
      questionId: question.id,
    })

    // salva question e answer nos repositórios
    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    expect(() => {
      return sut.execute({
        answerId: answer.id.toString(),
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
