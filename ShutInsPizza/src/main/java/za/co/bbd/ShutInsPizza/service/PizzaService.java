package za.co.bbd.ShutInsPizza.service;

import org.springframework.stereotype.Service;
import za.co.bbd.ShutInsPizza.model.Pizza;
import za.co.bbd.ShutInsPizza.repository.OrderRepository;

import java.util.List;
import java.util.Optional;
@Service
public class PizzaService {

    private final OrderRepository orderRepository;

    public PizzaService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }


    public List<Pizza> getAllPizzas(){
        return (List<Pizza>) orderRepository.getPizzas();
    }

    public Pizza getPizzaByName(String pizzaName){
        return orderRepository.getPizzaByName(pizzaName);
    }
}
