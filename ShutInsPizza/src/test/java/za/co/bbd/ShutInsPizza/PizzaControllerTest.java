package za.co.bbd.ShutInsPizza;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import za.co.bbd.ShutInsPizza.controller.PizzaController;
import za.co.bbd.ShutInsPizza.model.Pizza;
import za.co.bbd.ShutInsPizza.service.PizzaService;

import java.util.ArrayList;
import java.util.List;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@WebMvcTest(PizzaController.class)
public class PizzaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @InjectMocks
    private PizzaController pizzaController;

    @Mock
    private PizzaService pizzaService;

    @Mock
    private PizzaService drinkService;

    @Mock
    private PizzaService orderService;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetPizzas() throws Exception {
        List<Pizza> pizzas = new ArrayList<>();
        pizzas.add(new Pizza("Pepperoni Passion", "Spicy pepperoni, tomato sauce, mozzarella", 95));
        pizzas.add(new Pizza("Veggie Supreme", "Mushrooms, bell peppers, onions, olives, mozzarella", 90));
        pizzas.add(new Pizza("BBQ Chicken Delight", "BBQ sauce, grilled chicken, red onions, mozzarella", 100));
        pizzas.add(new Pizza("Hawaiian Luau", "Ham, pineapple, tomato sauce, mozzarella", 85));
        pizzas.add(new Pizza("Meat Lovers Feast", "Pepperoni, sausage, bacon, ground beef, mozzarella", 110));

        when(pizzaService.getAllPizzas()).thenReturn(pizzas);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/pizzas")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON));
    }
}
