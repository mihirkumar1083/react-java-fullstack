package net.javaguides.springboot.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.FoodTruck;
import net.javaguides.springboot.repository.FoodTruckRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class FoodTruckController {

	@Autowired
	private FoodTruckRepository foodTruckRepository;

	@GetMapping("/foodtrucks")
	public List<FoodTruck> getAllFoodTrucks() {
		return foodTruckRepository.findAll();
	}

	@PostMapping("/foodtrucks")
	public FoodTruck createEmployee(@RequestBody FoodTruck employee) {
		return foodTruckRepository.save(employee);
	}

	@GetMapping("/foodtrucks/bydate/{date}")
	public ResponseEntity<List<FoodTruck>> getFoodTruckByDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
		List<FoodTruck> foodtrucks = foodTruckRepository.findByDate(date);
		if (foodtrucks == null) {
			throw new ResourceNotFoundException("Resource not found on server date " + date);
		}
		return ResponseEntity.ok(foodtrucks);
	}
	
	@GetMapping("/foodtrucks/{id}")
	public ResponseEntity<FoodTruck> getFoodTruckById(@PathVariable long id) {
		FoodTruck foodtruck = foodTruckRepository.findById(id).get();
		if (foodtruck == null) {
			throw new ResourceNotFoundException("Resource not found on server id " + id);
		}
		return ResponseEntity.ok(foodtruck);
	}

	@PutMapping("/foodtrucks/{id}")
	public ResponseEntity<FoodTruck> updateFoodTruck(@PathVariable Long id, @RequestBody FoodTruck foodTruckDetails) {
		FoodTruck foodTruck = foodTruckRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("foodtruck not exist with id :" + id));

		foodTruck.setName(foodTruckDetails.getName());
		foodTruck.setDate(foodTruckDetails.getDate());

		FoodTruck updatedFoodTruck = foodTruckRepository.save(foodTruck);
		return ResponseEntity.ok(updatedFoodTruck);
	}

}
