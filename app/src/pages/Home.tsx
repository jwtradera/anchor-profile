import React, { FC, useState, useEffect, useMemo } from 'react';
import * as anchor from "@project-serum/anchor";
import { useConnection, useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';

import {
    Button,
    Box,
    Typography,
    Container,
    TextField,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@mui/material';
import styled from 'styled-components'
import { PublicKey, ParsedAccountData, Transaction, SystemProgram } from '@solana/web3.js';

import Header from '../components/Header';
import { useProfileProgram } from '../hooks';
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { Link } from 'react-router-dom';


const Home: FC = () => {

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const anchorWallet = useAnchorWallet();
    const program = useProfileProgram(connection, anchorWallet);

    const [profiles, setProfiles] = useState<Array<any>>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const findProfileAccounts = async() => {

            if(program) {
                setLoading(true);

                const profileAccounts = await program.account.userProfile.all();
                const _profiles = profileAccounts.map(item => item.account);
                setProfiles(_profiles);

                setLoading(false);
            }
        }

        findProfileAccounts();

    }, [
        publicKey, program
    ])

    return (
        <Container maxWidth="lg">

            <Header />

            <Box flexDirection='column' justifyContent='center' display='flex' height='600px' gap='24px'>

                <h1>
                    Users list
                </h1>

                {
                    loading ? <p>Loading...</p>
                    : <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Wallet Address</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Likes</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            profiles.map((profile, idx) => <TableRow key={idx}>
                                <TableCell>{idx + 1}</TableCell>
                                <TableCell>{profile.authority.toString()}</TableCell>
                                <TableCell>{profile.name}</TableCell>
                                <TableCell>{profile.location}</TableCell>
                                <TableCell>{profile.likes}</TableCell>
                                <TableCell>
                                    <Link to={"/profile/" + profile.authority.toString()}>View</Link>
                                </TableCell>                            
                            </TableRow>)
                        }
                        </TableBody>
                    </Table>
                    
                }

            </Box>

        </Container >

    );
};

export default Home;
