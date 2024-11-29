drop table Trainer1 cascade constraints;
drop table Trainer2 cascade constraints;
drop table Trainer3 cascade constraints;
drop table Shelter cascade constraints;
drop table POwner cascade constraints;
drop table Veterinarian cascade constraints;
drop table Supplier1 cascade constraints;
drop table Supplier2 cascade constraints;
drop table Supplier3 cascade constraints;
drop table Pet1 cascade constraints;
drop table Pet2 cascade constraints;
drop table Pet3 cascade constraints;
drop table Pet4 cascade constraints;
drop table Pet5 cascade constraints;
drop table Pet6 cascade constraints;
drop table Pet7 cascade constraints;
drop table Pet8 cascade constraints;
drop table Pet9 cascade constraints;
drop table Pet10 cascade constraints;
drop table Pet11 cascade constraints;
drop table AdoptionApplication cascade constraints;
drop table Documentation cascade constraints;
drop table Dog cascade constraints;
drop table Cat cascade constraints;
drop table PurchasesFrom cascade constraints;
drop table Trains cascade constraints;
drop table Examines cascade constraints;
drop table VetWorksWithShel cascade constraints;
drop table TrainWorksWithShel cascade constraints;
drop table Hosts cascade constraints;


create table Trainer1 (
	contact	varchar	(12) primary key,
	tname	varchar (10)
);
grant select on Trainer1 to public;

create table Trainer2 (
	certification	varchar (50) primary key,
	specialty 	varchar (50)
);
grant select on Trainer2 to public;

create table Trainer3 (
	contact	varchar	(12) primary key,
	certification	varchar (50),
	foreign key (contact) references Trainer1 ON DELETE CASCADE,	
	foreign key (certification) references Trainer2 ON DELETE CASCADE
); 
grant select on Trainer3 to public;

create table Shelter (
	saddress	varchar (50)	primary key,
	capacity integer,
	contact	varchar (12),
	unique (contact)
);
grant select on Shelter to public;

create table POwner(
	oaddress	varchar	(50) primary key,
	oname	varchar (10),
	contact	varchar (12),
	unique (contact)
);
grant select on POwner to public;

create table Veterinarian(
	contact	varchar	(12) primary key,
	vname	varchar (10),
	experience	varchar (50)
);
grant select on Veterinarian to public;

create table Supplier1 (
	saddress	varchar	(50) primary key,
	contact	varchar (12),
	unique (contact)
);
grant select on Supplier1 to public;

create table Supplier2 (
	industry	varchar	(30) primary key,
	supplyType	varchar (30)
);
grant select on Supplier2 to public;

create table Supplier3 (
	saddress	varchar	(50) primary key,
	industry	varchar(30),
	foreign key (saddress) references Supplier1,
	foreign key (industry) references Supplier2
);
grant select on Supplier3 to public;


create table Pet1 (
	pid 		integer	primary key,
	pname		varchar (12)
);
grant select on Pet1 to public;

create table Pet2 (
	species			varchar (30),
	age				integer,
	dietaryRequirements		varchar (30),
	primary key (species, age)
);
grant select on Pet2 to public;
grant update on Pet2 to public;

create table Pet3 (
	pid	integer	primary key,
	age	integer,
	foreign key (pid) references Pet1
);
grant select on Pet3 to public;

create table Pet4 (
	pid			integer	primary key,
	healthCondition	varchar (30),
	foreign key (pid) references Pet1
);
grant select on Pet4 to public;

create table Pet5 (
	pid			integer	primary key,
	adoptionDate		date,
	foreign key (pid) references Pet1
);
grant select on Pet5 to public;

create table Pet6 (
	pid			integer	primary key,
	arriveDate		date,
	foreign key (pid) references Pet1
);
grant select on Pet6 to public;
grant update on Pet6 to public;

create table Pet7 (
	pid			integer	primary key,
	species		varchar (30),
	foreign key (pid) references Pet1
);
grant select on Pet7 to public;
grant update on Pet7 to public;

create table Pet8 (
	species			varchar (30),
	breed				varchar (30),
	lifespan			integer,
	primary key (species, breed)
);
grant select on Pet8 to public;
grant update on Pet8 to public;

create table Pet9 (
	pid			integer	primary key,
	breed			varchar (30),
	foreign key (pid) references Pet1
);
grant select on Pet9 to public;
grant update on Pet9 to public;

