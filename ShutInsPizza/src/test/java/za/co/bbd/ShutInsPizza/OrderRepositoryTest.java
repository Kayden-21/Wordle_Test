package za.co.bbd.ShutInsPizza;

import org.junit.Before;
import org.junit.Test;
import za.co.bbd.ShutInsPizza.model.Drink;
import za.co.bbd.ShutInsPizza.model.Pizza;
import za.co.bbd.ShutInsPizza.repository.OrderRepository;

import java.util.List;
import static org.junit.Assert.*;

public class OrderRepositoryTest {

    private OrderRepository orderRepository;

    @Before
    public void setUp() {
        orderRepository = new OrderRepository();
    }

    @Test
    public void testGetPizzas() {
        List<Pizza> pizzas = orderRepository.getPizzas();
        assertNotNull(pizzas);
        assertFalse(pizzas.isEmpty());
        assertEquals(20, pizzas.size()); // Assuming 20 pizzas are added in the sample data
    }

    @Test
    public void testGetDrinks() {
        List<Drink> drinks = orderRepository.getDrinks();
        assertNotNull(drinks);
        assertFalse(drinks.isEmpty());
        assertEquals(10, drinks.size()); // Assuming 10 drinks are added in the sample data
    }

    @Test
    public void testGetPizzaByName() {
        Pizza pizza = orderRepository.getPizzaByName("Margherita Classic");
        assertNotNull(pizza);
        assertEquals("Margherita Classic", pizza.getName());
    }

    @Test
    public void testGetDrinkByName() {
        Drink drink = orderRepository.getDrinkByName("Coca-Cola");
        assertNotNull(drink);
        assertEquals("Coca-Cola", drink.getName());
    }
}

