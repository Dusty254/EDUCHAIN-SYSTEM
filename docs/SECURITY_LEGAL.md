# EduChain Kenya: Security & Legal Compliance

## 1. Security Philosophy
EduChain Kenya treats academic data as highly sensitive information. Our security posture ensures data integrity, student privacy, and protection against unauthorized tampering.

## 2. Core Security Features

### 2.1. Cryptographic Immutability
- **Mechanism:** Files are hashed using **SHA-256**. The hash is signed directly onto the blockchain smart contract.
- **Why:** If an attacker breaches the off-chain database and modifies a student's grades, the resulting file hash will no longer match the hash stored on the blockchain, instantly flagging the record as invalid/fraudulent.

### 2.2. Authentication & Access Control
- **Protocol:** JSON Web Tokens (JWT) for stateless user sessions.
- **Role-Based Access Control (RBAC):**
  - **Students:** Can view their own records and grant temporary viewing access to employers.
  - **Agencies (e.g. KNEC):** Can append results globally but cannot modify university-specific transcripts.
  - **Universities:** Complete Read/Write authority only over their internally enrolled student data.

### 2.3. Transport Encryption
- Full TLS/SSL encryption for data in transit between the frontend clients and the Node.js API Gateway.

## 3. Legal and Policy Requirements

### 3.1. Data Protection Act (Kenya 2019) Compliance
- **Data Minimization:** Only cryptographic hashes are public (on-chain). Personally Identifiable Information (PII) like names, birth dates, and contact information remains sequestered in secure, access-controlled off-chain MongoDB storage.
- **Right to Erasure (Soft vs Hard Deletion):** In compliance with the law, if a student requests data deletion, their PII is wiped from the off-chain MongoDB database. This breaks the link to their blockchain interactions permanently, achieving "erasure" without violating blockchain immutability.

### 3.2. Institutional MOUs and Regulatory Approval
- **Commission for University Education (CUE):** Deployment relies technically and legally on standard API agreements signed by CUE. 
- **Consortium Governance:** The smart contracts (`CertificateRegistry.sol`) establish an `onlyAuthorized` modifier, meaning unauthorized generic nodes cannot pollute the data pool with forged certificates. Decisions on node authorization are governed by consensus between the initial coalition of universities.