create table Pet10 (
	pid			integer	primary key,
	ownerAddress		varchar (50),
	foreign key (pid) references Pet1,
	foreign key (ownerAddress) references POwner
);
grant select on Pet10 to public;

create table Pet11 (
	species					varchar (30),
	dietaryRequirements		varchar (30),
	healthCondition			varchar (30),
	carePlan 				varchar(30),
	primary key (species, dietaryRequirements, healthCondition)
);
grant select on Pet11 to public;
grant update on Pet11 to public;

create table AdoptionApplication (
	shelterAddress	varchar	(50) NOT NULL,
	ownerAddress	varchar	(50) NOT NULL,
	id				integer	primary key,
	applicationDate	date,
	approvalStatus	varchar (10),
	foreign key (shelterAddress) references Shelter,
	foreign key (ownerAddress) references POwner
);
grant select on AdoptionApplication to public;

create table Documentation (
	pid					integer,
	veterinarianContact	varchar (12),
	id					integer,
	ddescription			varchar (50),
	ddate				date,
	primary key (pid, id),
	foreign key (pid) references Pet1,
	foreign key (veterinarianContact) references Veterinarian
);
grant select on Documentation to public;

create table Dog (
	pid					integer,
	coatType			varchar (30),
	barkingFrequency	integer,
	primary key (pid),
	foreign key (pid) references Pet1
);
grant select on Dog to public;

create table Cat (
	pid				integer,
	furType			varchar (30),
	clawLength		integer,
	primary key (pid),
	foreign key (pid) references Pet1
);
grant select on Cat to public;

create table PurchasesFrom (
	supplierAddress	varchar (30), 
	shelterAddress	varchar (30),
	primary key (supplierAddress, shelterAddress),
	foreign key (supplierAddress) references Supplier1,
	foreign key (shelterAddress) references Shelter
);
grant select on PurchasesFrom to public;

create table Trains (
	trainerContact		varchar (12),
	pid					integer,
	primary key (trainerContact, pid),
	foreign key (TrainerContact) references Trainer1,
	foreign key (pid) references Pet1
);
grant select on Trains to public;

create table Examines (
	veterinarianContact	varchar (12),
	pid					integer,
	primary key (veterinarianContact, pid),
	foreign key (veterinarianContact) references Veterinarian,
	foreign key (pid) references Pet1
);
grant select on Examines to public;

create table VetWorksWithShel (
	veterinarianContact	varchar (12), 
	shelterAddress	varchar (50),
	primary key (veterinarianContact, shelterAddress),
	foreign key (veterinarianContact) references Veterinarian,
	foreign key (shelterAddress) references Shelter
);
grant select on VetWorksWithShel to public;

create table TrainWorksWithShel (
	trainerContact		varchar (12), 
	shelterAddress		varchar (50),
	primary key (trainerContact, shelterAddress),
	foreign key (trainerContact) references Trainer1,
	foreign key (shelterAddress) references Shelter
);
grant select on TrainWorksWithShel to public;

create table Hosts (
	pid				integer,
	shelterAddress	varchar (50),
	primary key (pid, shelterAddress),
	foreign key (pid) references Pet1,
	foreign key (shelterAddress) references Shelter
);
grant select on Hosts to public;

insert into Trainer1 values ('778-111-1111', 'Bob');
insert into Trainer1 values ('778-111-1112', 'Rob');
insert into Trainer1 values ('778-111-1113', 'Steve');
insert into Trainer1 values ('778-111-1114', 'Matt');
insert into Trainer1 values ('778-111-1115', 'Julie');

insert into Trainer2 values ('Certified Professional Dog Trainer', 'Dogs');
insert into Trainer2 values ('Certified Cat Behavior Consultant', 'Cats');
insert into Trainer2 values	('Certified Dog Behavior Consultant', 'Dogs');
insert into Trainer2 values	('PetSmart Dog Trainer Certification', 'Cats');
insert into Trainer2 values	('Feline Training Certification', 'Cats');

insert into Trainer3 values ('778-111-1111', 'Certified Professional Dog Trainer');
insert into Trainer3 values	('778-111-1112', 'Certified Cat Behavior Consultant');
insert into Trainer3 values	('778-111-1113', 'Certified Dog Behavior Consultant');
insert into Trainer3 values	('778-111-1114', 'PetSmart Dog Trainer Certification');
insert into Trainer3 values	('778-111-1115', 'Feline Training Certification');

