/**
 * sql file to initialize the ulabdb
 * version 1
 * christopher monk
 *
**/
 
DROP DATABASE IF EXISTS ulabdb;
CREATE DATABASE ulabdb;

/* Connect to database */
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


-- add title for adverb list
INSERT INTO Lists (list_title)
  VALUES ('Adverb');  

-- add adverb list to core vocabulary grid
INSERT INTO GridLists (grid_id, list_id)
  VALUES ((SELECT G.grid_id FROM Grids G WHERE G.grid_title = 'Core Vocabulary'), (SELECT L.list_id FROM Lists L WHERE L.list_title = 'Adverb'));
  
-- add words for adverb list
INSERT INTO Words (word)
  VALUES ('Here'),('How'),('More'),('Not'), ('Off'),('When'),('Where'),('Who'), ('Why');

-- add words to adverbs list
INSERT INTO ListWords (word_id, list_id)
  VALUES 
   ((SELECT W.word_id from Words W WHERE word = 'Here'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'Adverb')),
   ((SELECT W.word_id from Words W WHERE word = 'How'),   (SELECT L.list_id from Lists L WHERE L.list_title = 'Adverb')),
   ((SELECT W.word_id from Words W WHERE word = 'More'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'Adverb')),
   ((SELECT W.word_id from Words W WHERE word = 'Not'),   (SELECT L.list_id from Lists L WHERE L.list_title = 'Adverb')),
   ((SELECT W.word_id from Words W WHERE word = 'Off'),   (SELECT L.list_id from Lists L WHERE L.list_title = 'Adverb')),
   ((SELECT W.word_id from Words W WHERE word = 'When'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'Adverb')),
   ((SELECT W.word_id from Words W WHERE word = 'Where'), (SELECT L.list_id from Lists L WHERE L.list_title = 'Adverb')),
   ((SELECT W.word_id from Words W WHERE word = 'Who'),   (SELECT L.list_id from Lists L WHERE L.list_title = 'Adverb')),
   ((SELECT W.word_id from Words W WHERE word = 'Why'),   (SELECT L.list_id from Lists L WHERE L.list_title = 'Adverb'));

-- add title for adverb list
INSERT INTO Lists (list_title)
  VALUES ('Exclamation');  

-- add adverb list to core vocabulary grid
INSERT INTO GridLists (grid_id, list_id)
  VALUES ((SELECT G.grid_id FROM Grids G WHERE G.grid_title = 'Core Vocabulary'), (SELECT L.list_id FROM Lists L WHERE L.list_title = 'Exclamation'));
  
-- add words for adverb list
INSERT INTO Words (word)
  VALUES ('Uh oh');

-- add words to adverbs list
INSERT INTO ListWords (word_id, list_id)
  VALUES 
   ((SELECT W.word_id from Words W WHERE word = 'Uh oh'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'Exclamation'));

   
-- add title for adverb list
INSERT INTO Lists (list_title)
  VALUES ('Noun');  

-- add adverb list to core vocabulary grid
INSERT INTO GridLists (grid_id, list_id)
  VALUES ((SELECT G.grid_id FROM Grids G WHERE G.grid_title = 'Core Vocabulary'), (SELECT L.list_id FROM Lists L WHERE L.list_title = 'Noun'));
  
-- add words for adverb list
INSERT INTO Words (word)
  VALUES ('Color'),('Word');

-- add words to adverbs list
INSERT INTO ListWords (word_id, list_id)
  VALUES 
   ((SELECT W.word_id from Words W WHERE word = 'Color'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'Noun')),
   ((SELECT W.word_id from Words W WHERE word = 'Word'),   (SELECT L.list_id from Lists L WHERE L.list_title = 'Noun'));
   
   
-- add title for preposition list
INSERT INTO Lists (list_title)
  VALUES ('Preposition');  

-- add adverb list to core vocabulary grid
INSERT INTO GridLists (grid_id, list_id)
  VALUES ((SELECT G.grid_id FROM Grids G WHERE G.grid_title = 'Core Vocabulary'), (SELECT L.list_id FROM Lists L WHERE L.list_title = 'Preposition'));
  
-- add words for adverb list
INSERT INTO Words (word)
  VALUES ('In'),('On'),('Out');

INSERT INTO ListWords (word_id, list_id)
  VALUES 
   ((SELECT W.word_id from Words W WHERE word = 'In'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'Preposition')),
   ((SELECT W.word_id from Words W WHERE word = 'On'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'Preposition')),
   ((SELECT W.word_id from Words W WHERE word = 'Out'), (SELECT L.list_id from Lists L WHERE L.list_title = 'Preposition'));


   



