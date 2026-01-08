package ee.mihkel.veebipood.entity;

public enum PaymentState {
    INITIAL, // alguses
    SETTLED,  // õnnestunud
    FAILED,  // tehniline probleem
    ABANDONED, // 15 minutit oodanud
    VOIDED // kasutaja ise lõpetanud
}
