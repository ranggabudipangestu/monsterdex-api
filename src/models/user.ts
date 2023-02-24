import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
	email: {
		type: String,
		unique: true
  },
	password: {
		type: String
	},
  username: {
    type: String
  },
	role: {
    type: String
  },
}, {
	timestamps: true
})

export default mongoose.model('Users', Schema)