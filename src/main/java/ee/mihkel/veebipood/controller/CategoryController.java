package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.entity.Category;
import ee.mihkel.veebipood.repository.CategoryRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@CrossOrigin(origins = "*") // turvaelement --> lubab sellise serveri ligi
// alati lubatakse ligi Postman ja Brauser, sest nad ei ole serveris.
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("categories")
    public List<Category> getCategories(){
        return categoryRepository.findAll();
    }

    @PostMapping("categories")
    public ResponseEntity<List<Category>> saveCategory(@RequestBody Category category){
        System.out.println("1. Lisatakse kategooria...");
        log.info("2. Lisatakse kategooria...");

        if (category.getId() != null) {
            throw new RuntimeException("Cannot add with ID");
        }
        if (category.getName() == null || category.getName().isBlank()) {
            throw new RuntimeException("Cannot add without name");
        }
        if (categoryRepository.findByName(category.getName()) != null) {
            throw new RuntimeException("Category with that name already exists");
        }
        categoryRepository.save(category);
        return ResponseEntity.status(201).body(categoryRepository.findAll());
    }

    @DeleteMapping("categories/{id}")
    public ResponseEntity<List<Category>> deleteCategory(@PathVariable Long id){
        try {
            categoryRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Cannot delete when product uses it");
        }
        return ResponseEntity.status(200).body(categoryRepository.findAll());
    }
}
