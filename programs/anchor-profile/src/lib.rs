use anchor_lang::prelude::*;

pub mod constant;
pub mod error;
pub mod states;
use crate::{constant::*, error::*, states::*};

declare_id!("GqSwCj2f6U7K6NmNr4EfpxSrGe1SKB8wVuBtGkgMjiQo");

#[program]
pub mod anchor_profile {
    use super::*;

    pub fn create_profile(
        ctx: Context<CreateProfile>,
        _name: String,
        _location: String,
    ) -> Result<()> {
        let user_profile = &mut ctx.accounts.user_profile;
        user_profile.authority = ctx.accounts.authority.key();
        user_profile.name = _name;
        user_profile.location = _location;
        user_profile.likes = 0;

        Ok(())
    }

    pub fn update_profile(
        ctx: Context<UpdateProfile>,
        _name: String,
        _location: String,
    ) -> Result<()> {
        let user_profile = &mut ctx.accounts.user_profile;
        user_profile.name = _name;
        user_profile.location = _location;

        Ok(())
    }

    pub fn like_profile(ctx: Context<LikeProfile>, follower: Pubkey) -> Result<()> {
        if is_zero_account(&ctx.accounts.user_like.to_account_info()) {
            ctx.accounts.user_like.authority = ctx.accounts.authority.key();
            ctx.accounts.user_like.follower = follower.key();
            ctx.accounts.user_like.liked = true;
        } else {
            require!(!ctx.accounts.user_like.liked, ProfileError::NotAllowed);
            ctx.accounts.user_like.liked = true;
        }

        let user_profile = &mut ctx.accounts.user_profile;
        user_profile.likes = user_profile.likes.checked_add(1).unwrap();

        Ok(())
    }

    pub fn unlike_profile(ctx: Context<UnlikeProfile>, follower: Pubkey) -> Result<()> {
        require!(ctx.accounts.user_like.liked, ProfileError::NotAllowed);
        ctx.accounts.user_like.liked = false;

        let user_profile = &mut ctx.accounts.user_profile;
        user_profile.likes = user_profile.likes.checked_sub(1).unwrap();

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction()]
pub struct CreateProfile<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        seeds = [PROFILE_TAG, authority.key().as_ref()],
        bump,
        payer = authority,
        space = 8 + 1000,
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction()]
pub struct UpdateProfile<'info> {
    #[account(
        mut,
        seeds = [PROFILE_TAG, authority.key().as_ref()],
        bump,
        constraint = user_profile.authority.key() == authority.key(),
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(follower: Pubkey)]
pub struct LikeProfile<'info> {
    #[account(
        mut,
        seeds = [PROFILE_TAG, follower.key().as_ref()],
        bump,
        constraint = user_profile.authority.key() == follower.key(),
        constraint = follower.key() != authority.key(),
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(
        init_if_needed,
        seeds = [LIKE_TAG, authority.key().as_ref(), follower.key().as_ref()],
        bump,
        payer = authority,
        space = std::mem::size_of::<UserLike>() + 8,
    )]
    pub user_like: Box<Account<'info, UserLike>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(follower: Pubkey)]
pub struct UnlikeProfile<'info> {
    #[account(
        mut,
        seeds = [PROFILE_TAG, follower.key().as_ref()],
        bump,
        constraint = user_profile.authority.key() == follower.key(),
        constraint = follower.key() != authority.key(),
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(
        mut,
        seeds = [LIKE_TAG, authority.key().as_ref(), follower.key().as_ref()],
        bump,
        constraint = user_like.authority.key() == authority.key(),
        constraint = user_like.follower.key() == follower.key(),
    )]
    pub user_like: Box<Account<'info, UserLike>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn is_zero_account(account_info: &AccountInfo) -> bool {
    let account_data: &[u8] = &account_info.data.borrow();
    let len = account_data.len();
    let mut is_zero = true;
    for i in 0..len - 1 {
        if account_data[i] != 0 {
            is_zero = false;
        }
    }
    is_zero
}

pub fn bump(seeds: &[&[u8]], program_id: &Pubkey) -> u8 {
    let (_found_key, bump) = Pubkey::find_program_address(seeds, program_id);
    bump
}
