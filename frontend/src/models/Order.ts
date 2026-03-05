import { Person } from "./Person"
import { Product } from "./Product"

export type Order = {
  id?: number,
  created: Date,
  total: number,
  parcelMachine: string,
  paymentState: string,
  person: Person
  products: Product[]
}