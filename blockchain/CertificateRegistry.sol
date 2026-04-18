// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title CertificateRegistry
 * @dev A smart contract for storing and verifying academic certificate hashes.
 * Follows the scope: "Upload certificate -> stored as hash, Verify certificate via blockchain"
 */
contract CertificateRegistry {
    address public owner;

    // Struct to hold certificate data
    struct Certificate {
        string studentIndex;
        string institutionId;
        string certHash;      // IPFS hash or SHA-256 hash of the document
        uint256 issueDate;
        bool isValid;
        bool exists;
    }

    // Mapping from a unique identifier (e.g., hash) to the Certificate
    mapping(string => Certificate) private certificates;

    // Mapping to track authorized institutions that can issue certificates
    mapping(address => bool) public authorizedInstitutions;

    // Events
    event CertificateIssued(string indexed certHash, string studentIndex, string institutionId);
    event CertificateRevoked(string indexed certHash);
    event InstitutionAuthorized(address indexed institutionAddress);
    event InstitutionRevoked(address indexed institutionAddress);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    modifier onlyAuthorized() {
        require(authorizedInstitutions[msg.sender], "Not authorized to issue certificates");
        _;
    }

    constructor() {
        owner = msg.sender;
        authorizedInstitutions[msg.sender] = true; // Owner is authorized by default
    }

    /**
     * @dev Authorize a new institution to issue certificates.
     */
    function authorizeInstitution(address _institution) external onlyOwner {
        authorizedInstitutions[_institution] = true;
        emit InstitutionAuthorized(_institution);
    }

    /**
     * @dev Issue a new certificate by securely storing its hash.
     */
    function issueCertificate(string memory _certHash, string memory _studentIndex, string memory _institutionId) external onlyAuthorized {
        require(!certificates[_certHash].exists, "Certificate hash already exists");

        certificates[_certHash] = Certificate({
            studentIndex: _studentIndex,
            institutionId: _institutionId,
            certHash: _certHash,
            issueDate: block.timestamp,
            isValid: true,
            exists: true
        });

        emit CertificateIssued(_certHash, _studentIndex, _institutionId);
    }

    /**
     * @dev Verify a certificate's authenticity.
     * @return isValid Boolean indicating if the certificate is authentic and not revoked.
     */
    function verifyCertificate(string memory _certHash) external view returns (bool isValid, string memory studentIndex, string memory institutionId, uint256 issueDate) {
        require(certificates[_certHash].exists, "Certificate does not exist");
        
        Certificate memory cert = certificates[_certHash];
        return (cert.isValid, cert.studentIndex, cert.institutionId, cert.issueDate);
    }

    /**
     * @dev Revoke a certificate in case of fraud or error.
     */
    function revokeCertificate(string memory _certHash) external onlyAuthorized {
        require(certificates[_certHash].exists, "Certificate does not exist");
        certificates[_certHash].isValid = false;

        emit CertificateRevoked(_certHash);
    }
}
