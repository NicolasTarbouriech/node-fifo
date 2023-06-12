import { postUser } from "../../src/entity/user/repository/user.repository";
import { actionTypeValuesMap } from "../../src/entity/action/interface/action.interface";
import { calculateCredits } from "../../src/utils/credits.utils";
import { connectDBForTesting, disconnectDBForTesting } from "../connectDbTest";
import { model } from "mongoose";
import { IUser } from "../../src/entity/user/interface/user.interface";
import userSchema from "../../src/entity/user/model/user.model";

describe('Tests pour la fonction createUser', () => {
  beforeAll(async () => {
    await connectDBForTesting();
  });

  afterAll(async () => {
    await disconnectDBForTesting();
  });

  it('Create a user with success', async () => {
    const postedData = {
      email: 'test@waalaxy.fr'
    };

    const mockUser = {
      email: postedData.email,
      credits: {},
      queue: []
    };

    const user = await postUser(postedData);

    for (const [type, value] of Object.entries(actionTypeValuesMap)) {
      user.credits[type] = calculateCredits(value);
    }

    await user.save();

    const User = model<IUser>("User", userSchema);
    const fetchedPerson = await User.findOne(
      {
        email: "test@waalaxy.fr"
      })
    ;

    expect(mockUser.credits).toEqual(expect.any(Object));
    if (fetchedPerson) {
      expect(user.email).toEqual(fetchedPerson.email);
      expect(user.credits).toEqual(fetchedPerson.credits);
      expect(user.queue).toEqual(fetchedPerson.queue);
    }
  });
});
