package za.co.bbd.ShutInsPizza.model;

import java.util.List;

public class OrderRequest {

    List<Order> pizzas;

    List<Order> drinks;

    public OrderRequest(List<Order> pizzas, List<Order> drinks) {
        this.pizzas = pizzas;
        this.drinks = drinks;
    }

    public List<Order> getPizzas() {
        return pizzas;
    }

    public List<Order> getDrinks() {
        return drinks;
    }

}