insert into Shelter	values ('100 Fraser St', 20, '778-395-3495');
insert into Shelter	values ('54 Robson St', 34, '604-333-2322');
insert into Shelter	values ('74 Granville St', 50, '245-345-6432');
insert into Shelter	values ('76 Nanaimo St', 45, '246-345-2424');
insert into Shelter	values ('16 Main St', 80, '778-242-2422');
insert into Shelter	values ('999 All St', 999, '778-600-6789');

insert into POwner values('1234 Main St', 'John', '778-155-6186');
insert into POwner values('5678 Fraser St', 'Chris', '778-156-6289');
insert into POwner values('2198 Dunbar St', 'Sam', '778-769-1875');
insert into POwner values('1570 Cambie St', 'Mary', '604-178-1785');
insert into POwner values('3916 Knight St', 'Sarah', '604-333-9617');
insert into POwner values('2439 Marine Dr', 'Emma', '778-313-5577');
insert into POwner values('2350 Main St', 'Daniel', '604-991-1211');

insert into Veterinarian values ('111-111-1323', 'Callum', 'Certified Veterinarian Practitioner');
insert into Veterinarian values	('234-245-2311', 'Dean', 'Certified Veterinarian Practitioner');
insert into Veterinarian values	('604-323-1212', 'Ken', 'Certified Veterinarian Practitioner');
insert into Veterinarian values	('999-233-3232', 'Alison', 'Certified Veterinarian Practitioner');
insert into Veterinarian values	('456-234-1242', 'Hailey', 'Certified Veterinarian Practitioner');

insert into Supplier1 values ('13 Watford St', '604-253-6346');
insert into Supplier1 values ('164 Alma St', '778-354-5743');
insert into Supplier1 values ('99 Jump St', '604-888-8888');
insert into Supplier1 values ('1443 Commercial St', '778-231-1111');
insert into Supplier1 values ('1212 Orlando St', '236-777-7777');

insert into Supplier2 values ('Entertainment', 'Pet Toys');
insert into Supplier2 values ('Food', 'Pet Food');
insert into Supplier2 values ('Sanitation', 'Waste Management Product');
insert into Supplier2 values ('Grooming', 'Pet Grooming Products');
insert into Supplier2 values ('Healthcare', 'Pet Vitamins');

insert into Supplier3 values ('13 Watford St', 'Entertainment');
insert into Supplier3 values ('164 Alma St', 'Food');
insert into Supplier3 values ('99 Jump St', 'Sanitation');
insert into Supplier3 values ('1443 Commercial St', 'Grooming');
insert into Supplier3 values ('1212 Orlando St', 'Healthcare');

insert into Pet1 values (1, 'Chad');
insert into Pet1 values	(2, 'Snoopy');
insert into Pet1 values	(3, 'Fido');
insert into Pet1 values	(4, 'Stripes');
insert into Pet1 values	(5, 'Beerus');
insert into Pet1 values	(6, 'Buddy');
insert into Pet1 values	(7, 'Max');
insert into Pet1 values	(8, 'Charlie');
insert into Pet1 values	(9, 'Lucy'); 
insert into Pet1 values	(10, 'Betty');
insert into Pet1 values	(11, 'Tom');
insert into Pet1 values (12, 'Andy');
insert into Pet1 values (13, 'Sandy');

insert into Pet2 values ('Turtle', 3, 'Calcium');
insert into Pet2 values	('Dog', 5, 'Protein');
insert into Pet2 values	('Dog', 1, 'Fat');
insert into Pet2 values	('Cat', 7, 'Taurine');
insert into Pet2 values	('Cat', 10, 'Taurine');
insert into Pet2 values	('Dog', 8, 'Protein');
insert into Pet2 values	('Dog', 9, 'Fiber');
insert into Pet2 values	('Dog', 10, 'Fat');
insert into Pet2 values	('Cat', 11, 'Protein');
insert into Pet2 values	('Cat', 3, 'Calcium');
insert into Pet2 values	('Cat', 6, 'Fiber');
insert into Pet2 values	('Dog', 3, 'Protein');
insert into Pet2 values ('Cat', 2, 'Fiber');

