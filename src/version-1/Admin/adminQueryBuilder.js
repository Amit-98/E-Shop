import _dbhelper from "../../db/db-runner.js";

export default {
    getStoreDetails : (reqJson, callback) => {
        let { u_id } = reqJson.query;
        u_id = parseInt(u_id);
        const _query = `SELECT * FROM admin_access_rights WHERE u_id = ${u_id} AND status = 1`;
        _dbhelper.SelectqueryS(_query, callback);
    },

    storeApprove : (reqJson, callback) => {
        let { u_id, store_id, approve} = reqJson.query;
        u_id = parseInt(u_id);
        store_id = parseInt(store_id);
        approve = parseInt(approve);
        let _query =  `UPDATE admin_access_rights SET `;
        if(reqJson)
        {
            let r = approve === 1 ? store_id : 0
            _query += `store_`+store_id+` = `+ r;
        }

        _query += ` WHERE u_id = ${u_id}`
        //const _query1 = `SELECT * FROM user_details WHERE id = 1`;
        _dbhelper.Updatequery(_query, callback);
    },
}