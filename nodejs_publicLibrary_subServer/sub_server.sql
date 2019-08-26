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
    lmt_phone		 varchar(15)	 NOT NULL,
    lmt_rep		 	 varchar(10)	 NOT NULL,
    PRIMARY KEY (lmt_index)
)ENGINE = InnoDB DEFAULT CHARSET=utf8;