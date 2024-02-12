import type { APIRoute } from "astro";
import { TodoModel } from "../../lib/model";
import { CreateTodoSchema } from "../../lib/schema";

export const GET: APIRoute = async ({ url }) => {
  try {

    const user_id = url.searchParams.get('user_id');

    if (!user_id) return new Response(JSON.stringify({
      message: 'User id is required'
    }), { status: 400 })

    const todos = await TodoModel.find({
      user_id
    }).sort({
      data: -1
    })

    return new Response(JSON.stringify({
      todos
    }))
  }catch (error) {
    return new Response(JSON.stringify({
      message: 'Something went wrong.'
    }), {
      status: 500
    })
  }
}

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries())
  const validation = CreateTodoSchema.safeParse(data);

  if (!validation.success) {
    return new Response(JSON.stringify({
      errors: validation.error.flatten().fieldErrors,
      message: 'Faltan campos para crear el todo.',
      success: false
    }), {
      status: 400
    })
  }

  const { title, description, user_id } = validation.data

  try {

    const newTodo = new TodoModel({
      user_id,
      title,
      description
    });

    await newTodo.save();

    return new Response(JSON.stringify({
      message: 'El todo ha sido creado con éxito!',
      success: true
    }))
  }catch (error){
    return new Response(JSON.stringify({
      message: 'Server Error',
      success: false
    }), {
      status: 500
    })
  }
}