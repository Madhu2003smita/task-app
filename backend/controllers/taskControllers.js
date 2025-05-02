import { appendTask, deleteTask, getTask, modifyTask } from "../models/taskmodel.js"
import pack from "../db.js"

export const addTask = async (req,res)=>{
    const user_id = req.user.id

    const {title,description,priority,due_date} = req.body
    try{
        await appendTask(user_id,title,description,priority,due_date)
        res.status(201).json({
            message:'task added successfully'
        })
    }catch(error){
        res.status(500).json({
        error:error.message    
        })

    }
}


export const getAllTask = async(req,res)=>{
    const user_id = req.user.id

    try{
        let tasks = await getTask(user_id)
        res.status(200).json({
            tasks:tasks
        })
    }catch(error){
        res.status(500).json({
            error:error.message
        })
    }
}


export const updateTask = async(req,res)=>{
    const {title,description,priority,due_date} = req.body
    const task_id = req.params.id

    try{
        await modifyTask(title,description,priority,due_date,task_id)
        res.status(200).json({
            message:"updated successfully"
        })
    }catch(error){
        res.status(500).json({
            error:error.message
        })
    }
}

export const removeTasks = async(req, res) =>{
    const task_id = req.params.id
    
    try {
        let result  = await deleteTask(task_id)
        res.status(200).json({message:result.message})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const getSingleData  = async(req, res)=>{
    const task_id = req.params.id;

    try {
        let result = await pack.query('select * from tasks where task_id = $1',[task_id]);
        res.status(200).json({task:result.rows})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}