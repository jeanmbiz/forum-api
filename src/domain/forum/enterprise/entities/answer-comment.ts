import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface AnswerCommentProps {
  authorId: UniqueEntityID
  answerId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}
export class Answer extends Entity<AnswerCommentProps> {
  get authorId() {
    return this.props.authorId
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  // faz atualizaçao do upatedAt
  private touch() {
    this.props.updatedAt = new Date()
  }

  // atualização do comentário
  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  // abstrair a criação das entidades
  static create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const answerComment = new Answer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return answerComment
  }
}