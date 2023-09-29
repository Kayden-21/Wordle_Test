package za.co.bbd.ShutInsPizza.service;

import org.springframework.stereotype.Service;
import za.co.bbd.ShutInsPizza.model.Drink;
import za.co.bbd.ShutInsPizza.repository.OrderRepository;

import java.util.List;

@Service
public class DrinkService {

    private final OrderRepository orderRepository;

    public DrinkService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Drink> getAllDrinks(){
        return orderRepository.getDrinks();
    }

    public Drink getDrinkByName(String drinkName){
        return orderRepository.getDrinkByName(drinkName);
    }
}
