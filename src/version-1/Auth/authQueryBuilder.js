import _dbhelper from "../../db/db-runner.js";
import common from "../../common/methods/commonMethods.js";
export default 
{
    authMiddleware : (reqJson, callback) => {
        const { APIKEY, TOKEN } = reqJson.headers;
        const _query = `SELECT user_master.* FROM user_auth INNER JOIN user_master ON user_master.USER_ID = user_auth.USER_ID
        WHERE user_auth.APIKEY = '${APIKEY}' and user_auth.TOKEN = '${TOKEN}' AND STATUS = 1`;
        _dbhelper.SelectqueryS(_query, callback);
    },

    authLogin : (reqJson, callback) => {
        const { email, password } = reqJson.query;
        let check_pass = common.check_password();
        const _query = ``;
        _dbhelper.InsertQuery(_query, callback);
    },

    authCheckEmail : (reqJson, callback) => {
        const { EMAIL } = reqJson.body;
        const _query = `SELECT * FROM user_master WHERE EMAIL = '${EMAIL}' AND STATUS = 1`;
        _dbhelper.SelectqueryS(_query, callback);
    },

    authSignup : (reqJson, callback) => {
        const {USERNAME, EMAIL, PASSWORD, ROLE} = reqJson.body;
        let pass = common.generate_password(PASSWORD);
        console.log("PASS:", pass);
        const _query = `INSERT INTO user_master(USERNAME,EMAIL,PASSWORD,STATUS)VALUES('${USERNAME}', '${EMAIL}', '${pass}',1)`;
        _dbhelper.InsertQuery(_query, callback);
    },

    authSignupToken : (reqJson, callback) => {
        const apikey = common.random_string();
        const token = common.random_string();
        const _query = `INSERT INTO user_auth(USER_ID,APIKEY,TOKEN)VALUES(${reqJson.body.user_id},'${apikey}','${token}')`;
        const _query1 = `INSERT INTO user_role(USER_ID,ROLE,STATUS)VALUES(${reqJson.body.user_id},${reqJson.body.role},1)`;
        _dbhelper.InsertQuery(_query, callback);
    },

    authRole : (reqJson, callback) =>{
        const _query = `INSERT INTO user_role(USER_ID,ROLE,STATUS)VALUES(${reqJson.body.user_id},${reqJson.body.ROLE},1)`;
        _dbhelper.InsertQuery(_query, callback);
    },

    authSuccess : (reqJson, callback) => {
        const _query = `SELECT user_master.*,user_role.ROLE,user_auth.APIKEY,user_auth.TOKEN FROM user_master 
        INNER JOIN user_auth 
        ON user_master.USER_ID = user_auth.USER_ID 
        INNER JOIN user_role
        ON user_master.USER_ID = user_role.USER_ID
        WHERE user_master.USER_ID = ${reqJson.body.user_id}`;
        _dbhelper.SelectqueryS(_query, callback);
    },

    admin_access_save : (reqJson, callback) => {
        if(reqJson.body.user_id!=1)
        {
            const _query = `INSERT INTO admin_access_rights(u_id,is_admin_approval,status)VALUES(${reqJson.body.user_id},0,1)`;
            _dbhelper.InsertQuery(_query, callback);
        }
        else
        {
            const _query = `INSERT INTO admin_access_rights(u_id,is_admin_approval,store_1,store_2,store_3,store_4,store_5,status)VALUES(${reqJson.body.user_id},1,1,2,3,4,5,1)`;
            _dbhelper.InsertQuery(_query, callback);
        }
    }
};