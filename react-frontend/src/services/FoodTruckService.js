import axios from 'axios';

const FOOD_TRUCK_API_BASE_URL = "http://localhost:8080/api/v1/foodtrucks";

class FoodTruckService {

    getFoodTrucks(){
        return axios.get(FOOD_TRUCK_API_BASE_URL);
    }

    createFoodTruck(foodtruck){
        return axios.post(FOOD_TRUCK_API_BASE_URL, foodtruck);
    }

    getFoodTruckById(foodtruckid){
        return axios.get(FOOD_TRUCK_API_BASE_URL + '/' + foodtruckid);
    }

    getFoodTruckByDate(date){
        return axios.get(FOOD_TRUCK_API_BASE_URL + '/bydate/' + date);
    }

    updateFoodTruck(foodtruck, foodtruckId){
        return axios.put(FOOD_TRUCK_API_BASE_URL + '/' + foodtruckId, foodtruck);
    }

    deleteFoodTruck(foodtruckId){
        return axios.delete(FOOD_TRUCK_API_BASE_URL + '/' + foodtruckId);
    }
}

export default new FoodTruckService()