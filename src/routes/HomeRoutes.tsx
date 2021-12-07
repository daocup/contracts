import React from "react"
import { Switch, Route } from "react-router-dom"
import { PATH } from "../constants/paths"
import Home from "../pages/Home/Home"

export default function HomeRoutes() {
  return (
    <Switch>
      <Route exact path={PATH.HOME}>
        <Home />
      </Route>
    </Switch>
  )
}