# EduChain Kenya: Deployment Plan

## 1. Executive Summary
This document outlines the end-to-end deployment strategy for the EduChain Platform across the higher education consortium in Kenya.

## 2. Infrastructure Requirements
- **Cloud Hosting:** AWS (Amazon Web Services) or local Safaricom Cloud service.
- **Microservices Deployment:** Docker containers orchestrated via Kubernetes.
- **Blockchain Nodes:** Minimum of 3 geographically separate validator nodes (e.g., UoN, CUE headquarters, HELB).
- **CI/CD:** GitHub Actions for automated unit testing and container deployment.

## 3. Phased Deployment Strategy

### Phase 1: Prototype Launch (Month 1-2)
- **Objective:** Deploy core Node.js backend.
- **Tasks:**
  - Setup MongoDB instance on AWS RDS / MongoDB Atlas.
  - Deploy Node.js server via AWS Elastic Beanstalk or Render.
  - Deploy Smart Contracts to an Ethereum Testnet (Sepolia/Goerli) for the pilot.
  - Deploy Admin Web Portal (React.js) to Vercel/Netlify.
- **Testing:** Verify initial hash storage and retrievals between 2 local simulated institutional accounts.

### Phase 2: Consortium Onboarding (Month 3-5)
- **Objective:** Onboard pilot universities and agencies (CUE, KUCCPS).
- **Tasks:**
  - Provide individual API Keys and Admin accounts to the pilot institutions.
  - Form the Blockchain Consortium Network (transition from testnet to permissioned instances, or mainnet depending on regulatory approval).
  - Train University Registrars on using the `admin-client` to issue credentials.
- **Legal Prerequisite:** MOUs signed between CUE and pilot universities.

### Phase 3: Student Rollout & Full Deployment (Month 6+)
- **Objective:** Release student mobile application.
- **Tasks:**
  - Push the React Native `client` app to Google Play Store and Apple App Store.
  - Run university awareness campaigns.
  - Rollout full employer-verification dashboard.

## 4. Monitoring & Rollback
- Use **Datadog** or **New Relic** for Application Performance Monitoring (APM).
- **Rollback:** Container versioning via Docker ensures that in case of catastrophic application bugs, the backend rolls back to a previous safe state in under 60 seconds without data loss.

## 5. Next Steps for Developer
1. Verify `server.js` starts successfully in production mode (`npm run start`).
2. Map environment variables (`.env.production`) for DB passwords, RPC node provider URLs (e.g., Alchemy/Infura), and JWT keys.
3. Validate client frontend API URIs.
