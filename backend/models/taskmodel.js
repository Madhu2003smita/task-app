import pack from '../db.js'

export const appendTask = async (user_id,title,description,priority,due_date) => {
    try {
        const result = await pack.query(
            'INSERT INTO tasks (user_id,title,description,priority,due_date,completed) VALUES ($1, $2, $3, $4,$5, $6) RETURNING *',
            [user_id,title,description,priority,due_date,false]
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

export const modifyTask = async(title,description,priority,due_date,completed,task_id,user_id)=>{
    try{
        let updated = await pack.query(
            'update tasks set title = $1, description = $2, priority = $3, due_date = $4, completed = $5 where task_id = $6 and user_id = $7',
            [title,description,priority,due_date,completed,task_id,user_id]
        );

        if (!updated.rowCount) {
            throw new Error('Task not found or unauthorized');
        }

        return updated;
    } catch(error){
        throw error
    }
}


export const deleteTask = async(task_id,user_id)=>{
    try {
        let result = await pack.query('delete from tasks where task_id = $1 and user_id = $2', [task_id, user_id])

        if(!result.rowCount){
            throw new Error('Task not found or unauthorized')
        }

        return {message: 'deleted successfully'}
    } catch (error) {
        throw error
    }
}

export const toggleTaskCompletion = async (task_id, user_id) => {
    try {
        const result = await pack.query(
            'UPDATE tasks SET completed = NOT completed WHERE task_id = $1 AND user_id = $2 RETURNING *',
            [task_id, user_id]
        );

        if (!result.rowCount) {
            throw new Error('Task not found or unauthorized');
        }

        return result.rows[0];
    } catch (error) {
        throw error;
    }
};