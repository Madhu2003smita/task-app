import pack from '../db.js'
export const findByMail = async(mail)=>{
    try{
       const user =  await pack.query(
            'SELECT * FROM users WHERE email = $1', [mail]
       );
            return user.rows[0]
    
    }
   catch(error){
    throw error;
   }
   
};

export const appendUser =(username,hashPassword,email)=>{
    try{
        pack.query(
            'insert into users (username,email,password) values($1,$2,$3)',
            [username,email,hashPassword]
        )
    }
    catch(error){
        throw error
    }
}