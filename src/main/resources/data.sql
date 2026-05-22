-- Seed data uses INSERT IGNORE so existing rows (including newly registered users) are never overwritten

-- ============================================
-- USERS (BCrypt hash for 'Password@123')
-- ============================================
INSERT IGNORE INTO users (id, full_name, email, password_hash, phone, role, is_active, created_at, updated_at) VALUES
(1, 'Admin Shah', 'admin@insure.com', '$2a$12$FgRPUk8RuFCPa8onEc1p/uwVeFDUDh/FjFDY5tqJigmTaCaeUiH7O', '9000000001', 'ADMIN', 1, NOW(), NOW()),
(2, 'Admin Zayed', 'zayed.admin@insure.com', '$2a$12$FgRPUk8RuFCPa8onEc1p/uwVeFDUDh/FjFDY5tqJigmTaCaeUiH7O', '9000000002', 'ADMIN', 1, NOW(), NOW()),
(3, 'Vikash Paidisetti', 'vikash@gmail.com', '$2a$12$FgRPUk8RuFCPa8onEc1p/uwVeFDUDh/FjFDY5tqJigmTaCaeUiH7O', '9100000001', 'CUSTOMER', 1, NOW(), NOW()),
(4, 'Sri Varshan', 'varshan@gmail.com', '$2a$12$FgRPUk8RuFCPa8onEc1p/uwVeFDUDh/FjFDY5tqJigmTaCaeUiH7O', '9100000002', 'CUSTOMER', 1, NOW(), NOW()),
(5, 'Pavan Krishna', 'pavan@gmail.com', '$2a$12$FgRPUk8RuFCPa8onEc1p/uwVeFDUDh/FjFDY5tqJigmTaCaeUiH7O', '9100000003', 'CUSTOMER', 1, NOW(), NOW()),
(6, 'Pranesh M', 'pranesh@gmail.com', '$2a$12$FgRPUk8RuFCPa8onEc1p/uwVeFDUDh/FjFDY5tqJigmTaCaeUiH7O', '9100000004', 'CUSTOMER', 1, NOW(), NOW()),
(7, 'vikash', 'vik@gmail.com', '$2a$12$FgRPUk8RuFCPa8onEc1p/uwVeFDUDh/FjFDY5tqJigmTaCaeUiH7O', '9100000005', 'CUSTOMER', 1, NOW(), NOW());

-- ============================================
-- POLICY CATEGORIES (matching ClaimType enum)
-- ============================================
INSERT IGNORE INTO policy_categories (id, name, description, is_active, created_at) VALUES
(1, 'HOSPITALIZATION', 'Covers inpatient hospitalization expenses including room charges, surgery, and related medical costs', 1, NOW()),
(2, 'OPD', 'Covers outpatient department visits, consultations, diagnostic tests, and pharmacy expenses', 1, NOW()),
(3, 'ACCIDENTAL', 'Covers medical expenses arising from accidents including emergency treatment and rehabilitation', 1, NOW()),
(4, 'CRITICAL_ILLNESS', 'Provides lump-sum coverage for diagnosis of critical illnesses like cancer, heart disease, and stroke', 1, NOW()),
(5, 'MATERNITY', 'Covers maternity-related expenses including pre-natal, delivery, and post-natal care', 1, NOW()),
(6, 'DAYCARE', 'Covers medical procedures and treatments that do not require 24-hour hospitalization', 1, NOW()),
(7, 'OTHER', 'Covers miscellaneous health-related expenses not classified under other categories', 1, NOW());

