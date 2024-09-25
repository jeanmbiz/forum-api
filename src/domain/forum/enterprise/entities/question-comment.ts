import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './comment'

// extende CommentProps e customiza para perguntas dos comentários
export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityID
}

// Extende a Classe comment
export class Question extends Comment<QuestionCommentProps> {
  // getter da interface customizada
  get questionId() {
    return this.props.questionId
  }

  // abstrair a criação das entidades
  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const questionComment = new Question(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return questionComment
  }
}
