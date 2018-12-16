create table nodejs.users(
	id int not null auto_increment,
    name varchar(20) not null,
    age int unsigned not null,
    married tinyint not null,
    comment text null,
    create_at datetime not null default now(),
    primary key(id),
    unique index name_UNIQUE (name ASC))
    COMMENT = '사용자 정보'
    default charset=utf8
    engine=InnoDB;
    
    alter table users change create_at created_at datetime;
    
    
    
    desc users;
    
    
    create table nodejs.comments(
		id int not null auto_increment,
        commenter int not null,
        comment varchar(100) not null,
        created_at datetime not null default now(),
        primary key(id),
        index commenter_idx (commenter asc),
        constraint commenter
        foreign key (commenter)
        references nodejs.users (id)
        on delete cascade
        on update cascade)
        comment = '댓글'
        default charset = utf8
        engine=InnoDB;
        
        
        
        
        select * from user;
        
        

use mysql;

alter user 'root'@'localhost' identified with mysql_native_password by '!Kcube123';