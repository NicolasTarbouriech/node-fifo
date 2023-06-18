import { model, Schema } from "mongoose";
import {
  actionTypeEnum,
  IAction,
  IActionModel,
} from "../interface/action.interface";

class ActionModel {
  private static instance: ActionModel;
  private actionModel: IActionModel;

  private constructor() {
    const actionSchema = new Schema<IAction, IActionModel>(
      {
        type: {
          type: String,
          enum: actionTypeEnum,
          required: true,
        },
        credits: {
          type: Number,
          required: true,
        },
        owner: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
      {
        timestamps: true,
      }
    );

    this.actionModel = model<IAction>("Actions", actionSchema);
  }

  public static getInstance(): ActionModel {
    if (!ActionModel.instance) {
      ActionModel.instance = new ActionModel();
    }
    return ActionModel.instance;
  }

  public getActionModel(): any {
    return this.actionModel;
  }
}

const actionModel = ActionModel.getInstance();
const Action = actionModel.getActionModel();

export default Action;
