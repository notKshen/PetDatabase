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
	foreign key (contact) references Trainer1,	
	foreign key (certification) references Trainer2
); 
grant select on Trainer3 to public;

create table Shelter (
	saddress	varchar (50)	primary key,
	capacity integer,
	contact	varchar (12),
	unique (contact)
);

create table POwner(
	oaddress	varchar	(50) primary key,
	oname	varchar (10),
	contact	varchar (12),
	unique (contact)
);

create table Veterinarian(
	contact	varchar	(12) primary key,
	vname	varchar (10),
	experience	varchar (50)
);

create table Supplier1 (
	saddress	varchar	(50) primary key,
	contact	varchar (12),
	unique (contact)
);

create table Supplier2 (
	industry	varchar	(30) primary key,
	supplyType	varchar (30)
);

create table Supplier3 (
	saddress	varchar	(50) primary key,
	industry	varchar(30),
	foreign key (saddress) references Supplier1,
	foreign key (industry) references Supplier2
);


create table Pet1 (
	pid 		integer	primary key,
	pname		varchar (12)
);

create table Pet2 (
	species			varchar (30),
	age				integer,
	dietaryRequirements		varchar (30),
	primary key (species, age)
);

create table Pet3 (
	pid	integer	primary key,
	age	integer,
	foreign key (pid) references Pet1
);

create table Pet4 (
	pid			integer	primary key,
	healthCondition	varchar (30),
	foreign key (pid) references Pet1
);

create table Pet5 (
	pid			integer	primary key,
	adoptionDate		date,
	foreign key (pid) references Pet1
);

create table Pet6 (
	pid			integer	primary key,
	arriveDate		date,
	foreign key (pid) references Pet1
);

create table Pet7 (
	pid			integer	primary key,
	species		varchar (30),
	foreign key (pid) references Pet1
);

create table Pet8 (
	species			varchar (30),
	breed				varchar (30),
	lifespan			integer,
	primary key (species, breed)
);

create table Pet9 (
	pid			integer	primary key,
	breed			varchar (30),
	foreign key (pid) references Pet1
);

create table Pet10 (
	pid			integer	primary key,
	ownerAddress		varchar (50),
	foreign key (pid) references Pet1,
	foreign key (ownerAddress) references POwner
);

create table Pet11 (
	species					varchar (30),
	dietaryRequirements		varchar (30),
	healthCondition			varchar (30),
	carePlan 				varchar(30),
	primary key (species, dietaryRequirements, healthCondition)
);



create table AdoptionApplication (
	shelterAddress	varchar	(50) NOT NULL,
	ownerAddress	varchar	(50) NOT NULL,
	id				integer	primary key,
	applicationDate	date,
	approvalStatus	varchar (10),
	foreign key (shelterAddress) references Shelter,
	foreign key (ownerAddress) references POwner
);

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

create table Dog (
	pid					integer,
	coatType			varchar (30),
	barkingFrequency	integer,
	primary key (pid),
	foreign key (pid) references Pet1
);

create table Cat (
	pid				integer,
	furType			varchar (30),
	clawLength		integer,
	primary key (pid),
	foreign key (pid) references Pet1
);

create table PurchasesFrom (
	supplierAddress	varchar (30), 
	shelterAddress	varchar (30),
	primary key (supplierAddress, shelterAddress),
	foreign key (supplierAddress) references Supplier1,
	foreign key (shelterAddress) references Shelter
);

create table Trains (
	trainerContact		varchar (12),
	pid					integer,
	primary key (trainerContact, pid),
	foreign key (TrainerContact) references Trainer1,
	foreign key (pid) references Pet1
);

create table Examines (
	veterinarianContact	varchar (12),
	pid					integer,
	primary key (veterinarianContact, pid),
	foreign key (veterinarianContact) references Veterinarian,
	foreign key (pid) references Pet1
);

create table VetWorksWithShel (
	veterinarianContact	varchar (12), 
	shelterAddress	varchar (50),
	primary key (veterinarianContact, shelterAddress),
	foreign key (veterinarianContact) references Veterinarian,
	foreign key (shelterAddress) references Shelter
);

create table TrainWorksWithShel (
	trainerContact		varchar (12), 
	shelterAddress		varchar (50),
	primary key (trainerContact, shelterAddress),
	foreign key (trainerContact) references Trainer1,
	foreign key (shelterAddress) references Shelter
);

create table Hosts (
	pid				integer,
	shelterAddress	varchar (50),
	primary key (pid, shelterAddress),
	foreign key (pid) references Pet1,
	foreign key (shelterAddress) references Shelter
);

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

insert into POwner values('1234 Main St', 'John', '778-155-6186');
insert into POwner values('5678 Fraser St', 'Chris', '778-156-6289');
insert into POwner values('2198 Dunbar St', 'Sam', '778-769-1875');
insert into POwner values('1570 Cambie St', 'Mary', '604-178-1785');
insert into POwner values('3916 Knight St', 'Sarah', '604-333-9617');

