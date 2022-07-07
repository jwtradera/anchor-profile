import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { AnchorProfile } from "../target/types/anchor_profile";

describe("anchor-profile", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.AnchorProfile as Program<AnchorProfile>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
