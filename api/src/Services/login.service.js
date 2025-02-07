import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import db from "../db/db.js"
dotenv.config()

const saltRounds = process.env.SALT_ROUNDS
const jwtSecret = process.env.JWT_SECRET

const loginServices = {

  login: (data)=>{
    return new Promise(async(resolve, reject)=>{
    
    //validar se os dados foram todos passados
    if(!data.password || !data.email){
      reject({message: "Insira todas as informações"});return;
    }

    //encontra informações do usuário pelo email
    const userCadInfo = await getUserByEmail(data)
    if(!userCadInfo){
      reject({message: "email ou senha incorretos"});return;
    }

    const isPasswordMatching = await bcrypt.compare(data.password, userCadInfo.password)
  
    if(!isPasswordMatching){
      reject({message: "email ou senha errados"});return;
    }
    const token = jwt.sign({
      data: {id: userCadInfo.id}
    }, jwtSecret, {expiresIn: "10h"})
    if(!token){
      reject({message: "erro ao gerar token"});return;
    }
    resolve(token)
  

    })
  },
 
}

function getUserByEmail (data){
  return new Promise(async(resolve, reject)=>{

    await db.query("Select * from User where email = (?)", [data.email], (error, results)=>{
      if(error){reject(error)}
      resolve(results[0])
    })

    })
}

export default loginServices