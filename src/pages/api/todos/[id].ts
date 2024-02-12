import type { APIRoute } from "astro";
import { TodoModel } from "../../../lib/model";
import { CreateTodoSchema } from "src/lib/schema";

export const GET: APIRoute = async ({ request, params }) => {
  const todoId = params.id;
  const userId = new URL(request.url).searchParams.get('user_id')

  try {

    const todo = await TodoModel.findOne({
      _id: todoId,
      user_id: userId
    })

    if (!todo) return new Response(JSON.stringify({ message: 'Not Found' }), { status: 404 })

    return new Response(JSON.stringify({ todo }))

  }catch (error) {
    return new Response(JSON.stringify({
      message: 'Server Error'
    }), {
      status: 500
    })
  }
}

export const DELETE: APIRoute = async ({ request, params }) => {

  const todoId = params.id;
  const userId = new URL(request.url).searchParams.get('user_id')

  try {

    const todo = await TodoModel.findOneAndDelete({
      _id: todoId,
      user_id: userId
    })

    if (!todo) return new Response(JSON.stringify({ message: 'Not Found' }), { status: 404 })

    return new Response(JSON.stringify({ message: 'El todo ha sido eliminado con éxito.' }))
  }catch (error) {
    return new Response(JSON.stringify({
      message: 'Server Error'
    }), {
      status: 500
    })
  }
}

export const PUT: APIRoute = async ({ request, params }) => {

  const todoId = params.id;
  const formData = await request.formData();

  const data = Object.fromEntries(formData.entries());

  const validation = CreateTodoSchema.safeParse(data);

  if (!validation.success) {
    return new Response(JSON.stringify({
      errors: validation.error.flatten().fieldErrors,
      message: 'Faltan campos para editar el todo.',
      success: false
    }), {
      status: 400
    })
  }

  const { user_id, title, description } = validation.data

  try {

    const todo = await TodoModel.findOneAndUpdate({
      _id: todoId,
      user_id
    }, {
      title,
      description,
      date: new Date()
    })

    if (!todo) return new Response(JSON.stringify({
      message: 'No se encontró el todo.',
      success: false
    }), { status: 404 })

    return new Response(JSON.stringify({
      message: 'El todo ha sido editado con éxito.',
      success: true
    }))
  }catch (error) {
    return new Response(JSON.stringify({
      message: 'Server Error',
      success: false
    }), {
      status: 500
    })
  }
}