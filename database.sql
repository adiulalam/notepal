CREATE TABLE IF NOT EXISTS notes.user(
	user_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name text NOT NULL,
	last_name text NOT NULL,
	email text NOT NULL UNIQUE,
	password text NOT NULL
);

CREATE TABLE IF NOT EXISTS notes.note(
	note_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	note_title text NOT NULL,
	note_description text,
	is_archived boolean NOT NULL DEFAULT false,
	fk_user_id int NOT NULL,
	FOREIGN KEY (fk_user_id) REFERENCES notes.user (user_id)
);


--Select all user
SELECT * FROM notes.user;

--Select user from ID
SELECT * FROM notes.user where user_id = 1;

--Insert user
INSERT INTO notes.user (first_name, last_name, email, password)
VALUES ('John', 'Doe', 'johndoe@gmail.com', 'password123');


--Select all note
SELECT * FROM notes.note;

--Select note from ID
SELECT * FROM notes.note where note_id = 1;

--Insert note
INSERT INTO notes.note (note_title, note_description, is_archived, fk_user_id)
VALUES ('hello world', 'note description', true, 6);