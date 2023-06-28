import { model, Schema } from "mongoose";
import { IUser, IUserModel } from "../interface/user.interface";

class UserModel {
  private static instance: UserModel;
  private readonly userModel: IUserModel;

  private constructor() {
    const userSchema = new Schema<IUser>(
      {
        email: {
          type: String,
          required: true,
        },
        credits: {
          type: Schema.Types.Mixed,
          required: true,
        },
        queue: [
          {
            type: Schema.Types.ObjectId,
            ref: "Actions",
            default: [],
          },
        ],
        lastActionDeletedAt: {
          type: Date,
          default: null,
        },
      },
      {
        timestamps: true,
      }
    );

    this.userModel = model<IUser>("User", userSchema);
  }

  public static getInstance(): UserModel {
    if (!UserModel.instance) {
      UserModel.instance = new UserModel();
    }
    return UserModel.instance;
  }

  public getUserModel(): any {
    return this.userModel;
  }
}

const userModel = UserModel.getInstance();
const User = userModel.getUserModel();

export default User;
