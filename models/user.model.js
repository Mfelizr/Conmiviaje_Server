const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Please specify a username'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please specify an email'],
      unique: true,
      minLength: 1,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      salt: { type: String, required: true },
      hash: { type: String, required: true },
    },
    avatar: {
      type: String,
      default:
        'https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png',
    },
    role: {
        type: String,
        trim: true,
        default: "user"
      },
    favoriteOffers: [{ type: Schema.Types.ObjectId, ref: 'Offer' }],    
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

const User = model('User', userSchema);

module.exports = User;