import React from "react"
import { BrowserRouter } from "react-router-dom"
import BuyDcupRoutes from "./BuyDcupRoutes"
import HomeRoutes from "./HomeRoutes"

export default function Routes() {
  return (
    <BrowserRouter>
      <HomeRoutes />
      <BuyDcupRoutes />
    </BrowserRouter>
  )
}