package za.co.bbd.ShutInsPizza.repository;

import org.springframework.stereotype.Service;
import za.co.bbd.ShutInsPizza.model.Drink;
import za.co.bbd.ShutInsPizza.model.Pizza;

import java.util.ArrayList;
import java.util.List;
@Service
public class OrderRepository {

    private List<Pizza> pizzas;
    private List<Drink> drinks;

    public OrderRepository(){
        pizzas = new ArrayList<>();
        drinks = new ArrayList<>();
        populate();
    }

    public List<Pizza> getPizzas() {
        return pizzas;
    }

    public List<Drink> getDrinks() {
        return drinks;
    }

    public Pizza getPizzaByName(String pizzaName){
       for (Pizza pizza : pizzas){
           if (pizza.getName().equalsIgnoreCase(pizzaName)){
               return pizza;
           }
       }
       return null;
    }

    public Drink getDrinkByName(String drinkName){
        for (Drink drink : drinks){
            if (drink.getName().equalsIgnoreCase(drinkName)){
                return drink;
            }
        }
        return null;
    }

    private void populate(){
        pizzas.add(new Pizza("Margherita Classic", "Fresh tomato sauce, mozzarella cheese, basil", 80));
        pizzas.add(new Pizza("Pepperoni Passion", "Spicy pepperoni, tomato sauce, mozzarella", 95));
        pizzas.add(new Pizza("Veggie Supreme", "Mushrooms, bell peppers, onions, olives, mozzarella", 90));
        pizzas.add(new Pizza("BBQ Chicken Delight", "BBQ sauce, grilled chicken, red onions, mozzarella", 100));
        pizzas.add(new Pizza("Hawaiian Luau", "Ham, pineapple, tomato sauce, mozzarella", 85));
        pizzas.add(new Pizza("Meat Lovers Feast", "Pepperoni, sausage, bacon, ground beef, mozzarella", 110));
        pizzas.add(new Pizza("Pesto Paradise", "Pesto sauce, cherry tomatoes, fresh basil, mozzarella", 95));
        pizzas.add(new Pizza("Mediterranean Magic", "Feta cheese, Kalamata olives, artichoke hearts, spinach, mozzarella", 105));
        pizzas.add(new Pizza("Four Cheese Bliss", "Mozzarella, cheddar, parmesan, gouda, garlic, tomato sauce", 95));
        pizzas.add(new Pizza("Spicy Veggie Fiesta", "Jalapeños, black beans, corn, red onions, mozzarella", 90));
        pizzas.add(new Pizza("Supreme Seafood Sensation", "Shrimp, crab, garlic butter, mozzarella", 115));
        pizzas.add(new Pizza("BBQ Pulled Pork", "BBQ pulled pork, red onions, coleslaw, mozzarella", 105));
        pizzas.add(new Pizza("Margherita Caprese", "Fresh tomato slices, fresh mozzarella, basil, balsamic glaze", 95));
        pizzas.add(new Pizza("Spinach and Artichoke Delight", "Creamy spinach and artichoke sauce, mozzarella", 100));
        pizzas.add(new Pizza("Buffalo Chicken Heatwave", "Buffalo sauce, spicy chicken, red onions, blue cheese", 110));
        pizzas.add(new Pizza("Ranchero Rancher", "Ranch dressing, grilled chicken, bacon, bell peppers, mozzarella", 105));
        pizzas.add(new Pizza("Sweet and Savory Fig", "Figs, prosciutto, arugula, balsamic glaze, mozzarella", 115));
        pizzas.add(new Pizza("Taco Tuesday", "Seasoned ground beef, lettuce, tomatoes, cheddar cheese, sour cream", 95));
        pizzas.add(new Pizza("Thai Peanut Fusion", "Thai peanut sauce, chicken, bell peppers, peanuts", 100));
        pizzas.add(new Pizza("Breakfast Brunch Pizza", "Scrambled eggs, bacon, sausage, cheddar, breakfast potatoes", 110));

        drinks.add(new Drink("Coca-Cola", 20));
        drinks.add(new Drink("Sprite", 18));
        drinks.add(new Drink("Fanta Orange", 22));
        drinks.add(new Drink("Pepsi", 20));
        drinks.add(new Drink("Lemonade", 25));
        drinks.add(new Drink("Iced Tea", 24));
        drinks.add(new Drink("Root Beer", 26));
        drinks.add(new Drink("Ginger Ale", 23));
        drinks.add(new Drink("Mango Lassi", 30));
        drinks.add(new Drink("Sparkling Water", 15));
    }
}
