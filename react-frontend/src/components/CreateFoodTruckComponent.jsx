import React, { Component } from 'react'
import FoodTruckService from '../services/FoodTruckService';

class CreateFoodTruckComponent extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            // step 2
            id: this.props.match.params.id,
            name:'',
            date:''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.saveOrUpdateFoodTruck = this.saveOrUpdateFoodTruck.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            FoodTruckService.getFoodTruckById(this.state.id).then( (res) =>{
                let foodTruck = res.data;
                this.setState({firstName: foodTruck.firstName,
                    name: foodTruck.name,
                    date : foodTruck.date
                });
            });
        }        
    }
    saveOrUpdateFoodTruck = (e) => {
        e.preventDefault();
        if(!this.handleValidation()){
            alert("Wrong input");
            return;
        }
        let foodTruck = {name: this.state.name, date: this.state.date};
        console.log('foodTruck => ' + JSON.stringify(foodTruck));

        // step 5
        if(this.state.id === '_add'){
            FoodTruckService.createFoodTruck(foodTruck).then(res =>{
                this.props.history.push('/foodtrucks');
            });
        }else{
            FoodTruckService.updateFoodTruck(foodTruck, this.state.id).then( res => {
                this.props.history.push('/foodtrucks');
            });
        }
    }

    handleValidation() {

        let formIsValid = true;

        if (this.state.name.length < 2) {
            formIsValid = false;
        }
        if (this.state.date.length != 10) {
            formIsValid = false;
        }
        return formIsValid;
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Food Truck</h3>
        }else{
            return <h3 className="text-center">Update Food Truck</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label>  Name: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Date: </label>
                                            <input type="text"  placeholder="YYYY-MM-DD" pattern="(?:19|20)(?:(?:[13579][26]|[02468][048])-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))|(?:[0-9]{2}-(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:29|30))|(?:(?:0[13578]|1[02])-31)))" class="form-control "  name="date" id="" required autofocus autocomplete="nope"
                                                value={this.state.date} onChange={this.changeDateHandler}/>
                                        </div>
                               
                                        <button className="btn btn-success" onClick={this.saveOrUpdateFoodTruck}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateFoodTruckComponent
