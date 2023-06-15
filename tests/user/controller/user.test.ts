
import { findUserByEmail, postUser } from "../../../src/entity/user/repository/user.repository";
import { actionTypeValuesMap } from "../../../src/entity/action/interface/action.interface";
import { calculateCredits } from "../../../src/utils/credits.utils";
import { connectDBForTesting, disconnectDBForTesting } from "../../connectDbTest";

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

    const fetchedPerson = await findUserByEmail("test@waalaxy.fr");

    expect(mockUser.credits).toEqual(expect.any(Object));
    if (fetchedPerson) {
      expect(user.email).toEqual(fetchedPerson.email);
      expect(user.queue).toEqual(fetchedPerson.queue);
    }
  });
});
