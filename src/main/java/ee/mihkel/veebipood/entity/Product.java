package ee.mihkel.veebipood.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double price;
    private boolean active;
    private int stock;

    // parempoolne tähendab, et tootel on 1 kategooria
    // @OneToOne ---> ükski teine toode ei tohi seda kategooriat võtta
    @ManyToOne // ---> teine toode võib ka samat kategooriat kasutada
    private Category category;

//    @OneToOne ---> kas seda pean eraldiseisvalt lisama (eraldi nupuna / päringuna)
    // kui kustutan Toote, kas on loogiline, et Ingredients jääb alles?
//    private Ingredients ingredients;
}
