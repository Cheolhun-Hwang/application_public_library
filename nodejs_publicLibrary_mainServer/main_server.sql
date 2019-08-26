create table temp_access_auth_table(
    taat_index       int(20)         NOT NULL AUTO_INCREMENT,
    taat_date		 datetime		 NOT NULL UNIQUE,
    taat_key		 varchar(32)	 NOT NULL,
    taat_ip		     varchar(20)	 NOT NULL,
    PRIMARY KEY (taat_index)
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

select * from temp_access_auth_table;

create table library_management_table(
    lmt_index        int(20)         NOT NULL AUTO_INCREMENT,
    lmt_key			 varchar(32)	 NOT NULL,
    lmt_date		 datetime	 	 NOT NULL,
    lmt_name		 varchar(25)	 NOT NULL,
    lmt_phone		 varchar(25)	 NOT NULL,
    lmt_rep		 	 varchar(10)	 NOT NULL,
    PRIMARY KEY (lmt_index)
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

create table library_book_table(
    lbt_index        int(20)         NOT NULL AUTO_INCREMENT,
    lbt_key			 varchar(32)	 NOT NULL,
    lbt_date		 datetime	 	 NOT NULL,
    lbt_title		 varchar(35)	 NOT NULL,
    lbt_publish		 varchar(20)	 NOT NULL,
    lbt_writter		 varchar(10)	 NOT NULL,
    lbt_part		 varchar(15)	 NOT NULL,
    lbt_year		 varchar(10)	 NOT NULL,
    PRIMARY KEY (lbt_index)
)ENGINE = InnoDB DEFAULT CHARSET=utf8;

select * from library_book_table;

create table user_table(
    ut_index        int(20)         NOT NULL AUTO_INCREMENT,
    ut_key			varchar(32)		NOT NULL,
    ut_date		 	datetime	 	NOT NULL,
    ut_name		 	varchar(15)	 	NOT NULL,
    ut_phone		varchar(25)	 	NOT NULL,
    PRIMARY KEY (lbt_index)
)ENGINE = InnoDB DEFAULT CHARSET=utf8;