insert into Pet3 values (1, 3); 
insert into Pet3 values	(2, 5); 
insert into Pet3 values	(3, 1);
insert into Pet3 values	(4, 7);
insert into Pet3 values	(5, 10);
insert into Pet3 values	(6, 8);
insert into Pet3 values	(7, 9);
insert into Pet3 values	(8, 10); 
insert into Pet3 values	(9, 11);
insert into Pet3 values	(10, 3);
insert into Pet3 values	(11, 6);
insert into Pet3 values (12, 7);
insert into Pet3 values (13, 3);

insert into Pet4 values (1, 'Healthy');
insert into Pet4 values	(2, 'Diabetes');
insert into Pet4 values	(3, 'Healthy');
insert into Pet4 values	(4, 'Vision Impairment');
insert into Pet4 values	(5, 'Arthritis');
insert into Pet4 values	(6, 'Healthy');
insert into Pet4 values	(7, 'Healthy');
insert into Pet4 values	(8, 'Healthy');
insert into Pet4 values	(9, 'Healthy');
insert into Pet4 values	(10, 'Healthy'); 
insert into Pet4 values	(11, 'Healthy');
insert into Pet4 values	(12, 'Allergies'); 
insert into Pet4 values	(13, 'Diabetes');

insert into Pet5 values (1, NULL);
insert into Pet5 values	(2, TO_DATE ('2023-03-28', 'YYYY-MM-DD')); 
insert into Pet5 values	(3, NULL); 
insert into Pet5 values (4, TO_DATE ('2020-09-14', 'YYYY-MM-DD')); 
insert into Pet5 values	(5, NULL);
insert into Pet5 values	(6, NULL); 
insert into Pet5 values	(7, NULL); 
insert into Pet5 values	(8, NULL); 
insert into Pet5 values	(9, NULL);
insert into Pet5 values (10, TO_DATE ('2024-10-01', 'YYYY-MM-DD')); 
insert into Pet5 values	(11, NULL);
insert into Pet5 values (12, NULL);
insert into Pet5 values (13, TO_DATE('2024-11-15', 'YYYY-MM-DD'));

insert into Pet6 values (1, TO_DATE ('2022-01-15', 'YYYY-MM-DD')); 
insert into Pet6 values	(2, TO_DATE ('2020-02-05', 'YYYY-MM-DD'));
insert into Pet6 values	(3, TO_DATE ('2023-11-14', 'YYYY-MM-DD')); 
insert into Pet6 values	(4, TO_DATE ('2019-05-18', 'YYYY-MM-DD')); 
insert into Pet6 values	(5, TO_DATE ('2024-07-21', 'YYYY-MM-DD'));
insert into Pet6 values	(6, TO_DATE ('2021-09-12', 'YYYY-MM-DD')); 
insert into Pet6 values	(7, TO_DATE ('2023-05-20', 'YYYY-MM-DD')); 
insert into Pet6 values	(8, TO_DATE ('2022-12-10', 'YYYY-MM-DD')); 
insert into Pet6 values	(9, TO_DATE ('2023-01-01', 'YYYY-MM-DD')); 
insert into Pet6 values	(10, TO_DATE ('2023-02-15', 'YYYY-MM-DD')); 
insert into Pet6 values	(11, TO_DATE ('2023-03-10', 'YYYY-MM-DD'));
insert into Pet6 values (12, TO_DATE('2022-06-06', 'YYYY-MM-DD'));
insert into Pet6 values (13, TO_DATE('2021-12-15', 'YYYY-MM-DD'));

insert into Pet7 values (1, 'Turtle');
insert into Pet7 values	(2, 'Dog');
insert into Pet7 values	(3, 'Dog');
insert into Pet7 values	(4, 'Cat');
insert into Pet7 values	(5, 'Cat');
insert into Pet7 values	(6, 'Dog'); 
insert into Pet7 values	(7, 'Dog'); 
insert into Pet7 values	(8, 'Dog'); 
insert into Pet7 values	(9, 'Cat');
insert into Pet7 values	(10, 'Cat');
insert into Pet7 values	(11, 'Cat');
insert into Pet7 values	(12, 'Cat');
insert into Pet7 values	(13, 'Dog');

