CREATE TABLE attendees (
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    seat_number TEXT,
    chuds INTEGER NOT NULL,
    performance_points INTEGER NOT NULL,
    level INTEGER NOT NULL,
    PRIMARY KEY (email)
);

CREATE TABLE prophets (
    performer TEXT NOT NULL,
    performance_points INTEGER NOT NULL,
    PRIMARY KEY (performer)
);

CREATE TABLE vouchers (
    code TEXT NOT NULL,
    amount INTEGER NOT NULL,
    used TEXT,
    PRIMARY KEY (code)
);