package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.entity.Person;
import ee.mihkel.veebipood.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin(origins = "*")
public class PersonController {

    @Autowired
    private PersonRepository personRepository;

    @GetMapping("persons")
    public List<Person> getPersons(){
        return personRepository.findAll();
    }

    @PostMapping("login")
    public String login(@RequestBody Person person){
        return "Login successful";
    }

    @PostMapping("signup")
    public Person signup(@RequestBody Person person){
        return personRepository.save(person);
    }
}
