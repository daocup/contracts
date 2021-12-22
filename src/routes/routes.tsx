import React from "react"
import { BrowserRouter } from "react-router-dom"
import BuyDcupRoutes from "./BuyDcupRoutes"
export default function Routes() {
  return (
    <BrowserRouter>
      <BuyDcupRoutes />
    </BrowserRouter>
  )
}