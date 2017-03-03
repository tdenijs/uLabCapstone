/*******************************************************************
 * Copyright (c) 2016 Portland State University CS Capstone Team
 *
 * Authors: Siggy Hinds, Jiaqi Luo, Christopher Monk, Tristan de Nijs,
 *                 Simone Talla Silatchom, Carson Volker, Anton Zipper
 *
 * This file is part of uLabCapstone, distributed under the MIT
 * open source licence. For full terms see the LICENSE.md file
 * included in the root of this project.
 *
 *******************************************************************/

/**
 * sql file to initialize the ulabdb
 * version 1.3
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

/* insert data for core vocabulary grid */

-- add title for core-vocabulary grid
INSERT INTO Grids(grid_title)
  VALUES ('core vocabulary');

-- add title for adjective list
INSERT INTO Lists (list_title)
  VALUES ('adjective');

-- add adjective list to core vocabulary grid
INSERT INTO GridLists (grid_id, list_id)
  VALUES ((SELECT G.grid_id FROM Grids G WHERE G.grid_title = 'core vocabulary'), (SELECT L.list_id FROM Lists L WHERE L.list_title = 'adjective'));

-- add symbols for adjectives
INSERT INTO Symbols (symbol_name, symbol_path, symbol_text)
  VALUES ('bad','img/bad.png','bad symbol'),      ('funny','img/funny.png','funny symbol'),
         ('good','img/good.png','good symbol'),   ('happy','img/happy.png','happy symbol'),
	 ('sad','img/sad.png','sad symbol'),      ('scary','img/scary.png','scary symbol'),
	 ('silly','img/silly.png','silly symbol');

-- add words for adjective list
INSERT INTO Words (word, symbol_id)
  VALUES ('bad',   (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'bad')),
         ('funny', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'funny')),
	 ('good',  (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'good')),
	 ('happy', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'happy')),
	 ('sad',   (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'sad')),
	 ('scary', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'scary')),
	 ('silly', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'silly'));

-- add words to adjective list
INSERT INTO ListWords (word_id, list_id)
  VALUES
   ((SELECT W.word_id from Words W WHERE word = 'bad'),   (SELECT L.list_id from Lists L WHERE L.list_title = 'adjective')),
   ((SELECT W.word_id from Words W WHERE word = 'funny'), (SELECT L.list_id from Lists L WHERE L.list_title = 'adjective')),
   ((SELECT W.word_id from Words W WHERE word = 'good'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'adjective')),
   ((SELECT W.word_id from Words W WHERE word = 'happy'), (SELECT L.list_id from Lists L WHERE L.list_title = 'adjective')),
   ((SELECT W.word_id from Words W WHERE word = 'sad'),   (SELECT L.list_id from Lists L WHERE L.list_title = 'adjective')),
   ((SELECT W.word_id from Words W WHERE word = 'scary'), (SELECT L.list_id from Lists L WHERE L.list_title = 'adjective')),
   ((SELECT W.word_id from Words W WHERE word = 'silly'), (SELECT L.list_id from Lists L WHERE L.list_title = 'adjective'));


-- add title for adverb list
INSERT INTO Lists (list_title)
  VALUES ('adverb');

-- add adverb list to core vocabulary grid
INSERT INTO GridLists (grid_id, list_id)
  VALUES ((SELECT G.grid_id FROM Grids G WHERE G.grid_title = 'core vocabulary'), (SELECT L.list_id FROM Lists L WHERE L.list_title = 'adverb'));

-- add symbols for adverbs
INSERT INTO Symbols (symbol_name, symbol_path, symbol_text)
  VALUES ('here','img/here.png','here symbol'),   ('how','img/how.png','how symbol'),
         ('more','img/more.png','more symbol'),   ('not','img/not.png','not symbol'),
	 ('off','img/blank.png','off symbol'),                 ('when','img/when.png','when symbol'),
	 ('where','img/where.png','where symbol'),('who','img/who.png','who symbol'),
	 ('why','img/why.png','why symbol');

-- add words for adverbs list
INSERT INTO Words (word, symbol_id)
  VALUES ('here',  (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'here')),
         ('how',   (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'how')),
	 ('more',  (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'more')),
	 ('not',   (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'not')),
	 ('off',   (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'off')),
	 ('when',  (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'when')),
	 ('where', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'where')),
	 ('who',   (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'who')),
	 ('why',   (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'why'));

