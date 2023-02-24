import { getObject } from "../utils/file/getObject"


export class MediaController {
  async media(req, res) {
    try{
      const { filename } = req.params
      const byteAray = await getObject(filename)
      res.write(byteAray)
      res.end()
    }catch(err){
      res.send("Error")
    }
  }
  
}

