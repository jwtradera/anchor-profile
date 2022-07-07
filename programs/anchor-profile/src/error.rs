use anchor_lang::prelude::*;

#[error_code]
pub enum ProfileError {
    #[msg("You are not authorized to perform this action.")]
    Unauthorized,
    #[msg("NotAllowed")]
    NotAllowed,
    #[msg("Math operation overflow")]
    MathOverflow,
}
