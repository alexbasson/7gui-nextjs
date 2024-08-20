import { PersonsRepository } from "./PersonsRepository";
import {Person} from "@/app/crud/Person";

export default class HTTPPersonsRepository implements PersonsRepository {
  private baseUrl = "http://localhost:8080/persons"

  async getAll(): Promise<Person[]> {
    const response = await fetch(this.baseUrl);
    return await response.json();
  }

  async create(name: string, surname: string): Promise<Person> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, surname})
    })
    return await response.json();
  }

  async update(id: number, name: string, surname: string): Promise<Person> {
    const response = await fetch(this.baseUrl + `/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, surname})
    })
    return await response.json();
  }

  async delete(id: number): Promise<void> {
    const response = await fetch(this.baseUrl + `/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    return await response.json();
  }
}
