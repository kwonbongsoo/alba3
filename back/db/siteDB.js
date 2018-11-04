"use strict"

module.exports = {
  setConnection(conn) {
    this.connection = conn // 변수를 알아서 만들어준다.
  },

  l_site (successFn, errorFn) {
    this.connection.query(
    'call l_site()',
    function (error, result) {
        console.log(error)
        if (error) {
            errorFn(error)
        } else {
            successFn(result)
        }
    })
  },
  add(params, successFn, errorFn) {
    this.connection.query(
      'CALL add_site(?, ?, ?, ?, ?)',
      [params.site_url, params.site_name, params.new_browser_yn, params.icon_url, params.icon_name],
      function (error, result) {
        console.log(error);
        if (error) {
          errorFn(error)
        } else {
          successFn(result)
        }
      })
  },
  update(params, successFn, errorFn) {
    this.connection.query(
      'CALL update_site(?, ?, ?, ?, ?, ?)',
      [params.site_url, params.site_name, params.new_browser_yn, params.icon_url, params.icon_name, params.no],
      function (error, result) {
        console.log(error);
        if (error) {
          errorFn(error)
        } else {
          successFn(result)
        }
      })
  },
  d_site (no, successFn, errorFn) {
    this.connection.query(
      'CALL d_site(?)',
      [no],
      function (error, result) {
        console.log(error);
        if (error) {
          errorFn(error)
        } else {
          successFn(result)
        }
      })
  },
//   update(params, successFn, errorFn) {
//     this.connection.query(
//       'CALL update_product(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
//       [params.no, params.name, params.price, params.desc, params.o_name, params.o_price, params.o_cnt, params.imageName, params.img_path, params.store_no],
//       function (error, result) {
//         console.log(error)
//         if (error) {
//           errorFn(error)
//         } else {
//           successFn(result)
//         }
//       })
//   },

//   d_product(no, successFn, errorFn) {
//     this.connection.query(
//       'CALL d_product(?)',
//       [no],
//       function (error, result) {
//         if (error) {
//           errorFn(error)
//         } else {
//           successFn(result)
//         }
//       })
//   }

//   update(name, price, price1, imageName, img_path, no, successFn, errorFn) {
//     this.connection.query(
//       'update product set name = ?, price = ?, price1 = ?, imageName = ?, img_path = ? where no = ?',
//       [name, price, price1, imageName, img_path, no],
//       function (error, result) {
//         if (error) {
//           errorFn(error)
//         } else {
//           successFn(result)
//         }
//       })
//   },

  
} // module