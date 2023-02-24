import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
	name: {
		type: String
  },
  category:{
    type: String
  },
  description:{
    type: String
  },
  isCatched:{
    type: Boolean
  },
  types:[{ type: String }],
	stats: {
      hp: {
        type:Number,
        default: 0
      },
      attack: {
        type:Number,
        default: 0
      },
      def: {
        type:Number,
        default: 0
      },
      speed: {
        type:Number,
        default: 0
      }
	},
  imageUrl: {
    type: String
  },
}, {
	timestamps: true
})

export default mongoose.model('Monsters', Schema)