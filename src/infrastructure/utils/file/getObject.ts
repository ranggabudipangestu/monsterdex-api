import { s3Client } from "./config"

export const getObject = async(filename) => {
  const params = { Bucket: 'genstorage', Key: filename }
  try {
      const data = await s3Client.getObject(params)
      return await data.Body.transformToByteArray()
  } catch (error) {
    throw new Error
  }
}