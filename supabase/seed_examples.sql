-- Limpiar datos existentes (Opcional, cuidado!)
-- DELETE FROM payments;
-- DELETE FROM job_cards;

-- 1. Recepción (Toyota Corolla - Mantenimiento 5k)
INSERT INTO job_cards (id, vehicle_brand, vehicle_model, license_plate, status, priority, client_name, created_at, total_amount, paid_amount, payment_status)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Toyota',
    'Corolla Cross',
    'AD452KV',
    'reception',
    'Normal',
    'Carlos Pérez',
    NOW(),
    120.00,
    0.00,
    'Unpaid'
);

-- 2. Diagnóstico (JAC T8 - Ruido Motor)
INSERT INTO job_cards (id, vehicle_brand, vehicle_model, license_plate, status, priority, client_name, created_at, total_amount, paid_amount, payment_status)
VALUES (
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'JAC',
    'T8 Pro',
    'AB123CD',
    'diagnosis',
    'High',
    'Transportes Vzla CA',
    NOW() - INTERVAL '1 day',
    850.00,
    0.00,
    'Unpaid'
);

-- 3. Aprobación (Ford Explorer - Caja de Cambios)
INSERT INTO job_cards (id, vehicle_brand, vehicle_model, license_plate, status, priority, client_name, created_at, total_amount, paid_amount, payment_status)
VALUES (
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    'Ford',
    'Explorer Limited',
    'AG999XX',
    'approval',
    'Urgent',
    'María Rodríguez',
    NOW() - INTERVAL '2 days',
    2400.00,
    500.00,
    'Partial'
);

-- Pago parcial para la Explorer
INSERT INTO payments (job_id, amount, currency, method, reference, status, proof_url)
VALUES (
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    500.00,
    'USD',
    'Zelle',
    'ZE-99887766',
    'Verified',
    null
);

-- 4. En Progreso (Mitsubishi Montero - Frenos y Suspensión)
INSERT INTO job_cards (id, vehicle_brand, vehicle_model, license_plate, status, priority, client_name, created_at, total_amount, paid_amount, payment_status, before_photos)
VALUES (
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44',
    'Mitsubishi',
    'Montero Sport',
    'AA000BB',
    'in_progress',
    'Normal',
    'Roberto Gómez',
    NOW() - INTERVAL '3 days',
    450.00,
    225.00,
    'Partial'
);
-- Pago
INSERT INTO payments (job_id, amount, currency, method, reference, status)
VALUES ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 225.00, 'USD', 'Pago_Movil', '0102-123123', 'Verified');

-- 5. Control Calidad (Toyota Fortuner - Pintura)
INSERT INTO job_cards (id, vehicle_brand, vehicle_model, license_plate, status, priority, client_name, created_at, total_amount, paid_amount, payment_status, before_photos, after_photos)
VALUES (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55',
    'Toyota',
    'Fortuner SW4',
    'AE111FF',
    'quality_control',
    'High',
    'Inversiones Globales',
    NOW() - INTERVAL '5 days',
    1200.00,
    1200.00,
    'Paid'
);
-- Pago completo
INSERT INTO payments (job_id, amount, currency, method, reference, status)
VALUES ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', 1200.00, 'USD', 'Cash', null, 'Verified');

-- 6. Listo (Chery Tiggo - Cambio Aceite)
INSERT INTO job_cards (id, vehicle_brand, vehicle_model, license_plate, status, priority, client_name, created_at, total_amount, paid_amount, payment_status)
VALUES (
    'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66',
    'Chery',
    'Tiggo 7 Pro',
    'AD999DD',
    'ready',
    'Normal',
    'Ana Silva',
    NOW() - INTERVAL '6 hours',
    80.00,
    80.00,
    'Paid'
);
INSERT INTO payments (job_id, amount, currency, method, reference, status)
VALUES ('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', 80.00, 'USD', 'Binance', 'USDT-TX-123', 'Verified');

-- 7. Entregado (Jeep Grand Cherokee)
INSERT INTO job_cards (id, vehicle_brand, vehicle_model, license_plate, status, priority, client_name, created_at, total_amount, paid_amount, payment_status)
VALUES (
    'g0eebc99-9c0b-4ef8-bb6d-6bb9bd380a77',
    'Jeep',
    'Grand Cherokee',
    'AB000CD',
    'delivered',
    'Normal',
    'Pedro Castillo',
    NOW() - INTERVAL '10 days',
    300.00,
    300.00,
    'Paid'
);
