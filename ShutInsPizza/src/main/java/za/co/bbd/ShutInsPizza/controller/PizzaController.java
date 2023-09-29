package za.co.bbd.ShutInsPizza.controller;

import org.springframework.web.bind.annotation.*;
import za.co.bbd.ShutInsPizza.model.*;
import za.co.bbd.ShutInsPizza.service.DrinkService;
import za.co.bbd.ShutInsPizza.service.OrderService;
import za.co.bbd.ShutInsPizza.service.PizzaService;

import java.util.ArrayList;
import java.util.List;

@RestController
public class PizzaController {

    private final PizzaService pizzaService;
    private final DrinkService drinkService;
    private final OrderService orderService;

    public PizzaController(PizzaService pizzaService, DrinkService drinkService, OrderService orderService) {
        this.pizzaService = pizzaService;
        this.drinkService = drinkService;
        this.orderService = orderService;
    }

    @GetMapping("/pizzas")
    List<Pizza> getPizzas(){
        return pizzaService.getAllPizzas();
    }

    @GetMapping("/pizza")
    Pizza getPizza(@RequestParam(value = "pizzaName", defaultValue = "Margherita Classic") String name){
        return pizzaService.getPizzaByName(name);
    }

    @GetMapping("/drinks")
    List<Drink> getDrinks(){
        return drinkService.getAllDrinks();
    }

    @GetMapping("/drink")
    Drink getDrink(@RequestParam(value = "drinkName", defaultValue = "Coca-Cola") String name){
        return drinkService.getDrinkByName(name);
    }

    @GetMapping("/order")
    OrderResponse order(OrderRequest orderRequest){
        List<Order> orders = new ArrayList<>();
        for (Order order : orderRequest.getPizzas()){
            orders.add(new Order(order.getName(), order.getQuantity(), order.getQuantity() * order.getPrice()));
        }

        for (Order order : orderRequest.getDrinks()){
            orders.add(new Order(order.getName(), order.getQuantity(), order.getQuantity() * order.getPrice()));
        }

        double total = orderService.getTotal(orderRequest);
        double VAT = orderService.getVATOfTotal(total);
        double totalWithVAT = orderService.getTotalWithVAT(total, VAT);
        return new OrderResponse(orders, total, VAT, totalWithVAT);
    }

    @GetMapping("/order/time")
    int getOrderTime(OrderRequest orderRequest){
        return orderService.getOrderTime(orderRequest);
    }
}