-- add words to adverbs list
INSERT INTO ListWords (word_id, list_id)
  VALUES
   ((SELECT W.word_id from Words W WHERE word = 'here'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'adverb')),
   ((SELECT W.word_id from Words W WHERE word = 'how'),   (SELECT L.list_id from Lists L WHERE L.list_title = 'adverb')),
   ((SELECT W.word_id from Words W WHERE word = 'more'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'adverb')),
   ((SELECT W.word_id from Words W WHERE word = 'not'),   (SELECT L.list_id from Lists L WHERE L.list_title = 'adverb')),
   ((SELECT W.word_id from Words W WHERE word = 'off'),   (SELECT L.list_id from Lists L WHERE L.list_title = 'adverb')),
   ((SELECT W.word_id from Words W WHERE word = 'when'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'adverb')),
   ((SELECT W.word_id from Words W WHERE word = 'where'), (SELECT L.list_id from Lists L WHERE L.list_title = 'adverb')),
   ((SELECT W.word_id from Words W WHERE word = 'who'),   (SELECT L.list_id from Lists L WHERE L.list_title = 'adverb')),
   ((SELECT W.word_id from Words W WHERE word = 'why'),   (SELECT L.list_id from Lists L WHERE L.list_title = 'adverb'));

-- add title for exclamation list
INSERT INTO Lists (list_title)
  VALUES ('exclamation');

-- add adverb list to core vocabulary grid
INSERT INTO GridLists (grid_id, list_id)
  VALUES ((SELECT G.grid_id FROM Grids G WHERE G.grid_title = 'core vocabulary'), (SELECT L.list_id FROM Lists L WHERE L.list_title = 'exclamation'));

-- add symbols for exclamation
INSERT INTO Symbols (symbol_name, symbol_path, symbol_text)
  VALUES ('uh oh','img/blank.png','uh oh symbol');

-- add words for exclamation list
INSERT INTO Words (word, symbol_id)
  VALUES ('uh oh',  (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'uh oh'));

-- add words to exclamation list
INSERT INTO ListWords (word_id, list_id)
  VALUES
   ((SELECT W.word_id from Words W WHERE word = 'uh oh'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'exclamation'));


-- add title for noun list
INSERT INTO Lists (list_title)
  VALUES ('noun');

-- add noun list to core vocabulary grid
INSERT INTO GridLists (grid_id, list_id)
  VALUES ((SELECT G.grid_id FROM Grids G WHERE G.grid_title = 'core vocabulary'), (SELECT L.list_id FROM Lists L WHERE L.list_title = 'noun'));

-- add symbols for nouns
INSERT INTO Symbols (symbol_name, symbol_path, symbol_text)
  VALUES ('color','img/colors.png','color symbol'), ('word','img/word.png','word symbol');

-- add words for nouns list
INSERT INTO Words (word, symbol_id)
  VALUES ('color',  (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'color')),
         ('word',   (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'word'));

-- add words to noun list
INSERT INTO ListWords (word_id, list_id)
  VALUES
   ((SELECT W.word_id from Words W WHERE word = 'color'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'noun')),
   ((SELECT W.word_id from Words W WHERE word = 'word'),   (SELECT L.list_id from Lists L WHERE L.list_title = 'noun'));


-- add title for preposition list
INSERT INTO Lists (list_title)
  VALUES ('preposition');

-- add preposition list to core vocabulary grid
INSERT INTO GridLists (grid_id, list_id)
  VALUES ((SELECT G.grid_id FROM Grids G WHERE G.grid_title = 'core vocabulary'), (SELECT L.list_id FROM Lists L WHERE L.list_title = 'preposition'));

-- add symbols for prepositions
INSERT INTO Symbols (symbol_name, symbol_path, symbol_text)
  VALUES ('in','img/in.png','in symbol'), ('on','img/blank.png','on Symbol'), ('out','img/out.png','out symbol');

-- add words for prepositions list
INSERT INTO Words (word, symbol_id)
  VALUES ('in',  (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'in')),
         ('on',  (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'on')),
         ('out', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'out'));

-- add words to preposition list
INSERT INTO ListWords (word_id, list_id)
  VALUES
   ((SELECT W.word_id from Words W WHERE word = 'in'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'preposition')),
   ((SELECT W.word_id from Words W WHERE word = 'on'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'preposition')),
   ((SELECT W.word_id from Words W WHERE word = 'out'), (SELECT L.list_id from Lists L WHERE L.list_title = 'preposition'));


-- add title for pronoun list
INSERT INTO Lists (list_title)
  VALUES ('pronoun');

-- add pronoun list to core vocabulary grid
INSERT INTO GridLists (grid_id, list_id)
  VALUES ((SELECT G.grid_id FROM Grids G WHERE G.grid_title = 'core vocabulary'), (SELECT L.list_id FROM Lists L WHERE L.list_title = 'pronoun'));

