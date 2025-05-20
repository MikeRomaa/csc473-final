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
    id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
    code        VARCHAR(15)  NOT NULL,
    title       VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,

    PRIMARY KEY (id)
);

-- Junction table for user course registrations
CREATE TABLE IF NOT EXISTS user_course (
    user_id   INT UNSIGNED NOT NULL,
    course_id INT UNSIGNED NOT NULL,
    professor VARCHAR(35)  NOT NULL,
    year      YEAR         NOT NULL,
    semester  ENUM('winter', 'spring', 'summer', 'fall') NOT NULL,

    -- Optional, users are not required to share the grade they received
    grade     ENUM('C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+') NULL,

    PRIMARY KEY (user_id, course_id, year, semester)
);

-- New table: simplified enrollment
CREATE TABLE IF NOT EXISTS enrolled_course (
    id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id    INT UNSIGNED NOT NULL,
    course_id  INT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id)   REFERENCES `user`(id),
    FOREIGN KEY (course_id) REFERENCES course(id)
);

-- New table: posts (with JSON field for replies)
CREATE TABLE IF NOT EXISTS posts (
    id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id     INT UNSIGNED NOT NULL,
    course_id   INT UNSIGNED NOT NULL,
    post        TEXT         NOT NULL,
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    replies     JSON         NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id)   REFERENCES `user`(id),
    FOREIGN KEY (course_id) REFERENCES course(id)
);

-- New table: resources
CREATE TABLE IF NOT EXISTS resources (
    id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
    course_id  INT UNSIGNED NOT NULL,
    resource   LONGBLOB     NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (course_id) REFERENCES course(id)
);