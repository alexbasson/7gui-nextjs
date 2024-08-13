'use client'

import CrudForm from "@/app/crud/crud-form";
import NameRepository from "@/app/crud/name-repository";

export default function Page() {
  const repository = new NameRepository();

  return (
    <CrudForm repository={repository} />
  )
}
