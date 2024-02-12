import db from './database.ts';

const TodoSchema = new db.Schema({
  user_id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: new Date() }
}, {
  versionKey: false
})

export const TodoModel = db.model('Todo', TodoSchema)