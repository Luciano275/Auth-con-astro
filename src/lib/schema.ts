import { z } from 'zod';

export const CreateTodoSchema = z.object({
  user_id: z.coerce.number().gt(0, {
    message: 'El ID del usuario no es válida.'
  }),
  title: z.string({
    invalid_type_error: 'Se necesita un título válido',
    required_error: 'Se necesita un título.'
  }).min(3, {
    message: 'Se necesita un título de al menos 3 caracteres.'
  }),
  description: z.string({
    invalid_type_error: 'Se necesita una descripción válida',
    required_error: 'Se necesita una descripción.'
  }).min(5, {
    message: 'Se necesita una descripción de al menos 5 caracteres.'
  })
})