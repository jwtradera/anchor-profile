use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct UserProfile {
    pub authority: Pubkey,

    pub name: String,
    pub location: String,
    pub likes: u16,
}

#[account]
#[derive(Default)]
pub struct UserLike {
    pub authority: Pubkey,
    pub follower: Pubkey,
    pub liked: bool,
}
