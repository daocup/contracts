import React from "react"
import { Switch, Route } from "react-router-dom"
import { PATH } from "../constants/paths"
import BuyDcup from "../pages/BuyDcup/BuyDcup"

export default function BuyDcupRoutes() {
    return (
        <Switch>
            <Route exact path={PATH.BUYDCUP}>
                <BuyDcup />
            </Route>
        </Switch>
    )
}