-- Main table for user data
CREATE TABLE IF NOT EXISTS user (
    id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
    email         VARCHAR(255) NOT NULL,
    password_hash CHAR(97)     NOT NULL,
    first_name    VARCHAR(35)  NOT NULL,
    last_name     VARCHAR(35)  NOT NULL,

    PRIMARY KEY (id)
);

-- Main table for course data
CREATE TABLE IF NOT EXISTS course (
    code        VARCHAR(15)  NOT NULL,
    title       VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,

    PRIMARY KEY (code)
);

-- Junction table for user course registrations
CREATE TABLE IF NOT EXISTS user_course (
    user_id     INT UNSIGNED NOT NULL,
    course_code VARCHAR(100) NOT NULL,

    PRIMARY KEY (user_id, course_code),
    FOREIGN KEY (user_id)     REFERENCES user(id),
    FOREIGN KEY (course_code) REFERENCES course(code)
);

-- Junction table for friends
CREATE TABLE IF NOT EXISTS friends (
    user_a INT UNSIGNED NOT NULL,
    user_b INT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (user_a, user_b),
    FOREIGN KEY (user_a) REFERENCES user(id),
    FOREIGN KEY (user_b) REFERENCES user(id)
);