-- add symbols for pronouns
INSERT INTO Symbols (symbol_name, symbol_path, symbol_text)
  VALUES ('I','img/I.png','I symbol'),          ('it','img/it.png','it symbol'),
         ('that','img/that.png','that symbol'), ('they','img/they.png','they symbol'),
         ('what','img/what.png','what symbol'), ('you','img/you.png','you symbol');

-- add words for pronouns list
INSERT INTO Words (word, symbol_id)
  VALUES ('I',    (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'I')),
         ('it',   (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'it')),
	 ('that', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'that')),
	 ('they', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'they')),
	 ('what', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'what')),
	 ('you',  (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'you'));

--add words to pronoun list
INSERT INTO ListWords (word_id, list_id)
  VALUES
   ((SELECT W.word_id from Words W WHERE word = 'I'),    (SELECT L.list_id from Lists L WHERE L.list_title = 'pronoun')),
   ((SELECT W.word_id from Words W WHERE word = 'it'),   (SELECT L.list_id from Lists L WHERE L.list_title = 'pronoun')),
   ((SELECT W.word_id from Words W WHERE word = 'that'), (SELECT L.list_id from Lists L WHERE L.list_title = 'pronoun')),
   ((SELECT W.word_id from Words W WHERE word = 'they'), (SELECT L.list_id from Lists L WHERE L.list_title = 'pronoun')),
   ((SELECT W.word_id from Words W WHERE word = 'what'), (SELECT L.list_id from Lists L WHERE L.list_title = 'pronoun')),
   ((SELECT W.word_id from Words W WHERE word = 'you'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'pronoun'));


-- add title for verb list
INSERT INTO Lists (list_title)
  VALUES ('verb');

-- add verb list to core vocabulary grid
INSERT INTO GridLists (grid_id, list_id)
  VALUES ((SELECT G.grid_id FROM Grids G WHERE G.grid_title = 'core vocabulary'), (SELECT L.list_id FROM Lists L WHERE L.list_title = 'verb'));

-- add symbols for verbs
INSERT INTO Symbols (symbol_name, symbol_path, symbol_text)
  VALUES ('all done','img/blank.png','all done symbol'),     ('do','img/blank.png','do symbol'),
         ('feel','img/blank.png','feel symbol'),             ('go','img/go.png','go symbol'),
	 ('is','img/blank.png','is symbol'),                 ('like','img/blank.png','like symbol'),
	 ('read','img/read.png','read symbol'), ('said','img/said.png','said symbol'),
	 ('see','img/see.png','see symbol'),    ('think','img/think.png','think symbol'),
	 ('turn','img/turn.png','turn symbol'), ('want','img/blank.png','want symbol');

-- add words for verbs list
INSERT INTO Words (word, symbol_id)
  VALUES ('all done',  (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'all done')),
         ('do',        (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'do')),
         ('feel',      (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'feel')),
         ('go',        (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'go')),
	 ('is',        (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'is')),
	 ('like',      (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'like')),
	 ('read',      (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'read')),
	 ('said',      (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'said')),
	 ('see',       (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'see')),
	 ('think',     (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'think')),
	 ('turn',      (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'turn')),
	 ('want',      (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'want'));

--add words to verb list
INSERT INTO ListWords (word_id, list_id)
  VALUES
   ((SELECT W.word_id from Words W WHERE word = 'all done'), (SELECT L.list_id from Lists L WHERE L.list_title = 'verb')),
   ((SELECT W.word_id from Words W WHERE word = 'do'),       (SELECT L.list_id from Lists L WHERE L.list_title = 'verb')),
   ((SELECT W.word_id from Words W WHERE word = 'feel'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'verb')),
   ((SELECT W.word_id from Words W WHERE word = 'go'),       (SELECT L.list_id from Lists L WHERE L.list_title = 'verb')),
   ((SELECT W.word_id from Words W WHERE word = 'is'),       (SELECT L.list_id from Lists L WHERE L.list_title = 'verb')),
   ((SELECT W.word_id from Words W WHERE word = 'like'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'verb')),
   ((SELECT W.word_id from Words W WHERE word = 'read'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'verb')),
   ((SELECT W.word_id from Words W WHERE word = 'said'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'verb')),
   ((SELECT W.word_id from Words W WHERE word = 'see'),      (SELECT L.list_id from Lists L WHERE L.list_title = 'verb')),
   ((SELECT W.word_id from Words W WHERE word = 'think'),    (SELECT L.list_id from Lists L WHERE L.list_title = 'verb')),
   ((SELECT W.word_id from Words W WHERE word = 'turn'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'verb')),
   ((SELECT W.word_id from Words W WHERE word = 'want'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'verb'));