insert into Veterinarian values ('111-111-1323', 'Callum', 'Certified Veterinarian Practitioner');
insert into Veterinarian values	('234-245-2311', 'Dean', 'Certified Veterinarian Practitioner');
insert into Veterinarian values	('604-323-1212', 'Ken', 'Certified Veterinarian Practitioner');
insert into Veterinarian values	('999-233-3232', 'Alison', 'Certified Veterinarian Practitioner');
insert into Veterinarian values	('456-234-1242', 'Hailey', 'Certified Veterinarian Practitioner');

insert into Supplier1 values ('13 Watford St', '604-253-6346');
insert into Supplier1 values							 ('164 Alma St', '778-354-5743');
insert into Supplier1 values							 ('99 Jump St', '604-888-8888');
insert into Supplier1 values							 ('1443 Commercial St', '778-231-1111');
insert into Supplier1 values							 ('1212 Orlando St', '236-777-7777');

insert into Supplier2 values ('Entertainment', 'Pet Toys');
insert into Supplier2 values							 ('Food', 'Pet Food');
insert into Supplier2 values							 ('Sanitation', 'Waste Management Product');
insert into Supplier2 values							 ('Grooming', 'Pet Grooming Products');
insert into Supplier2 values							 ('Healthcare', 'Pet Vitamins');

insert into Supplier3 values ('13 Watford St', 'Entertainment');
insert into Supplier3 values							 ('164 Alma St', 'Food');
insert into Supplier3 values							 ('99 Jump St', 'Sanitation');
insert into Supplier3 values							 ('1443 Commercial St', 'Grooming');
insert into Supplier3 values							 ('1212 Orlando St', 'Healthcare');

insert into Pet1		values(1, 'Chad');
insert into Pet1		values				(2, 'Snoopy');
insert into Pet1		values				(3, 'Fido');
insert into Pet1		values				(4, 'Stripes');
insert into Pet1		values				(5, 'Beerus');
insert into Pet1		values				(6, 'Buddy');
insert into Pet1		values				(7, 'Max');
insert into Pet1		values				(8, 'Charlie');
insert into Pet1		values				(9, 'Lucy'); 
insert into Pet1		values				(10, 'Betty');
insert into Pet1		values				(11, 'Tom');

insert into Pet3		values(1, 3); 
insert into Pet3		values						(2, 5); 
insert into Pet3		values						(3, 1);
insert into Pet3		values						(4, 7);
insert into Pet3		values						(5, 10);
insert into Pet3		values						(6, 8);
insert into Pet3		values						(7, 9);
insert into Pet3		values						(8, 10); 
insert into Pet3		values						(9, 11);
insert into Pet3		values						(10,7);
insert into Pet3		values						(11, 6);

insert into Pet4		values((1, 'Healthy'),
						(2, 'Diabetes'),
						(3, 'Healthy'),
						(4, 'Vision Impairment'),
						(5, 'Arthritis'),
						(6, 'Healthy'),
						(7, 'Healthy'),
						(8, 'Healthy'),
						(9, 'Healthy'), 
						(10, 'Healthy'), 
						(11, 'Healthy');)

insert into Pet5		values((1, NULL), 
						(2, '2023-03-28'), 
						(3, NULL), 
						(4, '2020-09-14'), 
						(5, NULL),
						(6, NULL), 
						(7, NULL), 
						(8, NULL), 
						(9, NULL), 
						(10, '2024-10-01'), 
						(11, NULL);) 

insert into Pet6		values((1, '2022-01-15'), 
						(2, '2020-02-05'),
						(3, '2023-11-14'), 
						(4, '2019-05-18'), 
						(5, '2024-07-21'),
						(6, '2021-09-12'), 
						(7, '2023-05-20'), 
						(8, '2022-12-10'), 
						(9, '2023-01-01'), 
						(10, '2023-02-15'), 
						(11, '2023-03-10');) 

insert into Pet7		values((1, 'Turtle'),
						(2, 'Dog'),
						(3, 'Dog'),
						(4, 'Cat'),
						(5, 'Cat'),
						(6, 'Dog'), 
						(7, 'Dog'), 
						(8, 'Dog'), 
						(9, 'Cat'), 
						(10, 'Cat'),
						(11, 'Cat');)

insert into Pet9		values((1, 'Snapping Turtle'),
						(2, 'Bulldog'),
						(3, 'Husky'),
						(4, 'Siamese'),
						(5, 'Sphynx'),
						(6, 'Beagle'), 
						(7, 'Poodle'), 
						(8, 'Golden Retriever'), 
						(9, 'Bengal'), 
						(10, 'Tabby'), 
						(11, 'Persian');)

insert into Pet10		values((1, NULL),
						(2, '1234 Main St'),
						(3, NULL),
						(4, '5678 Fraser St'),
						(5, NULL),
						(6, NULL),
						(7, NULL),
						(8, NULL),					
						(9, NULL),
						(10, '2198 Dunbar St'),
						(11, NULL);)

