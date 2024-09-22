import { Question } from '@/domain/forum/entrerprise/entities/question'
import { QuestionsRepository } from './../../src/domain/forum/application/repositories/questions-repository'
export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  async create(question: Question) {
    this.items.push(question)
  }
}
