import express from "express"
import db from "../db/db.js"
import userService from "../Services/user.service.js"
const userController = express.Router()
import auth from "../Middlewares/auth.js"

userController.post("/",async (req,res)=>{
  const data = req.body
  await userService.create(data).then(results=>{
    res
    .status(201)
    .send(results);
  }).catch(err=>{
    res
    .status(400)
    .send(err)
  })

})
userController.get("/:id", async(req,res)=>{
  const {id} = req.params
  await userService.read(id).then((response)=>{
    res
    .status(200)
    .json(response)
  }).catch(e=>{
    res
    .status(400)
    .json(e)
  })
})
userController.get("/",auth ,async(req,res)=>{
  await userService.list().then((response)=>{
    res
    .status(200)
    .json(response)
  }).catch(e=>{
    res
    .status(400)
    .json(e)
  })
})
userController.delete("/:id", async(req,res)=>{
  const {id} = req.params
  await userService.delete(id).then((response)=>{
    res
    .status(204)
    .json(response)
  }).catch(e=>{
    res
    .status(400)
    .json(e)
  })
})
userController.put("/", async(req,res)=>{
  const data = req.body
  await userService.update(data).then(r=>{
    res
    .status(200)
    .json(r)
  }).catch(e=>{
    res
    .status(400)
    .json(e)
  })
})
export default userController;