-- ============================================
-- POLICIES
-- ============================================
INSERT IGNORE INTO policies (id, policy_code, name, policy_type, description, min_age, max_age, waiting_period_days, is_active, category_id, created_by, created_at, updated_at) VALUES
(1, 'POL-HOSP-001', 'HealthGuard Individual', 'INDIVIDUAL', 'Comprehensive individual hospitalization plan covering surgeries, ICU, and room charges with cashless facility at 5000+ hospitals.', 18, 65, 30, 1, 1, 1, NOW(), NOW()),
(2, 'POL-HOSP-002', 'HealthGuard Family', 'FAMILY_FLOATER', 'Family floater hospitalization plan that covers your entire family under a single sum insured.', 5, 65, 30, 1, 1, 1, NOW(), NOW()),
(3, 'POL-OPD-001', 'OPD Care Plus', 'INDIVIDUAL', 'Covers doctor consultations, prescribed medicines, diagnostic tests and dental treatments on an outpatient basis.', 18, 60, 15, 1, 2, 1, NOW(), NOW()),
(4, 'POL-ACC-001', 'AcciShield Individual', 'INDIVIDUAL', 'Personal accident cover providing financial protection against accidental injuries, disability, and death.', 18, 70, 0, 1, 3, 1, NOW(), NOW()),
(5, 'POL-ACC-002', 'AcciShield Family', 'FAMILY_FLOATER', 'Family accident protection plan covering all family members against accidental injuries and hospitalization.', 5, 70, 0, 1, 3, 1, NOW(), NOW()),
(6, 'POL-CI-001', 'Critical Care Plan', 'INDIVIDUAL', 'Lump-sum payout on diagnosis of 30+ critical illnesses including cancer, heart attack, kidney failure, and major organ transplant.', 18, 55, 90, 1, 4, 1, NOW(), NOW()),
(7, 'POL-MAT-001', 'MaternaCare', 'INDIVIDUAL', 'Comprehensive maternity plan covering pre-natal care, delivery (normal & C-section), and post-natal expenses for mother and newborn.', 21, 40, 270, 1, 5, 2, NOW(), NOW()),
(8, 'POL-MAT-002', 'MaternaCare Family', 'FAMILY_FLOATER', 'Family maternity plan covering both parents and newborn with extended coverage for complications.', 21, 45, 270, 1, 5, 2, NOW(), NOW()),
(9, 'POL-DAY-001', 'DayCare Express', 'INDIVIDUAL', 'Covers 500+ daycare procedures like cataract surgery, chemotherapy sessions, dialysis, and minor surgeries not requiring 24hr hospitalization.', 18, 65, 30, 1, 6, 2, NOW(), NOW()),
(10, 'POL-OTH-001', 'WellnessPlus', 'INDIVIDUAL', 'Covers preventive health check-ups, vaccination, physiotherapy, and alternative treatments like Ayurveda and Homeopathy.', 18, 60, 15, 1, 7, 2, NOW(), NOW());

-- ============================================
-- POLICY PLANS
-- ============================================
-- HealthGuard Individual plans
INSERT IGNORE INTO policy_plans (id, plan_name, coverage_amount, premium_amount, premium_basis, tenure_options, max_members, room_rent_limit, renewal_allowed, is_active, policy_id, created_at, updated_at) VALUES
(1, 'Silver', 300000.00, 5000.00, 'FLAT', '[1, 2, 3]', 1, NULL, 1, 1, 1, NOW(), NOW()),
(2, 'Gold', 500000.00, 8500.00, 'FLAT', '[1, 2, 3, 5]', 1, NULL, 1, 1, 1, NOW(), NOW()),
(3, 'Platinum', 1000000.00, 15000.00, 'FLAT', '[1, 2, 3, 5]', 1, NULL, 1, 1, 1, NOW(), NOW());

-- HealthGuard Family plans
INSERT IGNORE INTO policy_plans (id, plan_name, coverage_amount, premium_amount, premium_basis, tenure_options, max_members, room_rent_limit, renewal_allowed, is_active, policy_id, created_at, updated_at) VALUES
(4, 'Family Silver', 500000.00, 12000.00, 'FLAT', '[1, 2, 3]', 4, NULL, 1, 1, 2, NOW(), NOW()),
(5, 'Family Gold', 1000000.00, 20000.00, 'FLAT', '[1, 2, 3, 5]', 5, NULL, 1, 1, 2, NOW(), NOW()),
(6, 'Family Platinum', 2000000.00, 35000.00, 'FLAT', '[1, 2, 3, 5]', 6, NULL, 1, 1, 2, NOW(), NOW());

-- OPD Care Plus plans
INSERT IGNORE INTO policy_plans (id, plan_name, coverage_amount, premium_amount, premium_basis, tenure_options, max_members, room_rent_limit, renewal_allowed, is_active, policy_id, created_at, updated_at) VALUES
(7, 'Basic OPD', 25000.00, 2000.00, 'FLAT', '[1, 2]', 1, NULL, 1, 1, 3, NOW(), NOW()),
(8, 'Premium OPD', 50000.00, 3500.00, 'FLAT', '[1, 2, 3]', 1, NULL, 1, 1, 3, NOW(), NOW());

