import { ethers } from "hardhat";

async function main() {
  console.log("🕋 ALLAHU AKBAR — Deploying MeinSigilMint to Scroll zkEVM...");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  const [deployer] = await ethers.getSigners();
  console.log(`Deployer: ${deployer.address}`);
  console.log(`Balance: ${ethers.formatEther(await ethers.provider.getBalance(deployer.address))} ETH`);

  // Deploy with deployer as treasury (can be updated later)
  const treasuryAddress = deployer.address;

  console.log("\n📦 Deploying MeinSigilMint contract...");
  const MeinSigilMint = await ethers.getContractFactory("MeinSigilMint");
  const mein = await MeinSigilMint.deploy(treasuryAddress);
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
  console.log(`Network: Scroll zkEVM (Chain ID: ${(await ethers.provider.getNetwork()).chainId})`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
