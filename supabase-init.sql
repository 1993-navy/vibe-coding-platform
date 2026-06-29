CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    nickname VARCHAR(50) NOT NULL,
    avatar_url VARCHAR(500),
    role VARCHAR(20) NOT NULL DEFAULT 'seller',
    is_seed BOOLEAN DEFAULT FALSE,
    is_member BOOLEAN DEFAULT FALSE,
    joined_at TIMESTAMP DEFAULT NOW(),
    completion_rate FLOAT DEFAULT 100.0,
    rating FLOAT DEFAULT 5.0,
    response_time INT DEFAULT 0
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "Anyone can view public profiles" ON users
    FOR SELECT USING (true);

GRANT SELECT ON users TO anon;
GRANT ALL PRIVILEGES ON users TO authenticated;

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID REFERENCES users(id),
    developer_id UUID REFERENCES users(id),
    scene VARCHAR(50) NOT NULL,
    level VARCHAR(10) NOT NULL DEFAULT 'A',
    title VARCHAR(200) NOT NULL,
    description TEXT,
    platform VARCHAR(50),
    requirements TEXT,
    deliverable_format VARCHAR(50),
    budget_min INT NOT NULL,
    budget_max INT NOT NULL,
    actual_amount INT,
    status VARCHAR(30) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW(),
    accepted_at TIMESTAMP,
    draft_submitted_at TIMESTAMP,
    draft_confirmed_at TIMESTAMP,
    final_submitted_at TIMESTAMP,
    final_confirmed_at TIMESTAMP,
    warranty_end_at TIMESTAMP,
    completed_at TIMESTAMP,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_urgent BOOLEAN DEFAULT FALSE,
    urgent_fee INT DEFAULT 0
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sellers can view their orders" ON orders
    FOR SELECT USING (auth.uid() = seller_id);

CREATE POLICY "Developers can view their orders" ON orders
    FOR SELECT USING (auth.uid() = developer_id);

CREATE POLICY "Sellers can create orders" ON orders
    FOR INSERT WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Developers can accept orders" ON orders
    FOR UPDATE USING (auth.uid() = developer_id) WITH CHECK (auth.uid() = developer_id);

CREATE POLICY "Anyone can view pending orders" ON orders
    FOR SELECT USING (status = 'pending');

GRANT SELECT ON orders TO anon;
GRANT ALL PRIVILEGES ON orders TO authenticated;

CREATE TABLE works (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    developer_id UUID REFERENCES users(id),
    title VARCHAR(200) NOT NULL,
    scene VARCHAR(50) NOT NULL,
    level VARCHAR(10) NOT NULL DEFAULT 'A',
    description TEXT,
    features TEXT,
    cover_url VARCHAR(500),
    demo_video_url VARCHAR(500),
    doc_url VARCHAR(500),
    price INT NOT NULL,
    rating FLOAT DEFAULT 0.0,
    sales_count INT DEFAULT 0,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE works ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Developers can manage their works" ON works
    FOR ALL USING (auth.uid() = developer_id);

CREATE POLICY "Anyone can view public works" ON works
    FOR SELECT USING (is_public = TRUE);

GRANT SELECT ON works TO anon;
GRANT ALL PRIVILEGES ON works TO authenticated;

CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id),
    reviewer_id UUID REFERENCES users(id),
    rating FLOAT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    content TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view reviews for orders they're involved in" ON reviews
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM orders o WHERE o.id = order_id AND (o.seller_id = auth.uid() OR o.developer_id = auth.uid()))
    );

CREATE POLICY "Users can create reviews" ON reviews
    FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

GRANT SELECT ON reviews TO anon;
GRANT ALL PRIVILEGES ON reviews TO authenticated;

CREATE TABLE disputes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id),
    initiator_id UUID REFERENCES users(id),
    reason VARCHAR(200) NOT NULL,
    evidence TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'pending',
    decision VARCHAR(50),
    decision_note TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    resolved_at TIMESTAMP
);

ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users involved in order can view disputes" ON disputes
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM orders o WHERE o.id = order_id AND (o.seller_id = auth.uid() OR o.developer_id = auth.uid()))
    );

CREATE POLICY "Users can create disputes" ON disputes
    FOR INSERT WITH CHECK (auth.uid() = initiator_id);

GRANT SELECT ON disputes TO anon;
GRANT ALL PRIVILEGES ON disputes TO authenticated;

CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_scene ON orders(scene);
CREATE INDEX idx_orders_level ON orders(level);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_works_scene ON works(scene);
CREATE INDEX idx_works_level ON works(level);
CREATE INDEX idx_works_developer_id ON works(developer_id);
CREATE INDEX idx_disputes_status ON disputes(status);
CREATE INDEX idx_disputes_order_id ON disputes(order_id);
