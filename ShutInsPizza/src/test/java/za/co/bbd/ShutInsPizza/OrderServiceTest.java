package za.co.bbd.ShutInsPizza;

import org.junit.Before;
import org.junit.Test;
import za.co.bbd.ShutInsPizza.model.Order;
import za.co.bbd.ShutInsPizza.model.OrderRequest;
import za.co.bbd.ShutInsPizza.service.OrderService;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class OrderServiceTest {

    private OrderService orderService;

    @Before
    public void setUp() {
        orderService = new OrderService();
    }

    @Test
    public void testGetTotal() {
        List<Order> pizzas = new ArrayList<>();
        List<Order> drinks = new ArrayList<>();
        pizzas.add(new Order("Margherita Classic", 3, 80));
        drinks.add(new Order("Coca-Cola", 2, 20));
        OrderRequest orderRequest = new OrderRequest(pizzas, drinks);

        double total = orderService.getTotal(orderRequest);

        assertEquals(280.0, total, 0.001); // Use 0.001 tolerance for floating-point comparison
    }

    @Test
    public void testGetVATOfTotal() {
        double total = 100.0;
        double vat = orderService.getVATOfTotal(total);

        assertEquals(14.0, vat, 0.001);
    }

    @Test
    public void testGetTotalWithVAT() {
        double total = 100.0;
        double vat = 14.0;
        double totalWithVAT = orderService.getTotalWithVAT(total, vat);

        assertEquals(114.0, totalWithVAT, 0.001);
    }

    @Test
    public void testGetOrderTime() {
        List<Order> pizzas = new ArrayList<>();
        List<Order> drinks = new ArrayList<>();
        pizzas.add(new Order("Margherita Classic", 80));
        pizzas.add(new Order("Pepperoni Passion", 2, 95));
        drinks.add(new Order("Coca-Cola", 20));
        OrderRequest orderRequest = new OrderRequest(pizzas, drinks);

        int orderTime = orderService.getOrderTime(orderRequest);

        assertEquals(16, orderTime);
    }
}

