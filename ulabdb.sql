
DROP DATABASE IF EXISTS ulabdb;
CREATE DATABASE ulabdb;

/* Connect to Database */
\c ulabdb

/* Create tables */
CREATE TABLE Grids (
  grid_id SERIAL PRIMARY KEY,
  grid_title VARCHAR 
);

CREATE TABLE Lists (
  list_id SERIAL PRIMARY KEY,
  list_title VARCHAR 
);

CREATE TABLE GridLists (
  grid_id INTEGER NOT NULL REFERENCES grids(grid_id),
  list_id INTEGER NOT NULL REFERENCES lists(list_id),
  PRIMARY KEY (grid_id, list_id)
);

CREATE TABLE Symbols (
  symbol_id SERIAL PRIMARY KEY,
  symbol_name VARCHAR,
  symbol_path VARCHAR
);

CREATE TABLE Words (
  word_id SERIAL PRIMARY KEY,
  word VARCHAR,
  symbol_id INTEGER REFERENCES Symbols(symbol_id)
);

CREATE TABLE ListWords (
  word_id INTEGER NOT NULL REFERENCES Words(word_id),
  list_id INTEGER NOT NULL REFERENCES Lists(list_id),
  PRIMARY KEY (word_id, list_id)
);

/* Insert data for core vocabulary grid */

-- add title for core-vocabulary grid
INSERT INTO Grids(grid_title)
  VALUES ('Core Vocabulary');

-- add title for adjective list
INSERT INTO Lists (list_title)
  VALUES ('Adjective');  

-- add adjective list to core vocabulary grid
INSERT INTO GridLists (grid_id, list_id)
  VALUES ((SELECT G.grid_id FROM Grids G WHERE G.grid_title = 'Core Vocabulary'), (SELECT L.list_id FROM Lists L WHERE L.list_title = 'Adjective'));
  
-- add words for adjective list
INSERT INTO Words (word)
  VALUES ('Bad'),('Funny'),('Good'),('Happy'), ('Sad'),('Scary'),('Silly');

-- add words to adjective list
INSERT INTO ListWords (word_id, list_id)
  VALUES 
   ((SELECT W.word_id from Words W WHERE word = 'Bad'),   (SELECT L.list_id from Lists L WHERE L.list_title = 'Adjective')),
   ((SELECT W.word_id from Words W WHERE word = 'Funny'), (SELECT L.list_id from Lists L WHERE L.list_title = 'Adjective')),
   ((SELECT W.word_id from Words W WHERE word = 'Good'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'Adjective')),
   ((SELECT W.word_id from Words W WHERE word = 'Happy'), (SELECT L.list_id from Lists L WHERE L.list_title = 'Adjective')),
   ((SELECT W.word_id from Words W WHERE word = 'Sad'),   (SELECT L.list_id from Lists L WHERE L.list_title = 'Adjective')),
   ((SELECT W.word_id from Words W WHERE word = 'Scary'), (SELECT L.list_id from Lists L WHERE L.list_title = 'Adjective')),
   ((SELECT W.word_id from Words W WHERE word = 'Silly'), (SELECT L.list_id from Lists L WHERE L.list_title = 'Adjective'));



