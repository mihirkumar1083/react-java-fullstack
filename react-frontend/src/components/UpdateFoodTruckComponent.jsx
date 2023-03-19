import React, { Component } from 'react'
import FoodTruckService from '../services/FoodTruckService';

class UpdateFoodTruckComponent extends Component {
    constructor(props) {
        
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            date: ''

        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.updateFoodTruck = this.updateFoodTruck.bind(this);
    }

    componentDidMount(){
        FoodTruckService.getFoodTruckById(this.state.id).then( (res) =>{
            let foodtruck = res.data;
            this.setState({name: foodtruck.name,
               date: foodtruck.date
            });
        });
    }

    updateFoodTruck = (e) => {
        e.preventDefault();
        let foodtruck = {name: this.state.name, date: this.state.date};
        console.log('food truck => ' + JSON.stringify(foodtruck));
        console.log('id => ' + JSON.stringify(this.state.id));
        FoodTruckService.updateFoodTruck(foodtruck, this.state.id).then( res => {
            this.props.history.push('/foodtrucks');
        });
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeDateHandler= (event) => {
        this.setState({date: event.target.value});
    }

  

    cancel(){
        this.props.history.push('/foodtrucks');
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Update Food truck</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Name: </label>
                                        <input placeholder=" Name" name="name" className="form-control"
                                            value={this.state.name} onChange={this.changeNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Date </label>
                                        <input type="text" id='search' placeholder="YYYY-MM-DD" pattern="(?:19|20)(?:(?:[13579][26]|[02468][048])-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))|(?:[0-9]{2}-(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:29|30))|(?:(?:0[13578]|1[02])-31)))" class="form-control " name="date" id="" required autoFocus autocomplete="nope"
                                            value={this.state.date} onChange={this.changeDateHandler} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.updateFoodTruck}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default UpdateFoodTruckComponent
