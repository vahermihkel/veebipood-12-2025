package ee.mihkel.veebipood.exception;

import lombok.Data;

import java.util.Date;

@Data // @Getter ja @Setteri. NoArgsConstructor tekib automaatselt.
public class ErrorMessage {
    private String message;
    private Date timestamp;
    private int status;
}
