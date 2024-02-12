import type { StateErrors, StateForm } from "../lib/definitions"

export default function ErrorMessage({
  field,
  state,
  id
}: {
  field: keyof StateErrors;
  state: StateForm;
  id: string;
}) {

  return (
    state.errors && (
      <ul id={id} aria-live={'polite'} aria-atomic>
        {
          state.errors[field]?.map((issue) => (
            <li className="text-red-600 text-sm">{issue}</li>
          ))
        }
      </ul>
    )
  )
}