insert into Pet8 values ('Turtle', 'Snapping Turtle', 40);
insert into Pet8 values	('Dog', 'Bulldog', 8);
insert into Pet8 values	('Dog', 'Husky', 12);
insert into Pet8 values	('Cat', 'Siamese', 15);
insert into Pet8 values	('Cat', 'Sphynx', 15);
insert into Pet8 values	('Dog', 'Beagle', 10);
insert into Pet8 values	('Dog', 'Poodle', 10);
insert into Pet8 values	('Dog', 'Golden Retriever', 12);
insert into Pet8 values	('Cat', 'Bengal', 10); 
insert into Pet8 values	('Cat', 'Tabby', 8);
insert into Pet8 values	('Cat', 'Persian', 10);

insert into Pet9 values (1, 'Snapping Turtle');
insert into Pet9 values	(2, 'Bulldog');
insert into Pet9 values	(3, 'Husky');
insert into Pet9 values	(4, 'Siamese');
insert into Pet9 values	(5, 'Sphynx');
insert into Pet9 values	(6, 'Beagle'); 
insert into Pet9 values	(7, 'Poodle');
insert into Pet9 values	(8, 'Golden Retriever'); 
insert into Pet9 values	(9, 'Bengal'); 
insert into Pet9 values	(10, 'Tabby'); 
insert into Pet9 values	(11, 'Persian');
insert into Pet9 values	(12, 'Persian');
insert into Pet9 values	(13, 'Bulldog');

insert into Pet10 values (1, NULL);
insert into Pet10 values (2, '1234 Main St');
insert into Pet10 values (3, NULL);
insert into Pet10 values (4, '5678 Fraser St');
insert into Pet10 values (5, NULL);
insert into Pet10 values (6, NULL);
insert into Pet10 values (7, NULL);
insert into Pet10 values (8, NULL);					
insert into Pet10 values (9, NULL);
insert into Pet10 values (10, '2198 Dunbar St');
insert into Pet10 values (11, NULL);
insert into Pet10 values (12, NULL);
insert into Pet10 values (13, '5678 Fraser St');

insert into Pet11 values ('Turtle', 'Calcium', 'Healthy', 'Regular Check-up');
insert into Pet11 values ('Dog', 'Protein', 'Diabetes', 'Daily Walks');
insert into Pet11 values ('Dog', 'Fat', 'Healthy', 'Exercise Once a Week');
insert into Pet11 values ('Cat', 'Taurine', 'Vision Impairment', 'Stay Indoors');
insert into Pet11 values ('Cat', 'Taurine', 'Arthritis', 'Let Roam');
insert into Pet11 values ('Dog', 'Protein', 'Healthy', 'Regular Check-up');
insert into Pet11 values ('Dog', 'Fiber', 'Healthy', 'Play Daily');
insert into Pet11 values ('Cat', 'Protein', 'Healthy', 'Groom Regularly');
insert into Pet11 values ('Cat', 'Calcium', 'Healthy', 'Feed Twice a Day');
insert into Pet11 values ('Cat', 'Fiber', 'Healthy', 'Brush Regularly');
insert into Pet11 values ('Cat', 'Taurine', 'Allergies', 'Special Diet');
insert into Pet11 values ('Dog', 'Protein', 'Allergies', 'Regular Check-up');

insert into Documentation values (1, '111-111-1323', 345, 'Vaccination Records', TO_DATE ('2004-01-04', 'YYYY-MM-DD'));
insert into Documentation values (2, '234-245-2311', 89, 'Allergies', TO_DATE ('2001-12-04', 'YYYY-MM-DD'));
insert into Documentation values (3, '604-323-1212', 982, 'Adoption History', TO_DATE ('2012-02-10', 'YYYY-MM-DD')); 
insert into Documentation values (4, '999-233-3232', 243, 'Allergies', TO_DATE ('2020-03-29', 'YYYY-MM-DD'));
insert into Documentation values (5, '456-234-1242', 789, 'Vaccination Records', TO_DATE ('2001-01-01', 'YYYY-MM-DD'));

insert into AdoptionApplication	values ('100 Fraser St', '1234 Main St', 801, TO_DATE ('2024-03-16', 'YYYY-MM-DD'), 'approved'); 
insert into AdoptionApplication	values ('54 Robson St', '5678 Fraser St', 450, TO_DATE ('2023-01-28', 'YYYY-MM-DD'), 'approved');
insert into AdoptionApplication	values ('74 Granville St', '2198 Dunbar St', 244, TO_DATE ('2012-12-12', 'YYYY-MM-DD'), 'rejected'); 
insert into AdoptionApplication	values ('76 Nanaimo St', '1570 Cambie St', 143, TO_DATE ('2022-05-12', 'YYYY-MM-DD'), 'approved'); 
insert into AdoptionApplication	values ('16 Main St', '3916 Knight St', 93, TO_DATE ('2020-07-28', 'YYYY-MM-DD'), 'rejected');

