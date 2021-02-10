/*
 * @Author: AA
 * @LastEditors: AA
 * @FilePath: /server/lib/db.js
 */
var createConnection = require("mysql");
var _config = require("../config");
var utils = require("./utils");

/**
 * @description: Mysql database instance, encapsulates common operation methods
 */
class Mysql {
  /**
   * @description: Constructor
   * @param {Array} config Database connection configuration
   */
  constructor(config) {
    this.config = {
      host: _config.host,
      port: _config.port,
      user: _config.user,
      password: _config.password,
      database: _config.database,
      ...config,
    };
    this.sql = "";
    this._resetParams();
  }
  /**
   * @description: Execute mysql statement directly
   * @param {String} sql
   */
  query(sql) {
    this._resetParams();
    const connection = this._getConnection();
    return new Promise((resolve, reject) => {
      connection.query(sql, (err, rows) => {
        this._close(connection);
        if (err) {
          console.error("MYSQL_EXECUTED_ERROR", err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  /**
   * @description: Set table name
   * @param {String} tableName
   * @return {Object} Mysql Object
   */
  table(tableName) {
    if (!tableName) {
      throw new Error("unknown tableName!");
    }
    if (typeOf(tableName) !== "string") {
      console.warn('function table params must be type of "string"');
      return this;
    }
    this._tableName = config.tablePre + tableName;
    return this;
  }

  /**
   * @description: Set table alias name
   * @param {String} tableAlias
   * @return {Object} Mysql Object
   */
  alias(tableAlias) {
    if (typeOf(tableAlias) !== "string") {
      console.warn('function table params must be type of "string"');
      return this;
    }
    this._tableAlias = config.tablePre + tableAlias;
    return this;
  }


  /**
   * @description: Set the field to be selected, string or array format
   * @param {string|Array} fields
   * @example
   * // SELECT `users`.`id`, `users`.`name` FROM `users` limit 1
   * mysql.table('users').field('id, name').find();
   * // SELECT `users`.`id`, `users`.`name` as a, `users`.`status` as b FROM `users` limit 1
   * mysql.table('users').field(['id', 'name as a', { status: 'b' }]).find();
   * @return {Object} Mysql Object
   */
  field(fields) {
    const type = typeOf(fields);
    if (type === "string") {
      fields = fields.split(",");
    } else if (type === "array") {
    } else {
      console.warn('function field params must be type of "string" or "array"');
      fields = ["*"];
    }
    const res = [];
    fields.forEach((item) => {
      if (typeOf(item) === "object") {
        res.push(item);
      } else if (typeOf(item) === "string") {
        item = item.trim();
        item && res.push(item);
      }
    });
    this._fields = res;
    return this;
  }

  /**
   * @description: group by
   * @param {Array|string} columns Grouping column names, which can be arrays or strings, and strings are separated by commas
   * @return {Object} Mysql Object
   */
  group(columns) {
    const type = typeOf(columns);
    if (type !== "string" && type !== "array") {
      console.warn('function group params must be type of "string" or "array"');
      return this;
    }
    if (type === "array") {
      columns = columns.join(", ");
    }
    this._group = columns;
    return this;
  }

  /**
   * @description: Where condition setting, accept string or object form, can be called multiple times, each call as a whole, multiple calls use AND connection
   * @param {object|string} where
   * @example
   * // SELECT `users`.`*` FROM `users` WHERE (`users`.`status` = 'on') limit 1
   * mysql.table('users').where({ status: 'on' }).find();
   *
   * // SELECT `users`.`*` FROM `users` WHERE (id = 10 OR id < 2) limit 1
   * mysql.table('users').where('id = 10 OR id < 2').find();
   *
   * // SELECT `users`.`*` FROM `users` WHERE (`users`.`id` != 1) limit 1
   * mysql.table('users').where({id: ['!=', 1]}).find();
   *
   * // NULL
   *
   * SELECT `users`.`*` FROM `users` WHERE (`users`.`id` IS NULL) limit 1
   * mysql.table('users').where({id: null}).find();
   *
   * // SELECT `users`.`*` FROM `users` WHERE (`users`.`id` IS NOT NULL) limit 1
   * mysql.table('users').where({id: [ '!=', null ]}).find();
   *
   * // LIKE 
   *
   * // SELECT `users`.`*` FROM `users` WHERE (`users`.`name` LIKE '%admin%') limit 1
   * mysql.table('users').where({name: [ 'like', '%admin%' ]}).find();
   *
   * // SELECT `users`.`*` FROM `users` WHERE (`users`.`name` NOT LIKE '%admin%') limit 1
   * mysql.table('users').where({name: [ 'notlike', '%admin%' ]}).find();
   *
   * // SELECT `users`.`*` FROM `users` WHERE (`users`.`name` LIKE '%admin%' OR `users`.`email` LIKE '%admin%') limit 1
   * mysql.table('users').where({'name|email': [ 'like', '%admin%' ]}).find();
   *
   * // SELECT `users`.`*` FROM `users` WHERE (`users`.`name` LIKE '%admin%' AND `users`.`email` LIKE '%admin%') limit 1
   * mysql.table('users').where({'name&email': [ 'like', '%admin%' ]}).find();
   *
   * // One to multiple fields
   * // SELECT `users`.`*` FROM `users` WHERE (`users`.`name` = 'admin' OR `users`.`name` = 'editor') limit 1
   * mysql.table('users').where({name: [ '=', [ 'admin', 'editor' ] ]}).find();
   *
   * // IN 
   * // SELECT `users`.`*` FROM `users` WHERE (`users`.`id` IN (5,10)) limit 1
   * mysql.table('users').where({'id': [ 'in', [5, 10] ]}).find();
   *
   * // SELECT `users`.`*` FROM `users` WHERE (`users`.`id` IN (5, 10)) limit 1
   * mysql.table('users').where({'id': [ 'in', '5, 10' ]}).find();
   *
   * // SELECT `users`.`*` FROM `users` WHERE (`users`.`id` NOT IN (5,10)) limit 1
   * mysql.table('users').where({'id': [ 'notin', [5, 10] ]}).find();
   *
   * // BETWEEN 
   * // SELECT `users`.`*` FROM `users` WHERE (`users`.`id` BETWEEN 5 AND 10) limit 1
   * mysql.table('users').where({'id': [ 'between', [5, 10] ]}).find();
   *
   * // SELECT `users`.`*` FROM `users` WHERE (`users`.`id` BETWEEN 5 AND 10 AND `users`.`name` = 'admin') limit 1
   * mysql.table('users').where({'id': [ 'between', [5, 10] ], 'name': 'admin'}).find();
   *
   * // SELECT `users`.`*` FROM `users` WHERE (`users`.`id` BETWEEN 5 AND 10 OR `users`.`name` = 'admin') limit 1
   * mysql.table('users').where({'id': [ 'between', [5, 10] ], 'name': 'admin', '_logic': 'OR'}).find();
   *
   * // Multiple fields
   * // SELECT `users`.`*` FROM `users` WHERE (`users`.`status` = 'on') AND (`users`.`id` >= 1 AND `users`.`id` <= 10) limit 1
   * mysql.table('users').where({'status': 'on'}).where({'id': {'>=': 1, '<=': 10}}).find();
   *
   * // SELECT `users`.`*` FROM `users` WHERE (`users`.`status` = 'on') AND (`users`.`id` >= 1 OR `users`.`id` <= 10) limit 1
   * mysql.table('users').where({'status': 'on'}).where({'id': {'>=': 1, '<=': 10, '_logic': 'OR'}}).find();
   * @return {Object} Mysql Object
   */
  where(where) {
    const type = typeOf(where);
    if (type !== "string" && type !== "object") {
      console.warn(
        'function where params must be type of "object" or "string"'
      );
      return this;
    }
    if (type === "object") {
      this._where._condition.push(where);
    } else {
      this._where._sql.push(where);
    }
    return this;
  }

  /**
   * @description: Set the limit on the number of results
   * @param {number} limit Limit on the number of results
   * @return {Object} Mysql Object
   */
  limit(limit) {
    const type = typeOf(limit);
    if (type !== "number") {
      console.warn('function limit params must be type of "number"');
      limit = parseInt(limit);
      if (isNaN(limit)) {
        return this;
      }
    }
    this._limit = limit;
    return this;
  }

  /**
   * @description: Paging operation
   * @param {Number} page
   * @param {Number} pageSize
   * @return {Object} Mysql Object
   */
  page(page = 1, pageSize = 1) {
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    page = isNaN(page) ? 1 : page;
    pageSize = isNaN(pageSize) ? 1 : pageSize;
    const offset = (page - 1) * pageSize;
    this._limit = (offset < 0 ? 0 : offset) + ", " + pageSize;
    return this;
  }

  /**
   * @description: Set data
   * @param {*} data
   * @return {Object} Mysql Object
   */
  data(data) {
    if (typeOf(data) !== "object") {
      console.warn('function {data} params must be type of "object"');
      return this;
    }
    this._data = data;
    return this;
  }

  /**
   * @description: Sort
   * @param {array|string} order
   * @return {Object} Mysql Object
   */
  order(order) {
    const type = typeOf(order);
    if (type !== "array" && type !== "string") {
      console.warn(
        'function {order} params must be type of "array" or "string"'
      );
      return this;
    }
    if (type === "array") {
      order = order.join(", ");
    }
    this._order = order;
    return this;
  }

  /**
   * @description: Set join conditions, join multiple times
   * @param {Object} join join condition
   * @example
   * // SELECT `a`.`*`, `b`.`*` FROM `article_posts` as a LEFT JOIN `article_categorys` AS b ON (a.`category_id`=b.`id`) limit 1
   * mysql.table('article_posts').alias('a').field([ 'a.*', 'b.*' ]).join({
   *  article_categorys: {
   *    as: 'b',
   *    on: { category_id: 'id' }
   *  }
   * }).find();
   *
   * // SELECT `a`.`*`, `article_categorys`.`*` FROM `article_posts` as a LEFT JOIN `article_categorys` ON (a.`category_id`=article_categorys.`id`) limit 1
   * mysql.table('article_posts').alias('a').field([ 'a.*', 'article_categorys.*' ]).join({
   *  article_categorys: {
   *    // as: 'b',
   *    on: { category_id: 'id' }
   *  }
   * }).find();
   *  @return {Object} Mysql Object
   */
  join(join) {
    const type = typeOf(join);
    if (type !== "object") {
      console.warn('function {join} params must be type of "object"');
      return this;
    }
    this._join = {
      ...this._join,
      ...join,
    };
    return this;
  }

  /**
   * @description:  Find a piece of data
   * @param {object|string} where condition
   * @return {Promise<any>} Query result
   */
  async find(where = null) {
    where && this.where(where);
    this._limit = 1;
    const data = await this.select();
    return data && data[0];
  }

  /**
   * @description: Find data
   * @param {*} where where condition
   * @return {Promise<any>} Query result
   */
  select(where = null) {
    if (!this._tableName) {
      throw new Error("unknown table name!");
    }

    where && this.where(where);

    let sql = "SELECT";

    sql += this._formatFields();
    sql += " FROM `" + this._tableName + "`";
    sql += this._tableAlias ? ` as ${this._tableAlias}` : "";

    sql += this._formatJoin();
    sql += this._formatWhere();

    sql += this._group
      ? " GROUP BY " + this._formatFieldsName(this._group)
      : "";
    sql += this._order ? " ORDER BY " + this._order : "";

    sql += this._limit ? " limit " + this._limit : "";

    this.sql = sql;
    return this.query(sql);
  }

  
  /**
   * @description:
   * @param {object} column {name: value} Updated fields and values
   * @param  {object|string} where where condition, see [where] method
   * @return {Promise<any>} Update result
   */
  update(column, where = null) {
    if (!this._tableName) {
      throw new Error("unknown table name!");
    }
    where && this.where(where);
    let sql = "UPDATE ";
    sql += this._tableName;
    sql += this._tableAlias ? ` as ${this._tableAlias} SET ` : " SET ";

    const tmpArr = [];
    for (const i in column) {
      let tmp = "";
      const match = (column[i] + "").match(/^(\+|\-)([^+-]+)$/);
      if (match) {
        tmp =
          this._formatFieldsName(i) +
          " = " +
          this._formatFieldsName(i) +
          match[1] +
          match[2];
      } else {
        tmp = this._formatFieldsName(i) + " = '" + column[i] + "'";
      }
      tmpArr.push(tmp);
    }
    sql += tmpArr.join(",");
    sql += this._formatWhere();
    this.sql = sql;
    return this.query(sql);
  }

  /**
   * @description: Add data
   * @param {object} column
   * @param {object} duplicate Update if there is a duplicate, {id: 100, name: VALUES('test')}
   * @retur {Promise<any>}
   */
  add(column, duplicate = false) {
    if (!this._tableName) {
      throw new Error("unknown table name!");
    }
    let sql = "INSERT INTO " + this._tableName;
    const keyArr = [];
    const valueArr = [];
    for (const i in column) {
      keyArr.push("`" + i + "`");
      valueArr.push("'" + column[i] + "'");
    }
    sql += " (" + keyArr.join(",") + ")";
    sql += " VALUES (" + valueArr.join(",") + ")";

    if (duplicate) {
      sql += " ON DUPLICATE KEY UPDATE ";
      const tmpArr = [];
      for (let key in duplicate) {
        const value = duplicate[key];
        if (/VALUES\(/gi.test(value)) {
          tmpArr.push("`" + key + "`=" + value);
        } else {
          tmpArr.push("`" + key + "`='" + value + "'");
        }
      }
      sql += tmpArr.join(",");
    }
    this.sql = sql;
    return this.query(sql);
  }

  /**
   * @description: Delete operation, completely delete a piece of data, generally it is not recommended to delete data, it can be controlled by field switch
   * @param {object|string} where where condition, see [where] method
   * @return {Promise<any>
   */
  delete(where) {
    if (!this._tableName) {
      throw new Error("unknown table name!");
    }
    where && this.where(where);
    let sql = "DELETE FROM " + this._tableName;
    sql += this._formatWhere();
    this.sql = sql;
    return this.query(sql);
  }

  /**
   * @description: Get data connection
   * @private
   * @return {Mysql.connection}
   */
  _getConnection() {
    const connection = createConnection(this.config);

    connection.connect((err) => {
      if (err) {
        console.error("MYSQL_CONNECT_ERROR：", err);
      }
    });
    connection.on("error", (err) => {
      console.error("MYSQL_RUNTIME_ERROR：", err);
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.info("MYSQL_RECONNECTING...");
      } else {
        throw err;
      }
    });
    return connection;
  }

  /**
   * @description: Close database connection
   * @private
   * @param {connection} connection mysql connection object
   */
  _close(connection) {
    connection.end();
  }

  /**
   * @description: Reset query conditions, must be reset after each query
   * @private
   */
  _resetParams() {
    this._tableName = "";
    this._tableAlias = "";
    this._fields = ["*"];
    this._where = {
      _sql: [],
      _condition: [],
    };
    this._limit = "";
    this._order = "";
    this._join = {};
    this._data = {};
    this._group = "";
  }


  /**
   * @description: Need to select the field name processing
   * @private
   * @return {string} Need to select the field splicing result
   */
  _formatFields() {
    if (!this._fields.length) {
      return "*";
    }

    let res = " ";

    this._fields.forEach((item, index) => {
      res += index > 0 ? ", " : "";
      if (typeOf(item) === "object") {
        for (const i in item) {
          res += this._formatFieldsName(i) + " as " + item[i];
        }
      } else if (item.includes(" as ")) {
        const tmp = item.split(" as ");
        res += this._formatFieldsName(tmp[0]) + " as " + tmp[1];
      } else {
        res += this._formatFieldsName(item);
      }
    });
    return res;
  }

  /**
   * @description: Field name processing, add ``, to prevent errors
   * @private
   * @param {string} field Field name
   * @return {string} Field name processing result
   */
  _formatFieldsName(field) {
    let table = this._tableAlias || this._tableName;
    let res = "";
    let fieldName = "";

    const tmp = field.split(".");
    if (tmp.length < 2) {
      fieldName = tmp[0];
    } else {
      table = tmp[0];
      fieldName = tmp[1];
    }

    const match = /^\s*([a-zA-Z]+)\s*\(\s*([\w]+)\s*\)\s*$/g.exec(fieldName);
    if (match) {
      const funcName = match[1];
      const name = match[2];
      res =
        funcName +
        "(`" +
        table +
        "`." +
        (name === "*" ? name : "`" + name + "`") +
        ")";
    } else {
      res =
        "`" +
        table +
        "`." +
        (fieldName === "*" ? fieldName : "`" + fieldName + "`");
    }
    return res;
  }

  /**
   * @description: Join operation processing, transformed into join statement
   *@private
   * @return {string} The splicing result of the join operation
   */

  _formatJoin() {
    if (!this._join || isEmptyObject(this._join)) {
      return "";
    }

    const join = this._join;
    let joinStr = "";
    const mainTable = this._tableAlias || this._tableName;

    for (const i in join) {
      const item = join[i];
      const joinType = item.join ? item.join.toLocaleUpperCase() : "LEFT";
      joinStr += " " + joinType + " JOIN `" + i + "`";
      joinStr += item.as ? " AS " + item.as : "";
      joinStr += " ON (";

      const tmpArr = [];
      const subTable = item.as ? item.as : i;
      for (const ti in item.on) {
        if (typeOf(item.on) === "string") {
          tmpArr.push(item.on);
        } else {
          tmpArr.push(
            "`" +
              mainTable +
              "`.`" +
              ti +
              "`=`" +
              subTable +
              "`.`" +
              item.on[ti] +
              "`"
          );
        }
      }
      joinStr += tmpArr.join(" AND ") + ")";
    }
    return joinStr;
  }

  /**
   * @description: where condition processing
   * @private
   * @return {string} splicing result of where condition
   */
  _formatWhere() {
    const sqlStr = this._where._sql.map((item) => `(${item})`).join(" AND ");
    const sqlCondition = [];
    this._where._condition.forEach((item) => {
      const singleWhere = {};
      const multiples2sql = [];

      const keys = Object.keys(item);
      keys.forEach((key) => {
        let val = item[key];
        if (typeOf(val) === "null") {
          val = ["IS", "NULL"];
        } else if (
          key.indexOf("_") !== 0 &&
          typeOf(val) !== "array" &&
          typeOf(val) !== "object"
        ) {
          val = ["=", val];
        }
        const _logic =
          key.indexOf("|") !== -1 ? "OR" : key.indexOf("&") !== -1 ? "AND" : "";
        if (_logic) {
          const multiple = {
            _logic,
          };
          const multipleKeys = key.split(_logic === "OR" ? "|" : "&");
          multipleKeys.forEach((m) => {
            multiple[m] = val;
          });
          const tmp = this._formatWhereItem(multiple);
          tmp && multiples2sql.push(tmp);
        } else {
          singleWhere[key] = val;
        }
      });
      const single2sql = this._formatWhereItem(singleWhere);
      let sqls = [];
      single2sql && sqls.push(single2sql);
      const sql = [...sqls, ...multiples2sql].join(" AND");
      sql && sqlCondition.push(sql);
    });
    let res = [];
    sqlStr && res.push(sqlStr);
    res = [...res, ...sqlCondition].join(" AND ");
    return res ? ` WHERE ${res}` : "";
  }

  /**
   * @description: Format a single where condition, each is a complete object mode
   * @param {object} where
   * @return {string} sql
   */
  _formatWhereItem(where) {
    if (isEmptyObject(where)) return "";
    const res = [];
    let _logic = "AND";
    if (where._logic) {
      _logic = where._logic;
      delete where._logic;
    }
    for (let fieldName in where) {
      let val = where[fieldName];
      let operate = "";
      fieldName = this._formatFieldsName(fieldName);
      if (typeOf(val) === "array") {
        operate = val[0].trim();
        val = typeOf(val[1]) === "array" ? val[1] : [val[1]];
      }
      res.push(this._formatWhereItemValue(operate, fieldName, val));
    }
    const sql = res.join(` ${_logic} `);
    return sql ? `(${sql})` : "";
  }

  /**
   * @description:Splicing SQL statements for a field
   * @param {string} operate  Operator = LIKE etc.
   * @param {string} fieldName Field name
   * @param {array|object} value The spliced ​​SQL statement of a field value
   * @return {string} The spliced ​​SQL statement of a field value
   */
  _formatWhereItemValue(operate, fieldName, value) {
    operate = operate.trim().toLocaleUpperCase();
    const type = typeOf(value);
    if (type === "array") {
      const len = value.length;
      if (len === 1) {
        return this._getOperateResultSql(operate, fieldName, value[0]);
      } else if (
        len > 1 &&
        (operate === "IN" ||
          operate === "NOTIN" ||
          operate === "NOT IN" ||
          operate === "BETWEEN")
      ) {
        return this._getOperateResultSql(operate, fieldName, value);
      } else {
        const res = value.map((item) => {
          return this._getOperateResultSql(operate, fieldName, item);
        });
        return res.join(" OR ");
      }
    } else if (type === "object") {
      const res = [];
      let _logic = "AND";
      if (value._logic) {
        _logic = value._logic;
        delete value._logic;
      }
      for (const name in value) {
        const tmp = this._getOperateResultSql(name, fieldName, value[name]);
        tmp && res.push(tmp);
      }
      return res.join(` ${_logic} `);
    }
  }

  /**
   * @description: Mainly do some special processing for operators, such as IN BETWEEN, etc.
   * @param {string} operate Operator = LIKE etc.
   * @param {string} fieldName Field name
   * @param {array|string} value The value of the field, an array or a string, a string represents a value, an array generally represents the range of IN or BETWEEN
   * @return {string}
   */
  _getOperateResultSql(operate, fieldName, value) {
    const valueType = typeOf(value);
    if (operate === "NOTLIKE") {
      operate = "NOT LIKE";
    }
    /* != null 转为 IS NOT NULL */
    if (operate === "!=" && value === null) {
      return `${fieldName} IS NOT NULL`;
    }
    if (operate === "IN" || operate === "NOTIN" || operate === "NOT IN") {
      if (operate === "NOTIN") {
        operate = "NOT IN";
      }
      if (valueType !== "array") {
        value = [value];
      }
      return `${fieldName} ${operate} (${value.join(",")})`;
    }
    if (operate === "BETWEEN") {
      if (valueType !== "array" || value.length < 2) return "";
      return `${fieldName} ${operate} ${value[0]} AND ${value[1]}`;
    }
    value = valueType === "string" && value !== "NULL" ? `'${value}'` : value;
    return `${fieldName} ${operate} ${value}`;
  }

  /**
   * @description: Print the generated sql statement for debugging
   * @return {string}
   */
  _sql() {
    return this.sql;
  }
}

module.exports = Mysql;
