package za.co.bbd.ShutInsPizza.model;

import java.util.List;
import java.util.Map;

public class OrderResponse {

    private List<Order> orders;
    private double total;
    private double vat;
    private double totalWithVAT;

    public OrderResponse(List<Order> orders, double total, double vat, double totalWithVAT) {
        this.orders = orders;
        this.total = total;
        this.vat = vat;
        this.totalWithVAT = totalWithVAT;
    }
}
