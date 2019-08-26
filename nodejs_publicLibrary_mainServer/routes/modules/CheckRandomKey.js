const db = require('./DBConnector');


module.exports.checkIpAndKey = function(ip, key){
    var sQuery = "SELECT * FROM temp_access_auth_table WHERE taat_key=? AND taat_ip=?";
    var sParam = [key, ip]
    db.query(sQuery, sParam, (error, list, col)=>{
        if(error){
            console.log("connection error");
            return false;
        }

        if(list.length < 1){
            console.log("none exist");
            return false;
        }
        var delQuery = "DELETE FROM temp_access_auth_table WHERE taat_key=? AND taat_ip=?;"
        db.query(delQuery, sParam, (err, col)=>{
            if(error){
                console.log("connection error(2)");
                return false;
            }
            return true
        });
    });
};