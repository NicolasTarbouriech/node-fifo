import { postUser } from "../../src/entity/user/repository/user.repository";
import { actionTypeValuesMap } from "../../src/entity/action/interface/action.interface";
import { calculateCredits } from "../../src/utils/credits.utils";
import { connect, connection } from "mongoose";
import { connectionString } from "../../src/config";

describe('Tests pour la fonction createUser', () => {
  beforeAll(async () => {
    const connection = await connect(connectionString);
  });

  afterAll(async () => {
    await connection.close();
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

    expect(mockUser.credits).toEqual(expect.any(Object));
    expect(postUser).toHaveBeenCalledWith(postedData);
    expect(user.save).toHaveBeenCalled();
    expect(user).toEqual(mockUser);
  });
});
