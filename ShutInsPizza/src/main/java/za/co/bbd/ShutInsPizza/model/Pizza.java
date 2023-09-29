package za.co.bbd.ShutInsPizza.model;

public class Pizza {
    private String Name;
    private String Description;
    private int Price;

    public Pizza(String name, String description, int price) {
        Name = name;
        Description = description;
        Price = price;
    }

    public String getName() {
        return Name;
    }

    public String getDescription() {
        return Description;
    }

    public int getPrice() {
        return Price;
    }
}
