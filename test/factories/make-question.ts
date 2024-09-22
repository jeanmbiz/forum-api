import { QuestionProps } from './../../src/domain/forum/entrerprise/entities/question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '@/domain/forum/entrerprise/entities/question'
import { Slug } from '@/domain/forum/entrerprise/entities/value-objects/slug'
import { faker } from '@faker-js/faker'

export function makeQuestion(
  // para criar questions fakes
  override: Partial<QuestionProps> = {},
  // para poder criar uma question com ID específica
  id?: UniqueEntityID,
) {
  const question = Question.create(
    {
      title: faker.lorem.sentence(),
      slug: Slug.create('example-slug'),
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      // sobrescrever propriedades acima
      ...override,
    },
    id,
  )

  return question
}
