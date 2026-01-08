package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.entity.Product;
import ee.mihkel.veebipood.model.Supplier1Product;
import ee.mihkel.veebipood.model.Supplier2Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class SupplierController {

    @Autowired
    RestTemplate restTemplate;

    // tarnija.
    // nt Hiinast võtame tooteid, peame manuaalselt käima AliExpressis vms vaatamas
    // aga nemad annavad API endpoindi, et saaksin reaalajas tooteid mida osta näha

    @GetMapping("supplier1")
    public List<Supplier1Product> getProductsFromSupplier1(){

        System.out.println(restTemplate);

        String url = "https://fakestoreapi.com/products";
        Supplier1Product[] body = restTemplate.exchange(url, HttpMethod.GET, null, Supplier1Product[].class).getBody();
        return Arrays.stream(body).filter(e -> e.getRating().getRate() > 3.0).toList();
    }

    @GetMapping("supplier2")
    public List<Supplier2Product> getProductsFromSupplier2(){

        System.out.println(restTemplate);

        String url = "https://api.escuelajs.co/api/v1/products";
        Supplier2Product[] body = restTemplate.exchange(url, HttpMethod.GET, null, Supplier2Product[].class).getBody();
        return Arrays.stream(body).filter(e -> e.getPrice() > 3.0).sorted(Comparator.comparing(Supplier2Product::getPrice)).toList();
    }
}
