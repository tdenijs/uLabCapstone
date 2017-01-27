/**
 * sql file to initialize the ulabdb
 * version 1.1
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
  symbol_path VARCHAR,
  symbol_text VARCHAR
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

-- add symbols for adjectives 
INSERT INTO Symbols (symbol_name, symbol_path, symbol_text)
  VALUES ('Bad','img/bad.png','Bad Symbol'),      ('Funny','img/funny.png','Funny Symbol'), 
         ('Good','img/good.png','Good Symbol'),   ('Happy','img/happy.png','Happy Symbol'), 
		 ('Sad','img/sad.png','Sad Symbol'),      ('Scary','img/scary.png','Scary Symbol'),
		 ('Silly','img/silly.png','Silly Symbol');

-- add words for adjective list
INSERT INTO Words (word, symbol_id)
  VALUES ('Bad',   (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Bad')),
         ('Funny', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Funny')),
		 ('Good',  (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Good')),
		 ('Happy', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Happy')), 
		 ('Sad',   (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Sad')),
		 ('Scary', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Scary')),
		 ('Silly', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Silly'));

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

-- add symbols for adverbs 
INSERT INTO Symbols (symbol_name, symbol_path, symbol_text)
  VALUES ('Here','img/here.png','Here Symbol'),   ('How','img/how.png','How Symbol'), 
         ('More','img/more.png','More Symbol'),   ('Not','img/not.png','Not Symbol'), 
		 ('Off','','Off Symbol'),      ('When','img/when.png','When Symbol'),
		 ('Where','img/where.png','Where Symbol'),('Who','img/who.png','Who Symbol'),
		 ('Why','img/why.png','Why Symbol');

-- add words for adverbs list
INSERT INTO Words (word, symbol_id)
  VALUES ('Here',  (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Here')),
         ('How',   (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'How')),
		 ('More',  (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'More')),
		 ('Not',   (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Not')), 
		 ('Off',   (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Off')),
		 ('When',  (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'When')),
		 ('Where', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Where')),
		 ('Who',   (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Who')),
		 ('Why',   (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Why'));
 
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

-- add title for exclamation list
INSERT INTO Lists (list_title)
  VALUES ('Exclamation');  

-- add adverb list to core vocabulary grid
INSERT INTO GridLists (grid_id, list_id)
  VALUES ((SELECT G.grid_id FROM Grids G WHERE G.grid_title = 'Core Vocabulary'), (SELECT L.list_id FROM Lists L WHERE L.list_title = 'Exclamation'));

-- add symbols for exclamation
INSERT INTO Symbols (symbol_name, symbol_path, symbol_text)
  VALUES ('Uh Oh','','Uh Oh Symbol');   

-- add words for exclamation list
INSERT INTO Words (word, symbol_id)
  VALUES ('Uh Oh',  (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Uh Oh'));

-- add words to exclamation list
INSERT INTO ListWords (word_id, list_id)
  VALUES 
   ((SELECT W.word_id from Words W WHERE word = 'Uh Oh'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'Exclamation'));

   
-- add title for noun list
INSERT INTO Lists (list_title)
  VALUES ('Noun');  

-- add noun list to core vocabulary grid
INSERT INTO GridLists (grid_id, list_id)
  VALUES ((SELECT G.grid_id FROM Grids G WHERE G.grid_title = 'Core Vocabulary'), (SELECT L.list_id FROM Lists L WHERE L.list_title = 'Noun'));

-- add symbols for nouns
INSERT INTO Symbols (symbol_name, symbol_path, symbol_text)
  VALUES ('Color','img/colors.png','Color Symbol'), ('Word','img/word.png','Word Symbol');   

-- add words for nouns list
INSERT INTO Words (word, symbol_id)
  VALUES ('Color',  (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Color')),
         ('Word',  (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Word'));

-- add words to noun list
INSERT INTO ListWords (word_id, list_id)
  VALUES 
   ((SELECT W.word_id from Words W WHERE word = 'Color'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'Noun')),
   ((SELECT W.word_id from Words W WHERE word = 'Word'),   (SELECT L.list_id from Lists L WHERE L.list_title = 'Noun'));
   
   
-- add title for preposition list
INSERT INTO Lists (list_title)
  VALUES ('Preposition');  

-- add preposition list to core vocabulary grid
INSERT INTO GridLists (grid_id, list_id)
  VALUES ((SELECT G.grid_id FROM Grids G WHERE G.grid_title = 'Core Vocabulary'), (SELECT L.list_id FROM Lists L WHERE L.list_title = 'Preposition'));

-- add symbols for prepositions
INSERT INTO Symbols (symbol_name, symbol_path, symbol_text)
  VALUES ('In','img/in.png','In Symbol'), ('On','','On Symbol'), ('Out','img/out.png','Out Symbol');   

-- add words for prepositions list
INSERT INTO Words (word, symbol_id)
  VALUES ('In',  (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'In')),
         ('On',  (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'On')),
         ('Out', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Out'));

-- add words to preposition list  
INSERT INTO ListWords (word_id, list_id)
  VALUES 
   ((SELECT W.word_id from Words W WHERE word = 'In'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'Preposition')),
   ((SELECT W.word_id from Words W WHERE word = 'On'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'Preposition')),
   ((SELECT W.word_id from Words W WHERE word = 'Out'), (SELECT L.list_id from Lists L WHERE L.list_title = 'Preposition'));


-- add title for pronoun list
INSERT INTO Lists (list_title)
  VALUES ('Pronoun');  

-- add pronoun list to core vocabulary grid
INSERT INTO GridLists (grid_id, list_id)
  VALUES ((SELECT G.grid_id FROM Grids G WHERE G.grid_title = 'Core Vocabulary'), (SELECT L.list_id FROM Lists L WHERE L.list_title = 'Pronoun'));

-- add symbols for pronouns
INSERT INTO Symbols (symbol_name, symbol_path, symbol_text)
  VALUES ('I','img/I.png','I Symbol'),          ('It','img/it.png','It Symbol'), 
         ('That','img/that.png','That Symbol'), ('They','img/they.png','They Symbol'), 
		 ('What','img/what.png','What Symbol'), ('You','img/you.png','You Symbol');

-- add words for pronouns list
INSERT INTO Words (word, symbol_id)
  VALUES ('I',    (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'I')),
         ('It',   (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'It')),
		 ('That', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'That')),
		 ('They', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'They')), 
		 ('What', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'What')),
		 ('You',  (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'You'));
  
--add words to pronoun list  
INSERT INTO ListWords (word_id, list_id)
  VALUES 
   ((SELECT W.word_id from Words W WHERE word = 'I'),    (SELECT L.list_id from Lists L WHERE L.list_title = 'Pronoun')),
   ((SELECT W.word_id from Words W WHERE word = 'It'),   (SELECT L.list_id from Lists L WHERE L.list_title = 'Pronoun')),
   ((SELECT W.word_id from Words W WHERE word = 'That'), (SELECT L.list_id from Lists L WHERE L.list_title = 'Pronoun')),
   ((SELECT W.word_id from Words W WHERE word = 'They'), (SELECT L.list_id from Lists L WHERE L.list_title = 'Pronoun')),
   ((SELECT W.word_id from Words W WHERE word = 'What'), (SELECT L.list_id from Lists L WHERE L.list_title = 'Pronoun')),
   ((SELECT W.word_id from Words W WHERE word = 'You'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'Pronoun')); 


-- add title for verb list
INSERT INTO Lists (list_title)
  VALUES ('Verb');  

-- add verb list to core vocabulary grid
INSERT INTO GridLists (grid_id, list_id)
  VALUES ((SELECT G.grid_id FROM Grids G WHERE G.grid_title = 'Core Vocabulary'), (SELECT L.list_id FROM Lists L WHERE L.list_title = 'Verb'));

-- add symbols for verbs 
INSERT INTO Symbols (symbol_name, symbol_path, symbol_text)
  VALUES ('All Done','','All Done Symbol'),     ('Do','','Do Symbol'), 
         ('Feel','','Feel Symbol'),             ('Go','img/go.png','Go Symbol'), 
		 ('Is','','Is Symbol'),                 ('Like','','Like Symbol'),
		 ('Read','img/read.png','Read Symbol'), ('Said','img/said.png','Said Symbol'),
		 ('See','img/see.png','See Symbol'),    ('Think','img/think.png','Think Symbol'),
		 ('Turn','img/turn.png','Turn Symbol'), ('Want','','Want Symbol');

-- add words for verbs list
INSERT INTO Words (word, symbol_id)
  VALUES ('All Done',  (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'All Done')),
         ('Do',        (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Do')),
		 ('Feel',      (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Feel')),
		 ('Go',        (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Go')), 
		 ('Is',        (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Is')),
		 ('Like',      (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Like')),
		 ('Read',      (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Read')),
		 ('Said',      (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Said')),
		 ('See',       (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'See')),
		 ('Think',     (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Think')),
		 ('Turn',      (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Turn')),
		 ('Want',      (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'Want'));
  
--add words to verb list  
INSERT INTO ListWords (word_id, list_id)
  VALUES 
   ((SELECT W.word_id from Words W WHERE word = 'All Done'), (SELECT L.list_id from Lists L WHERE L.list_title = 'Verb')),
   ((SELECT W.word_id from Words W WHERE word = 'Do'),       (SELECT L.list_id from Lists L WHERE L.list_title = 'Verb')),
   ((SELECT W.word_id from Words W WHERE word = 'Feel'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'Verb')),
   ((SELECT W.word_id from Words W WHERE word = 'Go'),       (SELECT L.list_id from Lists L WHERE L.list_title = 'Verb')),
   ((SELECT W.word_id from Words W WHERE word = 'Is'),       (SELECT L.list_id from Lists L WHERE L.list_title = 'Verb')),
   ((SELECT W.word_id from Words W WHERE word = 'Like'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'Verb')),  
   ((SELECT W.word_id from Words W WHERE word = 'Read'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'Verb')),
   ((SELECT W.word_id from Words W WHERE word = 'Said'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'Verb')),
   ((SELECT W.word_id from Words W WHERE word = 'See'),      (SELECT L.list_id from Lists L WHERE L.list_title = 'Verb')),
   ((SELECT W.word_id from Words W WHERE word = 'Think'),    (SELECT L.list_id from Lists L WHERE L.list_title = 'Verb')),
   ((SELECT W.word_id from Words W WHERE word = 'Turn'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'Verb')),
   ((SELECT W.word_id from Words W WHERE word = 'Want'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'Verb'));     