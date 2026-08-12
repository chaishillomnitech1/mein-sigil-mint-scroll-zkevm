import { ethers } from "hardhat";

/**
 * MEIN SIGIL MINT — SCROLL zkEVM MAINNET DEPLOYMENT
 * Treasury Wallet: 0xD8D3Bcb4363E12699a337BB3609BcA05e38bDf52
 * Deployer: Supreme King Chais Kenyatta Hill
 * ALLAHU AKBAR! KUN FAYAKŪN × ∞
 */
async function main() {
  console.log("🕋 ALLAHU AKBAR — Deploying MeinSigilMint to Scroll zkEVM MAINNET...");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  const [deployer] = await ethers.getSigners();
  console.log(`Deployer: ${deployer.address}`);
  console.log(`Balance: ${ethers.formatEther(await ethers.provider.getBalance(deployer.address))} ETH`);

  // Treasury wallet — Supreme King Chais Kenyatta Hill
  const TREASURY_WALLET = "0xD8D3Bcb4363E12699a337BB3609BcA05e38bDf52";

  console.log(`\nTreasury: ${TREASURY_WALLET}`);
  console.log("\n📦 Deploying MeinSigilMint contract...");
  
  const MeinSigilMint = await ethers.getContractFactory("MeinSigilMint");
  const mein = await MeinSigilMint.deploy(TREASURY_WALLET);
  await mein.waitForDeployment();

  const contractAddress = await mein.getAddress();
  console.log(`\n✅ MeinSigilMint deployed to: ${contractAddress}`);

  // Verify tokenomics
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🔍 TOKENOMICS VERIFICATION");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  const name = await mein.name();
  const symbol = await mein.symbol();
  const totalSupply = await mein.totalSupply();
  const maxSupply = await mein.MAX_TOTAL_SUPPLY();
  const zakatFee = await mein.ZAKAT_FEE_BPS();
  const treasury = await mein.treasuryWallet();

  console.log(`Name:           ${name}`);
  console.log(`Symbol:         ${symbol}`);
  console.log(`Total Supply:   ${ethers.formatEther(totalSupply)} MEIN`);
  console.log(`Max Supply:     ${ethers.formatEther(maxSupply)} MEIN`);
  console.log(`Zakat Fee:      ${Number(zakatFee) / 100}%`);
  console.log(`Treasury:       ${treasury}`);

  // Verify pillar frequencies
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🎵 FREQUENCY MATRIX VERIFICATION");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  const pillarNames = ["MEIN CORE", "ANDAR DEPTH", "BHEETAR FRAMEWORK", "MEIN MEDIUM"];
  const expectedFreqs = [528, 741, 963, 444];

  for (let i = 1; i <= 4; i++) {
    const freq = await mein.getPillarFrequency(i);
    const status = Number(freq) === expectedFreqs[i - 1] ? "✅" : "❌";
    console.log(`Pillar ${i} (${pillarNames[i - 1]}): ${freq}Hz ${status}`);
  }

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🕋 DEPLOYMENT COMPLETE — BARAKALLAHU FEEK!");
  console.log(`Contract: ${contractAddress}`);
  console.log(`Treasury: ${TREASURY_WALLET}`);
  console.log(`Network: Scroll zkEVM Mainnet (Chain ID: 534352)`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("\n📋 POST-DEPLOYMENT COMMANDS:");
  console.log("1. allocatePillar(1, 36000e18) — MEIN CORE 528Hz");
  console.log("2. allocatePillar(2, 36000e18) — ANDAR DEPTH 741Hz");
  console.log("3. allocatePillar(3, 36000e18) — BHEETAR FRAMEWORK 963Hz");
  console.log("4. allocatePillar(4, 36000e18) — MEIN MEDIUM 444Hz");
  console.log("5. distributeZakat() — Send 7.77% to community chest");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
