-- Seed Staff
INSERT INTO staff (name, email, role, phone) VALUES 
('Hely Camargo', 'hely@kineticstudio.com', 'Owner', '+58 414 1234567'),
('Valeria Mendoza', 'valeria@kineticstudio.com', 'Admin', '+58 412 1112233'),
('Sofía Castillo', 'sofia@kineticstudio.com', 'Admin', '+58 424 3334455'),
('Miguel "El Maestro" Torres', 'miguel@kineticstudio.com', 'Mechanic', '+58 416 5556677'), -- Senior
('Carlos Ruiz', 'carlos@kineticstudio.com', 'Mechanic', '+58 414 8889900'), -- Toyota Specialist
('José Ramírez', 'jose@kineticstudio.com', 'Mechanic', '+58 412 7776655'), -- JAC Specialist
('Andrés Velásquez', 'andres@kineticstudio.com', 'Mechanic', '+58 424 2223311');

-- Seed Inventory (Toyota & JAC focus + Generic)
INSERT INTO inventory (name, brand, sku, quantity, price, description) VALUES
-- Toyota
('Filtro de Aceite Original', 'Toyota', 'TOY-OIL-001', 50, 15.00, 'Compatible con Corolla, Yaris, Hilux'),
('Pastillas de Freno Delanteras', 'Toyota', 'TOY-BRK-F', 20, 85.00, 'Cerámica. Corolla Cross/Sedan'),
('Kit Cadena de Tiempo', 'Toyota', 'TOY-TIM-KIT', 5, 350.00, 'Motor 1GR-FE (Fortuner/Hilux)'),
('Aceite Sintético 5W-30 (Litro)', 'Toyota', 'TOY-5W30', 100, 12.00, 'Formula original'),
('Amortiguadores Traseros', 'Toyota', 'TOY-SHOCK-R', 8, 120.00, 'Hilux Kavak/Revo'),

-- JAC
('Sensor de Oxígeno', 'JAC', 'JAC-O2', 10, 45.00, 'T8 / JS4'),
('Kit de Embrague (Clutch)', 'JAC', 'JAC-CLUTCH', 4, 220.00, 'JAC T8 Pro Diesel'),
('Filtro de Gasoil', 'JAC', 'JAC-DSL-FILT', 30, 25.00, 'T8 / T6'),
('Neblinera Izquierda', 'JAC', 'JAC-FOG-L', 2, 60.00, 'JS8'),

-- Generic / Consumables
('Refrigerante Rojo 50/50', 'Generic', 'COOL-RED', 40, 10.00, 'Galón'),
('Líquido de Frenos DOT4', 'Generic', 'BRK-FLUID', 40, 8.00, 'Tekstar'),
('Limpiaparabrisas 22"', 'Bosch', 'WIPER-22', 15, 12.00, 'Aerotwin');

-- Seed Jobs (Updating existing or adding new with more context if tables were cleared)
-- Assuming we append to existing or if clean slate:

INSERT INTO job_cards (id, vehicle_brand, vehicle_model, license_plate, status, priority, client_name, created_at, total_amount, paid_amount, payment_status, before_photos)
VALUES 
    -- Cliente 1
    (gen_random_uuid(), 'Toyota', 'Merú', 'AA123BB', 'diagnosis', 'High', 'Roberto Martínez', NOW(), 0, 0, 'Unpaid', ARRAY['https://example.com/meru_falla.jpg']),
    -- Cliente 2
    (gen_random_uuid(), 'JAC', 'JS4', 'AB987CD', 'in_progress', 'Normal', 'Laura Gómez', NOW() - INTERVAL '2 days', 450.00, 200.00, 'Partial', ARRAY['https://example.com/js4_choque.jpg']),
    -- Cliente 3
    (gen_random_uuid(), 'Ford', 'Mustang', 'AD000FF', 'ready', 'Urgent', 'Diego Ferrari', NOW() - INTERVAL '4 days', 1200.00, 1200.00, 'Paid', ARRAY['https://example.com/mustang_motor.jpg']),
    -- Cliente 4
    (gen_random_uuid(), 'Toyota', 'Corolla', 'AE555GG', 'reception', 'Normal', 'Elena White', NOW(), 0, 0, 'Unpaid', NULL),
    -- Cliente 5
    (gen_random_uuid(), 'Mitsubishi', 'Lancer Touring', 'AI111JJ', 'quality_control', 'Normal', 'Pablo Escobar', NOW() - INTERVAL '1 week', 300.00, 300.00, 'Paid', NULL),
    -- Cliente 6
    (gen_random_uuid(), 'Jeep', 'Wrangler', 'AK999LL', 'diagnosis', 'High', 'Ana Sofía', NOW() - INTERVAL '1 day', 0, 0, 'Unpaid', NULL),
    -- Cliente 7
    (gen_random_uuid(), 'Chevrolet', 'Tahoe', 'AL777MM', 'approval', 'Normal', 'Carlos Sainz', NOW() - INTERVAL '3 days', 2500.00, 0, 'Unpaid', NULL),
    -- Cliente 8
    (gen_random_uuid(), 'JAC', 'T6', 'AM123NN', 'delivered', 'Normal', 'Transporte X', NOW() - INTERVAL '2 weeks', 150.00, 150.00, 'Paid', NULL);