insert into Dog	values (2, 'Medium', 9);
insert into Dog	values (3, 'Long', 10);
insert into Dog	values (6, 'Short-Coated', 5); 
insert into Dog	values (7, 'Curly-Coated', 6);
insert into Dog	values (8, 'Fluffy', 8);

insert into Cat	values (4, 'Bristly', 20);
insert into Cat	values (5, 'Hairless', 18);
insert into Cat	values (9, 'Short-Haired', 10);
insert into Cat	values (10, 'Long-Haired', 12);
insert into Cat	values (11, 'Fluffy', 14);

insert into PurchasesFrom values ('164 Alma St', '54 Robson St');
insert into PurchasesFrom values ('164 Alma St', '16 Main St');
insert into PurchasesFrom values ('164 Alma St', '999 All St'); 
insert into PurchasesFrom values ('99 Jump St', '74 Granville St');
insert into PurchasesFrom values ('99 Jump St', '16 Main St');
insert into PurchasesFrom values ('99 Jump St', '999 All St'); 
insert into PurchasesFrom values ('1443 Commercial St', '76 Nanaimo St');
insert into PurchasesFrom values ('1443 Commercial St', '16 Main St'); 
insert into PurchasesFrom values ('1443 Commercial St', '999 All St'); 
insert into PurchasesFrom values ('1212 Orlando St', '16 Main St');
insert into PurchasesFrom values ('1212 Orlando St', '100 Fraser St');
insert into PurchasesFrom values ('1212 Orlando St', '999 All St');
insert into PurchasesFrom values ('13 Watford St', '100 Fraser St'); 
insert into PurchasesFrom values ('13 Watford St', '999 All St'); 
insert into PurchasesFrom values ('13 Watford St', '54 Robson St'); 
insert into PurchasesFrom values ('13 Watford St', '74 Granville St');
insert into PurchasesFrom values ('13 Watford St', '76 Nanaimo St'); 
insert into PurchasesFrom values ('13 Watford St', '16 Main St'); 
insert into PurchasesFrom values ('164 Alma St', '100 Fraser St'); 
insert into PurchasesFrom values ('164 Alma St', '74 Granville St');
insert into PurchasesFrom values ('164 Alma St', '76 Nanaimo St'); 

insert into Trains values ('778-111-1111', 1);
insert into Trains values ('778-111-1112', 2);
insert into Trains values ('778-111-1113', 3);
insert into Trains values ('778-111-1114', 4);
insert into Trains values ('778-111-1115', 5);

insert into Examines values ('111-111-1323', 1);
insert into Examines values	('234-245-2311', 1);
insert into Examines values	('234-245-2311', 2); 
insert into Examines values	('604-323-1212', 2);
insert into Examines values	('999-233-3232', 3); 
insert into Examines values	('456-234-1242', 4); 
insert into Examines values	('111-111-1323', 5);

insert into VetWorksWithShel values ('111-111-1323', '100 Fraser St');
insert into VetWorksWithShel values	('234-245-2311', '54 Robson St');
insert into VetWorksWithShel values	('604-323-1212', '74 Granville St');
insert into VetWorksWithShel values	('999-233-3232', '76 Nanaimo St');
insert into VetWorksWithShel values	('456-234-1242', '16 Main St'); 

insert into TrainWorksWithShel values ('778-111-1111', '100 Fraser St');
insert into TrainWorksWithShel values ('778-111-1112', '54 Robson St');
insert into TrainWorksWithShel values ('778-111-1113', '74 Granville St');
insert into TrainWorksWithShel values ('778-111-1114', '76 Nanaimo St');
insert into TrainWorksWithShel values ('778-111-1115', '16 Main St'); 

insert into Hosts values (1, '100 Fraser St'); 
insert into Hosts values (2, '54 Robson St');
insert into Hosts values (3, '74 Granville St'); 
insert into Hosts values (4, '76 Nanaimo St');
insert into Hosts values (5, '16 Main St');
insert into Hosts values (5, '100 Fraser St');

commit;
