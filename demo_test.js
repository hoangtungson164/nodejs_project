var con = require('/home/user/nodejs_crud/config/database.js');

async function f() {

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), 1000)
    });
  
    let result = await promise; // wait until the promise resolves (*)
  
    console.log(result); // "done!"
  }
  
  f();

  async function checkExistEmail(email) {
    let promise = new Promise((resolve, reject) => {
      var sql = "SELECT email FROM user_login WHERE email = " + "'" + email + "'"
      con.query(sql, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
          resolve(false);
        }
        resolve(true);
      })
    })
    let result = await promise;
    console.log(result);
    return result;
  }

  checkExistEmail('nick0000@email.com')