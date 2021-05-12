

insert into cards(`description`, dueDate, `order`, listId, createdAt, updatedAt)
values("teste2", current_timestamp(), 2, 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

insert into cards(`description`, dueDate, `order`, listId, createdAt, updatedAt)
values("teste3", current_timestamp(), 3, 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

insert into cards(`description`, dueDate, `order`, listId, createdAt, updatedAt)
values("teste4", current_timestamp(), 4, 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

insert into cards(`description`, dueDate, `order`, listId, createdAt, updatedAt)
values("teste5", current_timestamp(), 5, 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());


select * from cards;

update cards set `order` = 4
where id = 145 ;

update cards set `order` =  `order` - 1
where `order` between 3 and 4;





UPDATE cards
SET `order` =
    CASE order
    WHEN 2 THEN 3
    WHEN 3 THEN 2
    END
WHERE position IN (2, 3)


