import { useState } from "react"
import type { StateForm, Todo } from "../lib/definitions";
import ErrorMessage from "./ErrorMessage";

type Props = {
  userId: number;
  domain: string;
}

interface EditProps extends Props {
  todo: Todo
}

const initialState = {
  errors: {},
  message: null,
  success: null
}

export function FormAdd({
  userId,
  domain
}: Props) {

  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ stateForm, setStateForm ] = useState<StateForm>(initialState)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      const formData = new FormData();
      
      formData.append('user_id', userId.toString());
      formData.append('title', title);
      formData.append('description', description);

      const rq = await fetch(`${domain}/api/todos`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })

      if (rq.status === 400) {

        const { message, success, errors } = await rq.json();

        setStateForm({
          errors,
          message,
          success
        })

        return;

      }

      if (!rq.ok) {
        setStateForm({
          ...stateForm,
          message: 'Something went wrong.',
          success: false
        })
      }

      const { message, success } = await rq.json();

      setStateForm({
        ...stateForm,
        message,
        success
      })

    }catch (error) {
      setStateForm({
        ...stateForm,
        message: 'Server Error',
        success: false
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[450px] mx-auto flex flex-col gap-4">
      <div>
        <label htmlFor="title" className="block text-lg">Título</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Todo uno"
          className="p-2 text-lg w-full outline-none border border-neutral-300 focus:border-blue-500"
          onChange={
            (e) => setTitle(e.target.value)
          }
          aria-describedby="title-error"
        />

        <ErrorMessage
          id='title-error'
          state={stateForm}
          field="title"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-lg">Descripción</label>
        <textarea
          name="description"
          id="description"
          placeholder="Pequeña descripción"
          className="p-2 text-lg w-full outline-none border border-neutral-300 focus:border-blue-500 resize-y min-h-[120px] max-h-[300px]"
          onChange={
            (e) => setDescription(e.target.value)
          }
          aria-describedby="description-error"
        ></textarea>

        <ErrorMessage
          id='description-error'
          state={stateForm}
          field="description"
        />
      </div>
      <button className="text-lg py-2 bg-green-500 text-white hover:bg-green-700">Crear</button>
      {
        stateForm.message && (
          <p className={`text-sm text-white py-2 px-4 ${stateForm.success ? 'bg-green-600' : 'bg-red-600'}`}>{stateForm.message}</p>
        )
      }
    </form>
  )
}

export function FormEdit({
  userId,
  domain,
  todo
}: EditProps) {

  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ stateFormEdit, setStateFormEdit ] = useState<StateForm>(initialState);

  const { _id, title: todoTitle, description: todoDescription } = todo;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const element = e.target as Element;

    //@ts-ignore
    const title = element.title.value;
    //@ts-ignore
    const description = element.description.value;

    const formData = new FormData();

    formData.append('user_id', userId.toString());
    formData.append('title', title);
    formData.append('description', description);

    try {
      const rq = await fetch(`${domain}/api/todos/${_id}`, {
        method: 'PUT',
        credentials: 'include',
        body: formData
      })
  
      if (rq.status === 400) {
        if (rq.status === 400) {
  
          const { message, success, errors } = await rq.json();
  
          setStateFormEdit({
            errors,
            message,
            success
          })
  
          return;
  
        }
      }
  
      if (!rq.ok) {
        setStateFormEdit({
          ...stateFormEdit,
          message: (await rq.json()).message,
          success: false
        })
        return;
      }

      const { message, success } = await rq.json()
      
      setStateFormEdit({
        ...stateFormEdit,
        message,
        success
      })
    }catch (error) {
      setStateFormEdit({
        ...stateFormEdit,
        message: 'Server Error',
        success: false
      })
    }
  }

  return(
    <form onSubmit={handleSubmit} className="w-full max-w-[450px] mx-auto flex flex-col gap-4">
      <div>
        <label htmlFor="title" className="block text-lg">Título</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Todo uno"
          className="p-2 text-lg w-full outline-none border border-neutral-300 focus:border-blue-500"
          onChange={
            (e) => setTitle(e.target.value)
          }
          aria-describedby="title-error"
          defaultValue={todoTitle}
        />

        <ErrorMessage
          id='title-error'
          state={stateFormEdit}
          field="title"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-lg">Descripción</label>
        <textarea
          name="description"
          id="description"
          placeholder="Pequeña descripción"
          className="p-2 text-lg w-full outline-none border border-neutral-300 focus:border-blue-500 resize-y min-h-[120px] max-h-[300px]"
          onChange={
            (e) => setDescription(e.target.value)
          }
          aria-describedby="description-error"
          defaultValue={todoDescription}
        ></textarea>

        <ErrorMessage
          id='description-error'
          state={stateFormEdit}
          field="description"
        />
      </div>
      <button className="text-lg py-2 bg-green-500 text-white hover:bg-green-700">Crear</button>
      {
        stateFormEdit.message && (
          <p className={`text-sm text-white py-2 px-4 ${stateFormEdit.success ? 'bg-green-600' : 'bg-red-600'}`}>{stateFormEdit.message}</p>
        )
      }
    </form>
  )
}