package ee.mihkel.veebipood.repository;

import ee.mihkel.veebipood.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Long> {
    // spetsiifiliselt ühe välja kaudu tehtavad päringud tuleb siin ükshaaval teha
    Category findByName(String name);
}
