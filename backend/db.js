import page from 'pg';
const {Pool} = page
let pack = new Pool ({
    host:'localhost',
    port:'5432',
    user:'postgres',
    database:'task',
    password:'madhu1928'

})
export default pack