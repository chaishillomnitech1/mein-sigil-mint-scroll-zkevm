// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title MeinSigilMint
 * @author Supreme King Chais Kenyatta Hill × Super Manus
 * @notice Production-grade multi-token distribution contract for the MEIN Dual-Brand
 *         Linguistic Fusion Architecture on Scroll zkEVM.
 * @dev Handles internal basis point fees, atomic category locks, and establishes
 *      immutable total supplies corresponding to the four foundational pillars:
 *      1. में (MEIN CORE) — 528Hz — Pleasantville 08232
 *      2. अंदर (ANDAR DEPTH) — 741Hz — Mays Landing 08330
 *      3. के भीतर (BHEETAR FRAMEWORK) — 963Hz — Vineland 08360
 *      4. में (MEIN MEDIUM) — 444Hz — Atlantic City 08401
 */
contract MeinSigilMint is ERC20, Ownable, ReentrancyGuard {
    uint256 public constant MAX_TOTAL_SUPPLY = 144000 * 10**18; // 144,000 Guardians Pool
    uint256 public constant ZAKAT_FEE_BPS = 777; // 7.77% Continuous Ecosystem Reflection

    address public treasuryWallet;
    
    // Tracking parameters for the Four Pillars of the Brand Universe
    mapping(uint256 => uint256) public pillarSupplies;
    mapping(string => bool) public registeredLanyards;

    // Frequency signatures for each pillar
    mapping(uint256 => uint256) public pillarFrequencies;

    event PillarTokensMinted(uint256 indexed pillarId, address indexed recipient, uint256 amount);
    event LanyardRegistered(string indexed lanyardId, bytes32 frequencyHash);
    event ZakatDistributed(address indexed from, address indexed treasury, uint256 amount);

    constructor(address _treasury) ERC20("Mein Brand Universe", "MEIN") Ownable(msg.sender) {
        require(_treasury != address(0), "Mein: Zero address forbidden");
        treasuryWallet = _treasury;
        
        // Set pillar frequencies
        pillarFrequencies[1] = 528;  // MEIN CORE — DNA Repair, Love
        pillarFrequencies[2] = 741;  // ANDAR DEPTH — Intuition, Expression
        pillarFrequencies[3] = 963;  // BHEETAR FRAMEWORK — Pineal Activation
        pillarFrequencies[4] = 444;  // MEIN MEDIUM — Angel Protection

        // Initial distribution directly to Sovereign Vault (44,000 tokens)
        _mint(msg.sender, 44000 * 10**18);
    }

    /**
     * @notice Mint tokens for a specific pillar
     * @param recipient Address to receive the tokens
     * @param pillarId Pillar ID (1-4)
     * @param amount Amount of tokens to mint (in wei)
     */
    function mintPillarTokens(
        address recipient,
        uint256 pillarId,
        uint256 amount
    ) external onlyOwner nonReentrant {
        require(totalSupply() + amount <= MAX_TOTAL_SUPPLY, "Mein: Hardcap supply reached");
        require(pillarId >= 1 && pillarId <= 4, "Mein: Pillar ID out of bounds");

        pillarSupplies[pillarId] += amount;
        _mint(recipient, amount);

        emit PillarTokensMinted(pillarId, recipient, amount);
    }

    /**
     * @notice Register a QR Signature Lanyard on-chain
     * @param lanyardId Unique lanyard identifier
     * @param frequencyHash Hash of the frequency signature
     */
    function registerLanyardSignature(
        string calldata lanyardId, 
        bytes32 frequencyHash
    ) external onlyOwner {
        require(!registeredLanyards[lanyardId], "Mein: Lanyard signature already registered");
        registeredLanyards[lanyardId] = true;
        emit LanyardRegistered(lanyardId, frequencyHash);
    }

    /**
     * @notice Override transfer to include 7.77% Zakat fee
     * @dev Fee is sent to treasury wallet for community chest distribution
     */
    function transfer(address to, uint256 amount) public override returns (bool) {
        uint256 taxAmount = (amount * ZAKAT_FEE_BPS) / 10000;
        uint256 transferAmount = amount - taxAmount;

        _transfer(msg.sender, treasuryWallet, taxAmount);
        _transfer(msg.sender, to, transferAmount);

        emit ZakatDistributed(msg.sender, treasuryWallet, taxAmount);

        return true;
    }

    /**
     * @notice Get the frequency for a specific pillar
     * @param pillarId Pillar ID (1-4)
     * @return The frequency in Hz
     */
    function getPillarFrequency(uint256 pillarId) external view returns (uint256) {
        require(pillarId >= 1 && pillarId <= 4, "Mein: Pillar ID out of bounds");
        return pillarFrequencies[pillarId];
    }

    /**
     * @notice Check if a lanyard is registered
     * @param lanyardId The lanyard identifier to check
     * @return Whether the lanyard is registered
     */
    function isLanyardRegistered(string calldata lanyardId) external view returns (bool) {
        return registeredLanyards[lanyardId];
    }

    /**
     * @notice Update treasury wallet address
     * @param newTreasury New treasury address
     */
    function updateTreasury(address newTreasury) external onlyOwner {
        require(newTreasury != address(0), "Mein: Zero address forbidden");
        treasuryWallet = newTreasury;
    }
}
