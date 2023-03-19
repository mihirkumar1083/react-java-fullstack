import React, { Component } from 'react'
import FoodTruckService from '../services/FoodTruckService'

class ViewFoodTruckComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            foodtruck: {}
        }
    }

    componentDidMount(){
        FoodTruckService.getFoodTruckById(this.state.id).then( res => {
            this.setState({foodtruck: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Food truck Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Name: </label>
                            <div> { this.state.foodtruck.name }</div>
                        </div>
                        <div className = "row">
                            <label> Date : </label>
                            <div> { this.state.foodtruck.date }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewFoodTruckComponent
