import { Question } from '@/domain/forum/entrerprise/entities/question'
import { QuestionsRepository } from './../../src/domain/forum/application/repositories/questions-repository'
export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []
  async create(question: Question) {
    this.items.push(question)
  }
}
