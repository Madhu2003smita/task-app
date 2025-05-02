import pack from '../db.js'

export const appendTask = async (user_id,title,description,priority,due_date) => {
    try {
        const result = await pack.query(
            'INSERT INTO tasks (user_id,title,description,priority,due_date) VALUES ($1, $2, $3, $4,$5) RETURNING *',
            [user_id,title,description,priority,due_date]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

export const getTask = async(user_id)=>{
    try{
        let tasks = await pack.query(
           'select * from tasks where user_id = $1',[user_id]
        )
        return tasks.rows
    }
    catch(error){
        throw error
    }
} 

export const modifyTask = async(title,description,priority,due_date,task_id)=>{
    try{
        let updated = await pack.query(
            'update tasks set title = $1, description = $2, priority = $3,due_date = $4 where task_id = $5',[title,description,priority,due_date,task_id]
        )
        
        return updated
    }catch(error){
        throw error
    }
}


export const deleteTask = async(task_id)=>{
    try {
        let result = await pack.query('delete from tasks where task_id = $1', [task_id])
        
        
        if(!result.rowCount){
            throw new Error('data not present')
        }

        return {message: 'deleted successfully'}
    } catch (error) {
        throw error
    }
}