insert into Pet2		values(('Turtle', 3, 'Calcium'),
						('Dog', 5, 'Protein'),
						('Dog', 1, 'Fat'),
						('Cat', 7, 'Taurine'),
						('Cat', 10, 'Taurine'),
						('Dog', 6, 'Fat'),
						('Dog', 7, 'Protein'),
						('Dog', 8, 'Fiber'), 
						('Cat', 9, 'Fat'),
						('Cat', 10,'Protein'),
						('Cat', 11, 'Calcium');)

insert into Pet8		values(('Turtle', 'Snapping Turtle', 40),
						('Dog', 'Bulldog', 8),
						('Dog', 'Husky', 12),
						('Cat', 'Siamese', 15),
						('Cat', 'Sphynx', 15),
						('Dog', 'Beagle', 10),
						('Dog', 'Poodle', 5), 
						('Dog', 'Golden Retriever', 12),
						('Cat', 'Bengal', 10), 
						('Cat', 'Tabby', 8),
						('Cat', 'Persian', 10);)

insert into Pet11		values(('Snapping Turtle', 'Calcium', 'Healthy', 'Regular Check-up'),
						('Bulldog', 'Protein', 'Diabetes', 'Daily Walks'),
						('Husky', 'Fat', 'Healthy', 'Exercise Once a Week'),
						('Siamese', 'Taurine', 'Vision Impairment', 'Stay Indoors'),
						('Sphynx', 'Taurine', 'Arthritis', 'Let Roam'),
						('Beagle', 'Fat', 'Healthy', 'Daily Walks'), 
						('Poodle', 'Protein', 'Healthy', 'Regular Check-up'),
						('Golden Retriever', 'Fiber', 'Healthy', 'Play Daily'),
						('Bengal', 'Fat', 'Healthy', 'Groom Regularly'),
						('Tabby', 'Protein', 'Healthy', 'Feed Twice a Day'),
						('Persian', 'Calcium', 'Healthy', 'Brush Regularly');) 

insert into Documentation	values((1, '111-111-1323', 345, 'Vaccination Records', '2004-01-04'), 
							(2, '234-245-2311', 89, 'Allergies', '2001-12-04'), 
							(3, '604-323-1212', 982, 'Adoption History', '2012-02-10'), 
							(4, '999-233-3232', 243, 'Allergies', '2020-03-29'), 
							(5, '456-234-1242', 789, 'Vaccination Records', '2001-01-01');)

insert into AdoptionApplication	values(('100 Fraser St', '1234 Main St', 801, '2024-03-16', 'approved'), 
								('54 Robson St', '5678 Fraser St', 450, '2023-01-28', 'approved'), 
								('74 Granville St', '2198 Dunbar St', 244, '2012-12-12', 'rejected'), 
								('76 Nanaimo St', '1570 Cambie St', 143, '2022-05-12', 'approved'), 
								('16 Main St', '3916 Knight St', 93, '2020-07-28', 'rejected');)

insert into Dog		values((2, 'Medium', 9),
					(3, 'Long', 10),
					(6, 'Short-Coated', 5), 
					(7, 'Curly-Coated', 6),
					(8, 'Fluffy', 8);)

insert into Cat		values((4, 'Bristly', 20),
					(5, 'Hairless', 18),
					(9, 'Short-Haired', 10), 
					(10, 'Long-Haired', 12), 
					(11, 'Fluffy', 14);)

insert into PurchasesFrom		values (('13 Watford St', '100 Fraser St'), 
								('164 Alma St', '54 Robson St'), 
								('99 Jump St', '74 Granville St'),
								('1443 Commercial St', '76 Nanaimo St'), 
								('1212 Orlando St', '16 Main St'),
								('1212 Orlando St', '100 Fraser St');)

insert into Trains		values(('778-111-1111', 1),
						('778-111-1112', 2),
						('778-111-1113', 3),
						('778-111-1114', 4),
						('778-111-1115', 5);)

insert into Examines		values (('111-111-1323', 1),
							('234-245-2311', 1),
							('234-245-2311', 2), 
							('604-323-1212', 2),
							('999-233-3232', 3), 
							('456-234-1242', 4), 
							('111-111-1323', 5);)

insert into VetWorksWithShel 	values(('111-111-1323', '100 Fraser St'),
								('234-245-2311', '54 Robson St'),
								('604-323-1212', '74 Granville St'),
								('999-233-3232', '76 Nanaimo St'),
								('456-234-1242', '16 Main St');)


insert into TrainWorksWithShel 		values(('778-111-1111', '100 Fraser St'),
									('778-111-1112', '54 Robson St'),
									('778-111-1113', '74 Granville St'),
									('778-111-1114', '76 Nanaimo St'),
									('778-111-1115', '16 Main St');)

insert into Hosts	values ((1, '100 Fraser St'), 
					(2, '54 Robson St'), 
					(3, '74 Granville St'), 
					(4, '76 Nanaimo St'),
					(5, '16 Main St'),
					(5, '100 Fraser St');)

commit;
