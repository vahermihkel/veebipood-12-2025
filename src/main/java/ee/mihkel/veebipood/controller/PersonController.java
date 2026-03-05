package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.dto.PersonLoginDto;
import ee.mihkel.veebipood.entity.Person;
import ee.mihkel.veebipood.repository.PersonRepository;
import ee.mihkel.veebipood.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin(origins = "http://localhost:5173")
//@CrossOrigin(origins = "*")
public class PersonController {

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private JwtService jwtService;

    @GetMapping("persons")
    public List<Person> getPersons(){
        return personRepository.findAll();
    }

    @PostMapping("login")
    public String login(@RequestBody PersonLoginDto personLoginDto){
        Person dbPerson = personRepository.findByEmail(personLoginDto.getEmail());
        if (dbPerson==null){
            return "Invalid email";
        }
        if (!dbPerson.getPassword().equals(personLoginDto.getPassword())){
            return "Invalid password";
        }
        return jwtService.generateToken(dbPerson);
        // eyJhbGciOiJub25lIn0..
        // ALGORITM.PAYLOAD.VÕTI
    }

    @PostMapping("signup")
    public Person signup(@RequestBody Person person){
        if (personRepository.findByEmail(person.getEmail())!=null){
            throw new RuntimeException("Email already in use");
        }
        return personRepository.save(person);
    }

    @GetMapping("profile")
    public Person getPerson(){
        Long personId = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        return personRepository.findById(personId).orElseThrow();
    }

    @PutMapping("profile")
    public Person updatePerson(@RequestBody Person person){
        Long personId = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        if (!person.getId().equals(personId)){
            throw new RuntimeException("Cannot update another person");
        }
        Person dbPerson = personRepository.findByEmail(person.getEmail());
        if (dbPerson != null && !dbPerson.getId().equals(personId)){ // leidis isiku && pole tokeniga sama ID
            throw new RuntimeException("Email already in use");
        }
        return personRepository.save(person);
    }
}
