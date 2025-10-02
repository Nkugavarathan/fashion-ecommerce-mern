import express from "express"

const router = express.Router()

router.get("/test", (req, res) => {
  res.send("hi")
})
router.post("/userpost", (req, res) => {
  const username = req.body.username
  res.send("Your user name is : " + username)
})
export default router
