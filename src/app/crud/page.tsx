'use client'

import CrudForm from "@/app/crud/CrudForm";
import LocalPersonsRepository from "@/app/crud/LocalPersonsRepository";

export default function Page() {
  const repository = new LocalPersonsRepository();

  return (
    <CrudForm repository={repository} />
  )
}
