create table users (
    email varchar(255) primary key,
    password varchar(255) not null,
    nickname varchar(255) not null
)

create table messages (
    id int primary key auto_increment,
    text varchar(255) not null,
    users_email varchar(255),
    foreign key (users_email) references users(email)
)