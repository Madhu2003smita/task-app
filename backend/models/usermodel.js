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

export const appendUser = async (username,hashPassword,email) => {
    try{
        const result = await pack.query(
            'insert into users (username,email,password) values($1,$2,$3) RETURNING *',
            [username,email,hashPassword]
        );
        return result.rows[0];
    }
    catch(error){
        throw error
    }
}