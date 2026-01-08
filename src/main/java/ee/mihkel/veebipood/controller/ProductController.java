package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.entity.Product;
import ee.mihkel.veebipood.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // BASE URL      +   API endpoint
    // localhost:8080/hi
//    @GetMapping("hi")
//    public String hello(){
//        return "Hello World";
//    }
//
//    @RequestMapping(value = "hi2", method = RequestMethod.GET)
//    public String hello2(){
//        return "Hello World";
//    }

    @GetMapping("products")
    public Page<Product> getProducts(@RequestParam Long categoryId, Pageable pageable) {
        if (categoryId == 0) {
            return productRepository.findByActiveTrue(pageable); // SELECT * FROM products;
        } else {
            return productRepository.findByActiveTrueAndCategory_Id(pageable, categoryId);
        }
    }

    @GetMapping("admin-products")
    public List<Product> getAdminProducts() {
        return productRepository.findByOrderByIdAsc();
    }

    @PostMapping("products")
    public List<Product> saveProduct(@RequestBody Product product){
        if (product.getId() != null) {
            throw new RuntimeException("Cannot add with ID");
        }
        productRepository.save(product);
        return productRepository.findByOrderByIdAsc(); // SELECT * FROM products;
    }

    // DELETE  localhost:8080/products/2
    @DeleteMapping("products/{id}")
    public List<Product> deleteProduct(@PathVariable Long id){
        productRepository.deleteById(id);
        return productRepository.findByOrderByIdAsc(); // SELECT * FROM products;
    }

    // DELETE  localhost:8080/products?id=2
//    @DeleteMapping("products2")
//    public List<Product> deleteProduct2(@RequestParam Long id){
//        productRepository.deleteById(id);
//        return productRepository.findAll(); // SELECT * FROM products;
//    }

    // public ---> kõikidel API päringute funktsioonidel on see public ehk nad on avalikud
    // String ---> andmetüüp mida tagastan päringu lõpuks
    // hello() ---> funktsiooni nimi, mida ei kutsuta välja
    // return "" ---> väärtus mida tagastan päringu lõpuks

    @GetMapping("products/{id}")
    public Product getProduct(@PathVariable Long id){
        return productRepository.findById(id).orElseThrow(); // SELECT * FROM products;
    }

    @PutMapping("products")
    public List<Product> updateProduct(@RequestBody Product product){
        if (product.getId() == null) {
            throw new RuntimeException("Cannot edit with ID");
        }
        productRepository.save(product);
        return productRepository.findByOrderByIdAsc(); // SELECT * FROM products;
    }

}
