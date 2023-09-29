package za.co.bbd.ShutInsPizza.model;

public class Order {

    private String name;
    private int quantity;
    private int price;

    public Order(String name, int quantity, int price) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }

    public Order(String name, int price) {
        this.name = name;
        this.quantity = 1;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public int getQuantity() {
        return quantity;
    }

    public int getPrice() {
        return price;
    }
}
