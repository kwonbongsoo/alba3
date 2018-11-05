"use strict"

module.exports = {
  setConnection(conn) {
    this.connection = conn // 변수를 알아서 만들어준다.
  },

  login (params, successFn, errorFn) {
    this.connection.query(
    'call login(?, ?)',
    [params.id, params.password],
    function (error, result) {
        console.log(error)
        if (error) {
            errorFn(error)
        } else {
            successFn(result)
        }
    })
  },

  master_info (params, successFn, errorFn) {
    this.connection.query(
    'call master_info(?)',
    [params.id],
    function (error, result) {
        console.log(error)
        if (error) {
            errorFn(error)
        } else {
            successFn(result)
        }
    })
  },

  master_info_update (params, successFn, errorFn) {
    this.connection.query(
    'call master_info_update(?, ?)',
    [params.id, params.tel],
    function (error, result) {
        console.log(error)
        if (error) {
            errorFn(error)
        } else {
            successFn(result)
        }
    })
  },

  add_token (params, successFn, errorFn) {
    this.connection.query(
    'call add_token(?, ?)',
    [params.no, params.token],
    function (error, result) {
        console.log(error)
        if (error) {
            errorFn(error)
        } else {
            successFn(result)
        }
    })
  },

  
} // module