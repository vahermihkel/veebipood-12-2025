package ee.mihkel.veebipood;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class VeebipoodApplication {

    public static void main(String[] args) {
        SpringApplication.run(VeebipoodApplication.class, args);
    }

}

// 70ak/h --> kohtumisi    70/4= 17.5 kohtumist
// 1. T 18.11 - vanilla Java (game)
// 2. K 19.11 - Spring algus (controller, entity, repository)
// 3. K 26.11 - exception handlimine, Order´+ Person
// 4. N 27.11 - rendipood (models, Custom Repository)
// 5. E 01.12 - rendipood (unit testid)
// 6. N 04.12 - rendipood (unit testid), veebipood hinna arvutamine
// 7. E 08.12 - React - algus, GET päringud
// 8. N 11.12 - React - navigeerimine
// 9. E 15.12 - React - POST päring (lisamine)
//10. N 18.12 - React - rendipood
//11. T 23.12 - React - useParams
//12. E 29.12 - pagination, ostukorv
//13. E 05.01 - Pakiautomaadid. RestTemplate + makse. @Autowired.
//14. N 08.01 - makse lõpetamine + front-end hosting ehk Firebase
//15. T 13.01 - makse kontroll
//16. N 15.01 - auth
//17. N 22.01 - cache, front-end testid
// ----> kokku leppida mingid päevad kus saame koos vaadata lõpuprojekti
//18. N 05.02? --> 17.30-19.00 lõpuprojekti esitlemine
//18. N 12.02? --> 16.00-17.30

// full-stack arendus: proovitöö. kodutöö edasiarenduse. või täiesti ise mõelda mingi projekti valmis
