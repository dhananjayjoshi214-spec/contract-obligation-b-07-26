-- ==========================================================
-- ContractIQ Database Schema
-- Database: PostgreSQL
-- ==========================================================

-- =====================
-- USERS
-- =====================

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('Admin', 'Legal Manager', 'Employee')),
    department TEXT,
    phone TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- =====================
-- CONTRACTS
-- =====================

CREATE TABLE contracts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    contract_no TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    status TEXT NOT NULL CHECK (status IN ('Draft', 'Active', 'Expired', 'Terminated')),
    start_date DATE,
    end_date DATE,
    owner_id BIGINT NOT NULL REFERENCES users(id),
    created_by BIGINT NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- =====================
-- CONTRACT VERSIONS
-- =====================

CREATE TABLE contract_versions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    contract_id BIGINT NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    document_path TEXT NOT NULL,
    uploaded_by BIGINT REFERENCES users(id),
    uploaded_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);

-- =====================
-- OBLIGATIONS
-- =====================

CREATE TABLE obligations (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    contract_id BIGINT NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    obligation_type TEXT,
    assigned_to BIGINT REFERENCES users(id),
    due_date DATE,
    completed_date DATE,
    priority TEXT CHECK (priority IN ('Low','Medium','High','Critical')),
    status TEXT CHECK (status IN ('Pending','In Progress','Completed','Overdue')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- =====================
-- RENEWALS
-- =====================

CREATE TABLE renewals (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    contract_id BIGINT NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
    renewal_date DATE,
    reminder_date DATE,
    renewal_status TEXT CHECK (renewal_status IN ('Pending','Approved','Rejected')),
    approved_by BIGINT REFERENCES users(id),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- =====================
-- COMPLIANCE RECORDS
-- =====================

CREATE TABLE compliance_records (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    contract_id BIGINT NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
    obligation_id BIGINT NOT NULL REFERENCES obligations(id) ON DELETE CASCADE,
    compliance_level TEXT,
    remarks TEXT,
    checked_by BIGINT REFERENCES users(id),
    checked_on TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- =====================
-- NOTIFICATIONS
-- =====================

CREATE TABLE notifications (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    contract_id BIGINT REFERENCES contracts(id),
    title TEXT NOT NULL,
    message TEXT,
    type TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- =====================
-- ACTIVITIES
-- =====================

CREATE TABLE activities (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    contract_id BIGINT REFERENCES contracts(id),
    activity TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- =====================
-- REPORTS
-- =====================

CREATE TABLE reports (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    report_name TEXT NOT NULL,
    report_type TEXT,
    generated_by BIGINT REFERENCES users(id),
    generated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    file_path TEXT
);

-- =====================
-- AUDIT LOGS
-- =====================

CREATE TABLE audit_logs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    action TEXT NOT NULL,
    entity_name TEXT NOT NULL,
    entity_id BIGINT,
    old_value TEXT,
    new_value TEXT,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
