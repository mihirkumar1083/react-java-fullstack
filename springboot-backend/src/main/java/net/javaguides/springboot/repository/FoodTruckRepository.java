package net.javaguides.springboot.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.javaguides.springboot.model.FoodTruck;

@Repository
public interface FoodTruckRepository extends JpaRepository<FoodTruck, Long>{	
	List<FoodTruck> findByDate(LocalDate date);
}
