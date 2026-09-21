-- Sovereign Database Initialization

CREATE TABLE IF NOT EXISTS audit_ledger (
    id SERIAL PRIMARY KEY,
    batch_id UUID NOT NULL,
    merkle_root VARCHAR(64) NOT NULL,
    signature VARCHAR(512) NOT NULL,
    timestamp BIGINT NOT NULL,
    status VARCHAR(32) NOT NULL,
    chains TEXT[] NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS treasury_transactions (
    id SERIAL PRIMARY KEY,
    tx_id UUID NOT NULL UNIQUE,
    operation VARCHAR(32) NOT NULL,
    issuer_id VARCHAR(64) NOT NULL,
    from_address VARCHAR(128) NOT NULL,
    to_address VARCHAR(128) NOT NULL,
    amount NUMERIC NOT NULL,
    currency VARCHAR(16) NOT NULL,
    timestamp BIGINT NOT NULL,
    compliance_status VARCHAR(16) NOT NULL,
    signature VARCHAR(512) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS kyc_records (
    id SERIAL PRIMARY KEY,
    record_id UUID NOT NULL UNIQUE,
    entity_type VARCHAR(16) NOT NULL,
    identity_hash VARCHAR(128) NOT NULL,
    verification_level INT NOT NULL,
    jurisdiction VARCHAR(64) NOT NULL,
    risk_rating VARCHAR(16) NOT NULL,
    sanctioned BOOLEAN DEFAULT FALSE,
    verified_at BIGINT NOT NULL,
    expires_at BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS oracle_nodes (
    id SERIAL PRIMARY KEY,
    node_id VARCHAR(64) NOT NULL UNIQUE,
    public_key VARCHAR(512) NOT NULL,
    endpoint VARCHAR(256) NOT NULL,
    stake NUMERIC NOT NULL,
    reputation INT DEFAULT 100,
    status VARCHAR(16) DEFAULT 'active',
    chains TEXT[] NOT NULL,
    proofs_validated INT DEFAULT 0,
    proofs_rejected INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_batch ON audit_ledger(batch_id);
CREATE INDEX idx_treasury_tx ON treasury_transactions(tx_id);
CREATE INDEX idx_kyc_record ON kyc_records(record_id);
CREATE INDEX idx_oracle_node ON oracle_nodes(node_id);
