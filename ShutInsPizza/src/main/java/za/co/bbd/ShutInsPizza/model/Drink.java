package za.co.bbd.ShutInsPizza.model;

public class Drink {
    private String Name;
    private int Price;

    public Drink(String name, int price) {
        Name = name;
        Price = price;
    }

    public String getName() {
        return Name;
    }

    public int getPrice() {
        return Price;
    }
}
