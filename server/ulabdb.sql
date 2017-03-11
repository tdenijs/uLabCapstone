/*******************************************************************
 * Copyright (c) 2016 Portland State University CS Capstone Team
 *
 * Authors: Siggy Hinds, Jiaqi Luo, Christopher Monk, Tristan de Nijs,
 *          Simone Talla Silatchom, Carson Volker, Anton Zipper
 *
 * This file is part of uLabCapstone, distributed under the MIT
 * open source license. For full terms see the LICENSE.md file
 * included in the root of this project.
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

-- add title for fringe-vocabulary grid
INSERT INTO Grids(grid_title)
  VALUES ('fringe vocabulary');

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
  VALUES ('here','img/here.png','here symbol'), ('more','img/more.png','more symbol'),
         ('not','img/not.png','not symbol'), ('off','img/blank.png','off symbol');

-- add words for adverbs list
INSERT INTO Words (word, symbol_id)
  VALUES ('here',  (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'here')),
	       ('more',  (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'more')),
	       ('not',   (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'not')),
	       ('off',   (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'off'));

-- add words to adverbs list
INSERT INTO ListWords (word_id, list_id)
  VALUES
   ((SELECT W.word_id from Words W WHERE word = 'here'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'adverb')),
   ((SELECT W.word_id from Words W WHERE word = 'more'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'adverb')),
   ((SELECT W.word_id from Words W WHERE word = 'not'),   (SELECT L.list_id from Lists L WHERE L.list_title = 'adverb')),
   ((SELECT W.word_id from Words W WHERE word = 'off'),   (SELECT L.list_id from Lists L WHERE L.list_title = 'adverb'));

-- add title for questions list
INSERT INTO Lists (list_title)
  VALUES ('questions');

-- add questions list to core vocabulary grid
INSERT INTO GridLists (grid_id, list_id)
  VALUES ((SELECT G.grid_id FROM Grids G WHERE G.grid_title = 'core vocabulary'), (SELECT L.list_id FROM Lists L WHERE L.list_title = 'questions'));

-- add symbols for questions
INSERT INTO Symbols (symbol_name, symbol_path, symbol_text)
  VALUES ('how','img/how.png','how symbol'),
         ('when','img/when.png','when symbol'),
         ('where','img/where.png','where symbol'),
         ('what','img/what.png','what symbol'),
         ('who','img/who.png','who symbol'),
         ('why','img/why.png','why symbol');

-- add words for questions list
INSERT INTO Words (word, symbol_id)
  VALUES ('how',   (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'how')),
         ('when',  (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'when')),
         ('where', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'where')),
	       ('what',  (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'what')),
         ('who',   (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'who')),
         ('why',   (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'why'));

-- add words to questions list
INSERT INTO ListWords (word_id, list_id)
  VALUES ((SELECT W.word_id from Words W WHERE word = 'how'),   (SELECT L.list_id from Lists L WHERE L.list_title = 'questions')),
         ((SELECT W.word_id from Words W WHERE word = 'when'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'questions')),
         ((SELECT W.word_id from Words W WHERE word = 'where'), (SELECT L.list_id from Lists L WHERE L.list_title = 'questions')),
         ((SELECT W.word_id from Words W WHERE word = 'what'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'questions')),
         ((SELECT W.word_id from Words W WHERE word = 'who'),   (SELECT L.list_id from Lists L WHERE L.list_title = 'questions')),
         ((SELECT W.word_id from Words W WHERE word = 'why'),   (SELECT L.list_id from Lists L WHERE L.list_title = 'questions'));

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
  VALUES ('I','img/I.png','I symbol'),
         ('it','img/it.png','it symbol'),
         ('that','img/that.png','that symbol'),
         ('they','img/they.png','they symbol'),
         ('you','img/you.png','you symbol');

-- add words for pronouns list
INSERT INTO Words (word, symbol_id)
  VALUES ('I',    (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'I')),
         ('it',   (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'it')),
	       ('that', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'that')),
	       ('they', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'they')),
	       ('you',  (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'you'));

--add words to pronoun list
INSERT INTO ListWords (word_id, list_id)
  VALUES
   ((SELECT W.word_id from Words W WHERE word = 'I'),    (SELECT L.list_id from Lists L WHERE L.list_title = 'pronoun')),
   ((SELECT W.word_id from Words W WHERE word = 'it'),   (SELECT L.list_id from Lists L WHERE L.list_title = 'pronoun')),
   ((SELECT W.word_id from Words W WHERE word = 'that'), (SELECT L.list_id from Lists L WHERE L.list_title = 'pronoun')),
   ((SELECT W.word_id from Words W WHERE word = 'they'), (SELECT L.list_id from Lists L WHERE L.list_title = 'pronoun')),
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


-- add title for goodnight moon list
INSERT INTO Lists (list_title)
  VALUES ('goodnight moon');

-- add goodnight moon list to fringe vocabulary grid
INSERT INTO GridLists (grid_id, list_id)
  VALUES ((SELECT G.grid_id FROM Grids G WHERE G.grid_title = 'fringe vocabulary'), (SELECT L.list_id FROM Lists L WHERE L.list_title = 'goodnight moon'));

-- add symbols for goodnight moon list
INSERT INTO Symbols (symbol_name, symbol_path, symbol_text)
  VALUES ('gnm bears','img/gnm_bears.png','bears symbol'),
         ('gnm cow','img/gnm_cow.png','cow symbol'),
         ('gnm goodnight moon','img/gnm_goodnight_moon.png','goodnight moon symbol'),
         ('gnm kittens','img/gnm_kittens.png','kittens symbol'),
  	     ('gnm mittens','img/gnm_mittens.png','mittens symbol'),
         ('gnm moon','img/gnm_moon.png','moon symbol'),
  	     ('gnm room','img/gnm_room.png','room symbol');

-- add words for goodnight moon list
INSERT INTO Words (word, symbol_id)
  VALUES ('bears', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gnm bears')),
         ('cow', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gnm cow')),
   	     ('goodnight moon', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gnm goodnight moon')),
  	     ('kittens', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gnm kittens')),
  	     ('mittens', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gnm mittens')),
  	     ('moon', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gnm moon')),
  	     ('room', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gnm room'));

--add words to goodnight moon list
INSERT INTO ListWords (word_id, list_id)
  VALUES ((SELECT W.word_id from Words W WHERE word = 'bears'), (SELECT L.list_id from Lists L WHERE L.list_title = 'goodnight moon')),
         ((SELECT W.word_id from Words W WHERE word = 'cow'),       (SELECT L.list_id from Lists L WHERE L.list_title = 'goodnight moon')),
         ((SELECT W.word_id from Words W WHERE word = 'goodnight moon'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'goodnight moon')),
         ((SELECT W.word_id from Words W WHERE word = 'kittens'),       (SELECT L.list_id from Lists L WHERE L.list_title = 'goodnight moon')),
         ((SELECT W.word_id from Words W WHERE word = 'mittens'),       (SELECT L.list_id from Lists L WHERE L.list_title = 'goodnight moon')),
         ((SELECT W.word_id from Words W WHERE word = 'moon'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'goodnight moon')),
         ((SELECT W.word_id from Words W WHERE word = 'room'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'goodnight moon'));

-- add title for frozen list
INSERT INTO Lists (list_title)
  VALUES ('frozen');

-- add frozen list to fringe vocabulary grid
INSERT INTO GridLists (grid_id, list_id)
  VALUES ((SELECT G.grid_id FROM Grids G WHERE G.grid_title = 'fringe vocabulary'), (SELECT L.list_id FROM Lists L WHERE L.list_title = 'frozen'));

-- add symbols for frozen list
INSERT INTO Symbols (symbol_name, symbol_path, symbol_text)
  VALUES ('frozen anna','img/frozen_anna.jpeg','Anna symbol'), ('frozen book','img/frozen_book.jpeg','Frozen symbol'),
         ('frozen duke of weselton','img/frozen_duke_of_weselton.jpeg','Duke of Weselton symbol'), ('frozen elsa','img/frozen_elsa.jpeg','Elsa symbol'),
         ('frozen hans','img/frozen_hans.jpeg','Hans symbol'), ('frozen kristof','img/frozen_kristof.jpeg','Kristof symbol'),
         ('frozen marshmallow','img/frozen_marshmallow.jpeg','Marshmallow symbol'), ('frozen oaken', 'img/frozen_oaken.jpeg', 'Oaken symbol'),
         ('frozen olaf', 'img/frozen_olaf.jpeg', 'Olaf symbol'), ('frozen sven', 'img/frozen_sven.jpeg', 'Sven symbol'),
         ('frozen trolls', 'img/frozen_trolls.png', 'trolls symbol');

-- add words for frozen list
INSERT INTO Words (word, symbol_id)
  VALUES ('Anna', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'frozen anna')),
         ('Frozen', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'frozen book')),
         ('Duke of Weselton', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'frozen duke of weselton')),
   	     ('Elsa', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'frozen elsa')),
   	     ('Hans', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'frozen hans')),
   	     ('Kristof', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'frozen kristof')),
         ('Marshmallow', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'frozen marshmallow')),
         ('Oaken', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'frozen oaken')),
         ('Olaf', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'frozen olaf')),
         ('Sven', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'frozen sven')),
         ('trolls', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'frozen trolls'));

--add words to frozen list
INSERT INTO ListWords (word_id, list_id)
  VALUES ((SELECT W.word_id from Words W WHERE word = 'Anna'), (SELECT L.list_id from Lists L WHERE L.list_title = 'frozen')),
         ((SELECT W.word_id from Words W WHERE word = 'Frozen'),       (SELECT L.list_id from Lists L WHERE L.list_title = 'frozen')),
         ((SELECT W.word_id from Words W WHERE word = 'Duke of Weselton'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'frozen')),
         ((SELECT W.word_id from Words W WHERE word = 'Elsa'),       (SELECT L.list_id from Lists L WHERE L.list_title = 'frozen')),
         ((SELECT W.word_id from Words W WHERE word = 'Kristof'),       (SELECT L.list_id from Lists L WHERE L.list_title = 'frozen')),
         ((SELECT W.word_id from Words W WHERE word = 'Marshmallow'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'frozen')),
         ((SELECT W.word_id from Words W WHERE word = 'Oaken'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'frozen')),
         ((SELECT W.word_id from Words W WHERE word = 'Olaf'),       (SELECT L.list_id from Lists L WHERE L.list_title = 'frozen')),
         ((SELECT W.word_id from Words W WHERE word = 'Sven'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'frozen')),
         ((SELECT W.word_id from Words W WHERE word = 'trolls'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'frozen'));

-- add title for the gruffalo list
INSERT INTO Lists (list_title)
  VALUES ('the gruffalo');

-- add the gruffalo list to fringe vocabulary grid
INSERT INTO GridLists (grid_id, list_id)
  VALUES ((SELECT G.grid_id FROM Grids G WHERE G.grid_title = 'fringe vocabulary'), (SELECT L.list_id FROM Lists L WHERE L.list_title = 'the gruffalo'));

-- add symbols for the gruffalo list
INSERT INTO Symbols (symbol_name, symbol_path, symbol_text)
  VALUES ('gruffalo book','img/gruffalo_book.png','the gruffalo book symbol'),
         ('gruffalo back','img/gruffalo_back.png','back symbol'),
         ('gruffalo claws','img/gruffalo_claws.png','claws symbol'),
         ('gruffalo fox','img/gruffalo_fox.png','fox symbol'),
         ('gruffalo jaws','img/gruffalo_jaws.png','jaws symbol'),
         ('gruffalo knees','img/gruffalo_knees.png','knees symbol'),
         ('gruffalo lake','img/gruffalo_lake.png','lake symbol'),
         ('gruffalo mouse', 'img/gruffalo_mouse.png', 'mouse symbol'),
         ('gruffalo nose', 'img/gruffalo_nose.png', 'nose symbol'),
         ('gruffalo owl', 'img/gruffalo_owl.png', 'owl symbol'),
         ('gruffalo snake', 'img/gruffalo_snake.png', 'snake symbol'),
         ('gruffalo the gruffalo', 'img/gruffalo_the_gruffalo.png', 'the gruffalo symbol'),
         ('gruffalo the wood', 'img/gruffalo_the_wood.png', 'the wood symbol'),
         ('gruffalo toes', 'img/gruffalo_toes.png', 'toes symbol'),
         ('gruffalo tongue', 'img/gruffalo_tongue.png', 'tongue symbol'),
         ('gruffalo tusks', 'img/gruffalo_tusks.png', 'tusks symbol');

-- add words for the gruffalo list
INSERT INTO Words (word, symbol_id)
  VALUES ('The Gruffalo', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gruffalo book')),
         ('back', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gruffalo back')),
         ('claws', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gruffalo claws')),
  	     ('fox', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gruffalo fox')),
  	     ('jaws', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gruffalo jaws')),
  	     ('knees', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gruffalo knees')),
         ('lake', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gruffalo lake')),
         ('mouse', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gruffalo mouse')),
         ('nose', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gruffalo nose')),
         ('owl', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gruffalo owl')),
         ('snake', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gruffalo snake')),
         ('the gruffalo', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gruffalo the gruffalo')),
         ('the wood', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gruffalo the wood')),
         ('toes', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gruffalo toes')),
         ('tongue', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gruffalo tongue')),
         ('tusks', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gruffalo tusks'));

--add words to the gruffalo list
INSERT INTO ListWords (word_id, list_id)
  VALUES ((SELECT W.word_id from Words W WHERE word = 'The Gruffalo'), (SELECT L.list_id from Lists L WHERE L.list_title = 'the gruffalo')),
         ((SELECT W.word_id from Words W WHERE word = 'back'),       (SELECT L.list_id from Lists L WHERE L.list_title = 'the gruffalo')),
         ((SELECT W.word_id from Words W WHERE word = 'claws'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'the gruffalo')),
         ((SELECT W.word_id from Words W WHERE word = 'fox'),       (SELECT L.list_id from Lists L WHERE L.list_title = 'the gruffalo')),
         ((SELECT W.word_id from Words W WHERE word = 'jaws'),       (SELECT L.list_id from Lists L WHERE L.list_title = 'the gruffalo')),
         ((SELECT W.word_id from Words W WHERE word = 'knees'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'the gruffalo')),
         ((SELECT W.word_id from Words W WHERE word = 'lake'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'the gruffalo')),
         ((SELECT W.word_id from Words W WHERE word = 'mouse'),       (SELECT L.list_id from Lists L WHERE L.list_title = 'the gruffalo')),
         ((SELECT W.word_id from Words W WHERE word = 'owl'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'the gruffalo')),
         ((SELECT W.word_id from Words W WHERE word = 'snake'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'the gruffalo')),
         ((SELECT W.word_id from Words W WHERE word = 'the gruffalo'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'the gruffalo')),
         ((SELECT W.word_id from Words W WHERE word = 'the wood'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'the gruffalo')),
         ((SELECT W.word_id from Words W WHERE word = 'toes'),       (SELECT L.list_id from Lists L WHERE L.list_title = 'the gruffalo')),
         ((SELECT W.word_id from Words W WHERE word = 'tongue'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'the gruffalo')),
         ((SELECT W.word_id from Words W WHERE word = 'tusks'),     (SELECT L.list_id from Lists L WHERE L.list_title = 'the gruffalo'));

-- add title for the brown bear list
INSERT INTO Lists (list_title)
  VALUES ('brown bear');

-- add brown bear list to fringe vocabulary grid
INSERT INTO GridLists (grid_id, list_id)
  VALUES ((SELECT G.grid_id FROM Grids G WHERE G.grid_title = 'fringe vocabulary'), (SELECT L.list_id FROM Lists L WHERE L.list_title = 'brown bear'));

-- add symbols for the brown bear list
INSERT INTO Symbols (symbol_name, symbol_path, symbol_text)
  VALUES ('brown bear book',' img/brown_bear_book.png','brown bear book symbol'),
         ('bb bear', 'img/bb_bear.png','bear symbol'),
         ('bb blue horse', 'img/bb_blue_horse.png','blue horse symbol'),
         ('bb green frog', 'img/bb_green_frog.png','green frog symbol'),
         ('bb orange fish', 'img/bb_orange_fish.png','orange fish symbol'),
         ('bb purple cat', 'img/bb_purple_cat.png','purple cat symbol'),
         ('bb red bird', 'img/bb_red_bird.png','red bird symbol'),
         ('bb teacher', 'img/bb_teacher.png', 'teacher symbol'),
         ('bb white dog', 'img/bb_white_dog.png', 'white dog symbol'),
         ('bb yellow duck', 'img/bb_yellow_duck.png', 'yellow duck symbol'),
         ('bb black sheep', 'img/bb_black_sheep.png', 'black sheep symbol');

-- add words for the brown bear list
INSERT INTO Words (word, symbol_id)
  VALUES ('brown bear', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'brown bear book')),
         ('bear', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'bb bear')),
         ('blue horse', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'bb blue horse')),
  	     ('green frog', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'bb green frog')),
  	     ('orange fish', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'bb orange fish')),
  	     ('purple cat', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'bb purple cat')),
         ('red bird', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'bb red bird')),
         ('teacher', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'bb teacher')),
         ('white dog', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'bb white dog')),
         ('yellow duck', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'bb yellow duck')),
         ('black sheep', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'bb black sheep'));

--add words to the brown bear list
INSERT INTO ListWords (word_id, list_id)
  VALUES ((SELECT W.word_id from Words W WHERE word = 'brown bear'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'brown bear')),
         ((SELECT W.word_id from Words W WHERE word = 'bear'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'brown bear')),
         ((SELECT W.word_id from Words W WHERE word = 'blue horse'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'brown bear')),
         ((SELECT W.word_id from Words W WHERE word = 'green frog'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'brown bear')),
         ((SELECT W.word_id from Words W WHERE word = 'orange fish'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'brown bear')),
         ((SELECT W.word_id from Words W WHERE word = 'purple cat'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'brown bear')),
         ((SELECT W.word_id from Words W WHERE word = 'red bird'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'brown bear')),
         ((SELECT W.word_id from Words W WHERE word = 'teacher'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'brown bear')),
         ((SELECT W.word_id from Words W WHERE word = 'white dog'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'brown bear')),
         ((SELECT W.word_id from Words W WHERE word = 'yellow duck'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'brown bear')),
         ((SELECT W.word_id from Words W WHERE word = 'black sheep'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'brown bear'));

-- add title for the good dog carl list
INSERT INTO Lists (list_title)
  VALUES ('good dog carl');

-- add good dog carl list to fringe vocabulary grid
INSERT INTO GridLists (grid_id, list_id)
  VALUES ((SELECT G.grid_id FROM Grids G WHERE G.grid_title = 'fringe vocabulary'), (SELECT L.list_id FROM Lists L WHERE L.list_title = 'good dog carl'));

-- add symbols for the good dog carl list
INSERT INTO Symbols (symbol_name, symbol_path, symbol_text)
  VALUES ('gdc baby', 'img/gdc_baby.png', 'baby symbol'),
         ('gdc carl', 'img/gdc_carl.jpeg', 'carl symbol'),
         ('gdc dance', 'img/gdc_dance.jpeg', 'dance symbol'),
         ('gdc dress up', 'img/gdc_dress_up.jpeg', 'dress up symbol'),
         ('gdc fish tank', 'img/gdc_fish_tank.jpeg', 'fish tank symbol'),
         ('gdc laundry shoot', 'img/gdc_laundry_shoot.jpeg', 'laundry shoot symbol'),
         ('gdc mom', 'img/gdc_mom.png', 'mom symbol'),
         ('gdc ride', 'img/gdc_ride.png', 'ride symbol'),
         ('good dog carl book', 'img/good_dog_carl_book.png', 'good dog carl book symbol');

-- add words for the good dog carl list
INSERT INTO Words (word, symbol_id)
  VALUES ('baby', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gdc baby')),
         ('carl', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gdc carl')),
         ('dance', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gdc dance')),
  	     ('dress up', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gdc dress up')),
  	     ('fish tank', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gdc fish tank')),
  	     ('laundry shoot', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gdc laundry shoot')),
         ('mom', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gdc mom')),
         ('ride', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gdc ride')),
         ('good dog carl', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'good dog carl book'));

--add words to the good dog carl list
INSERT INTO ListWords (word_id, list_id)
  VALUES ((SELECT W.word_id from Words W WHERE word = 'baby'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'good dog carl')),
         ((SELECT W.word_id from Words W WHERE word = 'carl'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'good dog carl')),
         ((SELECT W.word_id from Words W WHERE word = 'dance'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'good dog carl')),
         ((SELECT W.word_id from Words W WHERE word = 'dress up'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'good dog carl')),
         ((SELECT W.word_id from Words W WHERE word = 'fish tank'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'good dog carl')),
         ((SELECT W.word_id from Words W WHERE word = 'laundry shoot'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'good dog carl')),
         ((SELECT W.word_id from Words W WHERE word = 'mom'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'good dog carl')),
         ((SELECT W.word_id from Words W WHERE word = 'ride'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'good dog carl')),
         ((SELECT W.word_id from Words W WHERE word = 'good dog carl'),  (SELECT L.list_id from Lists L WHERE L.list_title = 'good dog carl'));

-- add title for the goodnight gorilla list
INSERT INTO Lists (list_title)
  VALUES ('goodnight gorilla');

-- add the goodnight gorilla list to fringe vocabulary grid
INSERT INTO GridLists (grid_id, list_id)
  VALUES ((SELECT G.grid_id FROM Grids G WHERE G.grid_title = 'fringe vocabulary'), (SELECT L.list_id FROM Lists L WHERE L.list_title = 'goodnight gorilla'));

-- add symbols for the goodnight gorilla list
INSERT INTO Symbols (symbol_name, symbol_path, symbol_text)
  VALUES ('goodnight gorilla', 'img/goodnight_gorilla_book.jpeg', 'goodnight gorilla book symbol'),
         ('gng armadillo', 'img/gng_armadillo.jpeg', 'armadillo symbol'),
         ('gng cage', 'img/gng_cage.jpeg', 'cage symbol'),
         ('gng elephant', 'img/gng_elephant.jpeg', 'elephant symbol'),
         ('gng giraffe', 'img/gng_giraffe.jpeg', 'giraffe symbol'),
         ('gng gorilla', 'img/gng_gorilla.jpeg', 'gorilla symbol'),
         ('gng hyena', 'img/gng_hyena.jpeg', 'hyena symbol'),
         ('gng keys', 'img/gng_keys.jpeg', 'key symbsol'),
         ('gng lion', 'img/gng_lion.jpeg', 'lion symbol'),
         ('gng zoo keeper', 'img/gng_zoo_keeper.jpeg', 'zoo keeper symbol'),
         ('gng zoo keepers wife', 'img/gng_zoo_keepers_wife.jpeg', 'zoo keepers wife symbol');

-- add words for the goodnight gorilla list
INSERT INTO Words (word, symbol_id)
  VALUES ('goodnight gorilla book', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'goodnight gorilla book')),
         ('armadillo', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gng armadillo')),
         ('cage', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gng cage')),
         ('elephant', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gng elephant')),
         ('giraffe', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gng giraffe')),
         ('gorilla', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gng gorilla')),
         ('hyena', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gng hyena')),
         ('keys', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gng keys')),
         ('lion', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gng lion')),
         ('zoo keeper', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gng zoo keeper')),
         ('zoo keepers wife', (SELECT S.symbol_id FROM Symbols S WHERE symbol_name = 'gng zoo keepers wife'));

--add words to the goodnight goriall list
INSERT INTO ListWords (word_id, list_id)
  VALUES ((SELECT W.word_id from Words W WHERE word = 'goodnight gorilla book'), (SELECT L.list_id from Lists L WHERE L.list_title = 'goodnight gorilla')),
         ((SELECT W.word_id from Words W WHERE word = 'armadillo'), (SELECT L.list_id from Lists L WHERE L.list_title = 'goodnight gorilla')),
         ((SELECT W.word_id from Words W WHERE word = 'cage'), (SELECT L.list_id from Lists L WHERE L.list_title = 'goodnight gorilla')),
         ((SELECT W.word_id from Words W WHERE word = 'elephant'), (SELECT L.list_id from Lists L WHERE L.list_title = 'goodnight gorilla')),
         ((SELECT W.word_id from Words W WHERE word = 'giraffe'), (SELECT L.list_id from Lists L WHERE L.list_title = 'goodnight gorilla')),
         ((SELECT W.word_id from Words W WHERE word = 'gorilla'), (SELECT L.list_id from Lists L WHERE L.list_title = 'goodnight gorilla')),
         ((SELECT W.word_id from Words W WHERE word = 'hyena'), (SELECT L.list_id from Lists L WHERE L.list_title = 'goodnight gorilla')),
         ((SELECT W.word_id from Words W WHERE word = 'keys'), (SELECT L.list_id from Lists L WHERE L.list_title = 'goodnight gorilla')),
         ((SELECT W.word_id from Words W WHERE word = 'lion'), (SELECT L.list_id from Lists L WHERE L.list_title = 'goodnight gorilla')),
         ((SELECT W.word_id from Words W WHERE word = 'zoo keeper'), (SELECT L.list_id from Lists L WHERE L.list_title = 'goodnight gorilla')),
         ((SELECT W.word_id from Words W WHERE word = 'zoo keepers wife'), (SELECT L.list_id from Lists L WHERE L.list_title = 'goodnight gorilla'));
