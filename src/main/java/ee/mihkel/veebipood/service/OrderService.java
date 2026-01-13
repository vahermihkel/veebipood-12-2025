package ee.mihkel.veebipood.service;

import ee.mihkel.veebipood.entity.Order;
import ee.mihkel.veebipood.entity.PaymentState;
import ee.mihkel.veebipood.entity.Person;
import ee.mihkel.veebipood.entity.Product;
import ee.mihkel.veebipood.model.*;
import ee.mihkel.veebipood.repository.OrderRepository;
import ee.mihkel.veebipood.repository.PersonRepository;
import ee.mihkel.veebipood.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    RestTemplate restTemplate;

    @Value("${everypay.url}")
    String baseUrl;

    @Value("${everypay.customerUrl}")
    String customerUrl;

    private double calculateCartSum(List<Product> products) {
        double sum = 0;
        for (Product product : products) {
            Product dbProduct = productRepository.findById(product.getId()).orElseThrow();
            sum += dbProduct.getPrice();
        }
        return sum;
    }

    public Order createOrder(Long personId, String pmName, List<Product> products) {
        Order order = new Order();
        order.setProducts(products);
        order.setCreated(new Date());
        order.setTotal(calculateCartSum(products));
        order.setParcelMachine(pmName);
        order.setPaymentState(PaymentState.INITIAL); // maksmata
        Person person = personRepository.findById(personId).orElseThrow();
        order.setPerson(person); // TODO: VÕTAME AUTENTIMISE KAUDU
        return orderRepository.save(order);
    }

    // ?order_reference=eqdsds10&payment_reference=a455530fca9c27837c8627c2db17012dce9d4a014e3ff2c5c80325aa723c5e71
    // ?order_reference=eqdsds11&payment_reference=7393d3f226cc7f75e7ff98df87bd66cbf5cf734cadb32fb1abbbded57e596b64
    public PaymentLink makePayment(Long id, double total) {
        String url = baseUrl + "/payments/oneoff";

        EveryPayBody body = new EveryPayBody();
        body.setAccount_name("EUR3D1");
        body.setNonce("bla" + ZonedDateTime.now() + UUID.randomUUID());
        body.setTimestamp(ZonedDateTime.now().toString());
        body.setAmount(total);
        body.setOrder_reference("eqdsds" + id);
        body.setCustomer_url(customerUrl);
        body.setApi_username("e36eb40f5ec87fa2");

        HttpHeaders headers = new HttpHeaders();
        headers.setBasicAuth("e36eb40f5ec87fa2", "7b91a3b9e1b74524c2e9fc282f8ac8cd");
        headers.setContentType(MediaType.APPLICATION_JSON);


        HttpEntity<EveryPayBody> entity = new HttpEntity<>(body, headers);

        EveryPayResponse response = restTemplate.exchange(url, HttpMethod.POST, entity, EveryPayResponse.class).getBody();
        if (response == null) {
            throw new RuntimeException("Failed to make payment");
        }
        PaymentLink paymentLink = new PaymentLink();
        paymentLink.setLink(response.getPayment_link());
        return paymentLink;
    }

    public List<ParcelMachine> getParcelMachines() {
        String url = "https://www.omniva.ee/locations.json";
        ParcelMachine[] body = restTemplate.exchange(url, HttpMethod.GET, null, ParcelMachine[].class).getBody();
        return Arrays.stream(body).filter(e -> e.getA0_NAME().equals("EE")).toList();
    }

    public OrderPaid checkPayment(String orderReference, String paymentReference) {
        String url = baseUrl + "/payments/"+paymentReference+"?api_username=e36eb40f5ec87fa2&detailed=false";
        HttpHeaders headers = new HttpHeaders();
            headers.setBasicAuth("e36eb40f5ec87fa2", "7b91a3b9e1b74524c2e9fc282f8ac8cd");
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<EveryPayBody> entity = new HttpEntity<>(null, headers);

        EveryPayStatus response = restTemplate.exchange(url, HttpMethod.GET, entity, EveryPayStatus.class).getBody();
        if (response == null) {
            throw new RuntimeException("Failed to check payment");
        }
//        System.out.println(response.getOrder_reference());
//        System.out.println(orderReference);
        if (!response.getOrder_reference().equals(orderReference)) {
            throw new RuntimeException("Order reference does not match");
        }
        Order order =  orderRepository.findById(Long.parseLong(response.getOrder_reference().replace("eqdsds",""))).orElseThrow();
        order.setPaymentState(PaymentState.valueOf(response.getPayment_state().toUpperCase()));
        OrderPaid orderPaid = new OrderPaid();
        orderPaid.setPaid(response.getPayment_state().equals("settled"));
        return orderPaid;
    }
}


