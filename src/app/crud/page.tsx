'use client'

import CrudForm from "@/app/crud/CrudForm";
import PersonsRepository from "@/app/crud/PersonsRepository";

export default function Page() {
  const repository = new PersonsRepository();

  return (
    <CrudForm repository={repository} />
  )
}
