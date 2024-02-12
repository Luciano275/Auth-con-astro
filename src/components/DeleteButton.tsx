import type { ObjectId } from "mongoose";
import Swal from 'sweetalert2'

export default function DeleteButton ({
  id,
  userId,
  domain
}: {
  id: ObjectId,
  userId: number;
  domain: string;
}) {

  const handleClick = () => {

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no tiene vueltra atrás",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar."
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          
          const rq = await fetch(`${domain}/api/todos/${id}?user_id=${userId}`, {
            method: 'DELETE',
            credentials: 'include'
          });
    
          if (rq.status === 404) {
            Swal.fire({
              title: 'Error',
              text: (await rq.json()).message,
              icon: 'error'
            })
            return;
          }
    
          const { message } = await rq.json();
    
          Swal.fire({
            title: 'Todo',
            text: message,
            icon: 'success',
            timer: 1200
          })
            .then(() => {
              window.location.reload()
            })
    
        }catch (e) {
          Swal.fire({
              title: 'Error',
              text: 'Server Error',
              icon: 'error'
            })
        }
      }
    });
  }

  return (
    <button
      className="text-xl py-1 px-2 rounded-lg bg-red-500 hover:bg-red-700"
      onClick={handleClick}
    >Eliminar</button>
  )
}