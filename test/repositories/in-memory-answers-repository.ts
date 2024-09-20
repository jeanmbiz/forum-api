import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/entrerprise/entities/answer'
export class InMemoryAnswerRepository implements AnswersRepository {
  public items: Answer[] = []
  async create(answer: Answer) {
    this.items.push(answer)
  }
}
