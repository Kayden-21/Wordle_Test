package za.co.bbd.ShutInsPizza.service;

import org.springframework.stereotype.Service;
import za.co.bbd.ShutInsPizza.model.Order;
import za.co.bbd.ShutInsPizza.model.OrderRequest;

import java.util.List;

@Service
public class OrderService {

    private double vat;

    public OrderService() {
        this.vat = 14;
    }

    public double getTotal(OrderRequest orders){
        double total = 0;

        for (Order order : orders.getPizzas()){
            total += order.getPrice() * order.getQuantity();
        }

        for (Order order : orders.getDrinks()){
            total += order.getPrice() * order.getQuantity();
        }

        return total;
    }

    public double getVATOfTotal(double total){
        return total * vat / 100;
    }

    public double getTotalWithVAT(double total, double VAT){
        return total + VAT;
    }

    public int getOrderTime(OrderRequest orders){
        int pizzaTime = 0;
        int pizzaCount = 0;

        for (Order pizza : orders.getPizzas()){
            pizzaCount += pizza.getQuantity();
        }

        if (pizzaCount > 0){
            pizzaTime += 10;
        }

        if(pizzaCount > 1){
            pizzaTime += (pizzaCount - 1) * 2;
        }

        if (orders.getDrinks().size() > 0){
            pizzaTime += 2;
        }

        return pizzaTime;
    }
}
