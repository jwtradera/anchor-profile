import * as anchor from '@project-serum/anchor';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';

import { useMemo } from 'react';
import { PROFILE_PROGRAM_PUBKEY } from '../constants';
import { IDL as profileIdl } from '../constants/idl';

export function useProfileProgram(connection: anchor.web3.Connection, anchorWallet: AnchorWallet | undefined) {

    const program = useMemo(() => {
        if (anchorWallet) {
            const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions());
            return new anchor.Program(profileIdl, PROFILE_PROGRAM_PUBKEY, provider);
        }
    }, [
        connection,
        anchorWallet
    ])

    return program;
}
