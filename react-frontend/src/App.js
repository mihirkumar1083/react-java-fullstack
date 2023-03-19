import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListFoodTruckComponent from './components/ListFoodTrackComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateFoodTruckComponent from './components/CreateFoodTruckComponent';
import UpdateFoodTruckComponent from './components/UpdateFoodTruckComponent';
import ViewFoodTruckComponent from './components/ViewFoodTruckComponent';

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListFoodTruckComponent}></Route>
                          <Route path = "/foodtrucks" component = {ListFoodTruckComponent}></Route>
                          <Route path = "/add-foodtruck/:id" component = {CreateFoodTruckComponent}></Route>
                          <Route path = "/view-foodtruck/:id" component = {ViewFoodTruckComponent}></Route>
                          <Route path = "/update-foodtruck/:id" component = {UpdateFoodTruckComponent}></Route>
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