-- AcciShield Individual plans
INSERT IGNORE INTO policy_plans (id, plan_name, coverage_amount, premium_amount, premium_basis, tenure_options, max_members, room_rent_limit, renewal_allowed, is_active, policy_id, created_at, updated_at) VALUES
(9, 'Accident Basic', 500000.00, 3000.00, 'FLAT', '[1, 2, 3]', 1, NULL, 1, 1, 4, NOW(), NOW()),
(10, 'Accident Premium', 1000000.00, 5500.00, 'FLAT', '[1, 2, 3, 5]', 1, NULL, 1, 1, 4, NOW(), NOW());

-- AcciShield Family plans
INSERT IGNORE INTO policy_plans (id, plan_name, coverage_amount, premium_amount, premium_basis, tenure_options, max_members, room_rent_limit, renewal_allowed, is_active, policy_id, created_at, updated_at) VALUES
(11, 'Family Accident Cover', 1000000.00, 8000.00, 'FLAT', '[1, 2, 3]', 4, NULL, 1, 1, 5, NOW(), NOW()),
(12, 'Family Accident Premium', 2000000.00, 14000.00, 'FLAT', '[1, 2, 3, 5]', 6, NULL, 1, 1, 5, NOW(), NOW());

-- Critical Care Plan
INSERT IGNORE INTO policy_plans (id, plan_name, coverage_amount, premium_amount, premium_basis, tenure_options, max_members, room_rent_limit, renewal_allowed, is_active, policy_id, created_at, updated_at) VALUES
(13, 'Critical Standard', 1000000.00, 8000.00, 'AGE_BASED', '[1, 2, 3]', 1, NULL, 1, 1, 6, NOW(), NOW()),
(14, 'Critical Elite', 2500000.00, 18000.00, 'AGE_BASED', '[1, 2, 3, 5]', 1, NULL, 1, 1, 6, NOW(), NOW());

-- MaternaCare plans
INSERT IGNORE INTO policy_plans (id, plan_name, coverage_amount, premium_amount, premium_basis, tenure_options, max_members, room_rent_limit, renewal_allowed, is_active, policy_id, created_at, updated_at) VALUES
(15, 'Maternity Basic', 100000.00, 6000.00, 'FLAT', '[1, 2]', 1, NULL, 0, 1, 7, NOW(), NOW()),
(16, 'Maternity Premium', 200000.00, 10000.00, 'FLAT', '[1, 2, 3]', 1, NULL, 0, 1, 7, NOW(), NOW());

-- MaternaCare Family
INSERT IGNORE INTO policy_plans (id, plan_name, coverage_amount, premium_amount, premium_basis, tenure_options, max_members, room_rent_limit, renewal_allowed, is_active, policy_id, created_at, updated_at) VALUES
(17, 'Family Maternity', 300000.00, 15000.00, 'FLAT', '[1, 2, 3]', 3, NULL, 0, 1, 8, NOW(), NOW());

-- DayCare Express
INSERT IGNORE INTO policy_plans (id, plan_name, coverage_amount, premium_amount, premium_basis, tenure_options, max_members, room_rent_limit, renewal_allowed, is_active, policy_id, created_at, updated_at) VALUES
(18, 'DayCare Lite', 100000.00, 3000.00, 'FLAT', '[1, 2]', 1, NULL, 1, 1, 9, NOW(), NOW()),
(19, 'DayCare Pro', 250000.00, 6000.00, 'FLAT', '[1, 2, 3]', 1, NULL, 1, 1, 9, NOW(), NOW());

-- WellnessPlus
INSERT IGNORE INTO policy_plans (id, plan_name, coverage_amount, premium_amount, premium_basis, tenure_options, max_members, room_rent_limit, renewal_allowed, is_active, policy_id, created_at, updated_at) VALUES
(20, 'Wellness Basic', 30000.00, 1500.00, 'FLAT', '[1]', 1, NULL, 1, 1, 10, NOW(), NOW()),
(21, 'Wellness Pro', 75000.00, 3000.00, 'FLAT', '[1, 2]', 1, NULL, 1, 1, 10, NOW(), NOW());
