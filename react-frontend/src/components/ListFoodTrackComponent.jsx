import React, { Component } from 'react'
import FoodTruckService from '../services/FoodTruckService'

class ListFoodTruckComponent extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
                foodTrucks: [],
                searchDate : ''
        }
        this.addFoodTruck = this.addFoodTruck.bind(this);
        this.editFoodTruck = this.editFoodTruck.bind(this);
        this.deleteFoodTruck = this.deleteFoodTruck.bind(this);
        this.searchfoodTruckByDate = this.searchfoodTruckByDate.bind(this);
    }

    deleteFoodTruck(id){
        FoodTruckService.deleteFoodTruck(id).then( res => {
            this.setState({foodTrucks: this.state.foodTrucks.filter(foodTruck => foodTruck.id !== id)});
        });
    }
    viewFoodTruck(id){
        this.props.history.push(`/view-foodtruck/${id}`);
    }
    editFoodTruck(id){
        this.props.history.push(`/update-foodtruck/${id}`);
    }

    componentDidMount(){
        FoodTruckService.getFoodTrucks().then((res) => {
            this.setState({ foodTrucks: res.data});
        });
    }

    addFoodTruck(){
        this.props.history.push('/add-foodtruck/_add');
    }

    addFoodTruck(){
        this.props.history.push('/add-foodtruck/_add');
    }
    handleValidation() {

        let formIsValid = true;

        if (this.state.searchDate.length != 10) {
            formIsValid = false;
        }
        return formIsValid;
    }

    searchfoodTruckByDate(searchDate){
        if(!this.handleValidation()){
             alert("Please provide proper date input");
             this.state.searchDate='';
             return;
        }

        FoodTruckService.getFoodTruckByDate(searchDate).then((res) => {
            this.setState({ foodTrucks: res.data});
        });
    }
    changeSearchDateHandler= (event) => {
        this.setState({searchDate: event.target.value});
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Food truck List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addFoodTruck}> Add Food Truck</button>
                 </div>
                 <br></br>
                 <div className = "row">
                 <td><label style={{fontSize:20}}> Filter : </label> </td>
                 <td><input type="text" id='search' placeholder="YYYY-MM-DD" pattern="(?:19|20)(?:(?:[13579][26]|[02468][048])-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))|(?:[0-9]{2}-(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:29|30))|(?:(?:0[13578]|1[02])-31)))" class="form-control "  name="date" id="" required autoFocus autocomplete="nope"
                  value={this.state.searchDate} onChange= {this.changeSearchDateHandler} /></td>
                 <td><button onClick={()=> this.searchfoodTruckByDate(this.state.searchDate)} className="btn btn-info" style={{marginLeft: 3 + 'em'}}>Search </button>
                 </td></div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Name </th>
                                    <th> Date</th>
                                   
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.foodTrucks.map(
                                        foodTruck => 
                                        <tr key = {foodTruck.id}>
                                             <td> {foodTruck.name} </td>  
                                             <td> {foodTruck.date} </td>   

                                             <td>
                                                 <button onClick={ () => this.editFoodTruck(foodTruck.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewFoodTruck(foodTruck.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListFoodTruckComponent
