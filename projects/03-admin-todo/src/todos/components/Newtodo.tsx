'use client';

import { FormEvent, useState } from 'react';
import { IoTrashOutline } from "react-icons/io5";
/* import * as api from '../helpers/todos'; */
import { addTodo, deleteCompleted } from '../actions/todo-actions';
import { useRouter } from 'next/navigation';


export const NewTodo = () => {
  const router = useRouter()
  const [description, setDescription] = useState("")

  /* const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!description.trim()) {
      return
    }

    try {
      await api.createTodo(description)
      setDescription("")
      router.refresh()
    }
    catch (error) {
      console.error("Error creating todo:", error)
    }
  }

  const deleteCompleted = async () => {
    try {
      await api.deleteCompleted();
      router.refresh();
    } catch (error) {
      console.error("Error deleting completed todos:", error);
    }
  } */

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!description.trim()) return


    await addTodo(description)
    setDescription("")
    router.refresh()
  }

  const handleDeleteCompleted = async () => {
    try {
      await deleteCompleted();
      router.refresh();
    } catch (error) {
      console.error("Error deleting completed todos:", error);
    }
  }

  return (
    <form className='flex w-full' onSubmit={handleSubmit}>
      <input type="text"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 bg-white border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?" />

      <button type='submit' className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
        Crear
      </button>

      <span className='flex flex-1'></span>

      <button
        onClick={() => handleDeleteCompleted()}
        type='button' className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
        <IoTrashOutline />
        Borrar Completados
      </button>
    </form>
  )
}