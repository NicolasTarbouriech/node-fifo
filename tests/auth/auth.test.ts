import { connectDBForTesting, disconnectDBForTesting } from "../connectDbTest";
import { findUserByEmail, postUser } from "../../src/entity/user/repository/user.repository";
import { actionTypeValuesMap } from "../../src/entity/action/interface/action.interface";
import { calculateCredits } from "../../src/utils/credits.utils";
import { signIn } from "../../src/service/auth.service";


describe('AuthController tests', () => {
  beforeAll(async () => {
    await connectDBForTesting();
  });

  afterAll(async () => {
    await disconnectDBForTesting();
  });

  it('Sign up & create a user with success', async () => {
    const postedData = {
      email: 'testAuth@example.com',
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

    const fetchedPerson = await findUserByEmail("testAuth@example.com");

    expect(mockUser.credits).toEqual(expect.any(Object));
    if (fetchedPerson) {
      expect(user.email).toEqual(fetchedPerson.email);
      expect(user.queue).toEqual(fetchedPerson.queue);
    }
  });
  it('Sign in & get an accessToken', async () => {
    const postedData = {
      email: 'test@example.com',
    };

    const accessToken = await signIn(postedData.email);
    const firstTwoChars2 = accessToken.substring(0, 2);
    const startsWithEy2 = firstTwoChars2 === 'ey';
    expect(startsWithEy2).toBeTruthy();
  })
  it('Sign in with email dont exist in db', async () => {
    const postedData = {
      email: 'test-no-email-in-db@example.com',
    };

    expect(() => {
       signIn(postedData.email);
    }).toThrow('e');
  });
});
