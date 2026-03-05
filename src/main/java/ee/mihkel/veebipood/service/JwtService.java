package ee.mihkel.veebipood.service;

import ee.mihkel.veebipood.entity.Person;
import ee.mihkel.veebipood.entity.PersonRole;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

@Service
public class JwtService {

    private String superSecretKey = "sctJXtDu06RfMhPgMpgPfA0B77dVMSEApBIFRBgUjo8";
    private SecretKey secretKey = Keys.hmacShaKeyFor(Decoders.BASE64URL.decode(superSecretKey));

    public String generateToken(Person person){
        return Jwts
                .builder()
                .signWith(secretKey)
                .id(person.getId().toString())
                .subject(person.getEmail())
                .issuer(person.getRole().toString())
                .compact();
    }

    public Person validateToken(String token){
        Claims claims = Jwts
                .parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
        Person person = new Person();
        person.setId(Long.parseLong(claims.getId()));
        person.setEmail(claims.getSubject());
        person.setRole(PersonRole.valueOf(claims.getIssuer()));
        return person;
    }
}
