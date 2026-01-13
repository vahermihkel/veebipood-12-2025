package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.entity.Order;
import ee.mihkel.veebipood.entity.Product;
import ee.mihkel.veebipood.model.OrderPaid;
import ee.mihkel.veebipood.model.ParcelMachine;
import ee.mihkel.veebipood.model.PaymentLink;
import ee.mihkel.veebipood.repository.OrderRepository;
import ee.mihkel.veebipood.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderService orderService;


    @GetMapping("orders")
    public List<Order> getOrders(){
        return orderRepository.findAll();
    }

    @PostMapping("orders")
    public PaymentLink createOrder(@RequestParam Long personId, @RequestParam String pmName, @RequestBody List<Product> products){
       Order order = orderService.createOrder(personId, pmName, products);
       // miks on vaja enne maksmist order salvestada?
        // 1. maksmisel on meil vaja Orderi ID-d
        // 2. kui juhtub tehniline viga (raha läheb maha, aga meie rakenduses ei salvestu),
        //      siis on vähemalt tellimus tervikuna alles
        return orderService.makePayment(order.getId(), order.getTotal());
    }

    @GetMapping("parcelmachines")
    public List<ParcelMachine> getParcelMachines(){
        return orderService.getParcelMachines();
    }

    @GetMapping("check-payment")
    public OrderPaid checkPayment(@RequestParam String orderReference, String paymentReference) {
        return orderService.checkPayment(orderReference, paymentReference);
    }

    // localhost:8080/payment?total=10&order_reference=1234
//    @GetMapping("payment")
//    public String makePayment(@RequestParam double total, @RequestParam String order_reference){
//
//    }
}
