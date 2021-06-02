
insert into cards(`description`, dueDate, `order`, listId, createdAt, updatedAt)
values("teste6", current_timestamp(), 6, 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

insert into cards(`description`, dueDate, `order`, listId, createdAt, updatedAt)
values("teste7", current_timestamp(), 7, 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

insert into cards(`description`, dueDate, `order`, listId, createdAt, updatedAt)
values("teste8", current_timestamp(), 8, 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

insert into cards(`description`, dueDate, `order`, listId, createdAt, updatedAt)
values("teste9", current_timestamp(), 9, 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());


insert into productbacklogs(`description`, priority, groupId, createdAt, updatedAt)
values("vapova awrasasrwarwarawpo", "urgente", 1, current_timestamp(), current_timestamp());

	insert into sprints(timeBox, createdAt, updatedAt)
	values(current_timestamp(), current_timestamp(), current_timestamp());
    
insert into studentGroup(studentId, groupId, createdAt, updatedAt)
values(2, 1, current_timestamp(), current_timestamp());




SELECT * FROM db_task_manager_project.productbacklogs;

SELECT * FROM db_task_manager_project.sprints;











SELECT * FROM db_task_manager_project.dailyscrums;
select * from cards order by `order` asc

update cards set `order` = 4
where id = 153;

update cards set `order` =  `order` - 1
where `order` between 3 and 4;





UPDATE cards
SET `order` =
    CASE order
    WHEN 2 THEN 3
    WHEN 3 THEN 2
    END
WHERE position IN (2, 3)


