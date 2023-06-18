import { connectDBForTesting, disconnectDBForTesting } from "../connectDbTest";
import Action from "../../src/entity/action/model/action.model";
import { findUserByEmail, postUser } from "../../src/entity/user/repository/user.repository";

describe('UserController tests', () => {
  beforeAll(async () => {
    await connectDBForTesting();
  });

  afterAll(async () => {
    await disconnectDBForTesting();
  });

  it('Get user', async () => {
    const mockUser = {
      email: "test@example.com",
      credits: {},
      queue: []
    };

    const user = await findUserByEmail("test@example.com");

    expect(mockUser.email).toEqual(user.email);
  });
  it('get user dont exist', async () => {
    const user = await findUserByEmail("test-no-exist@example.com");

    expect(user).toBeNull();
  });
  it('Add actions to user', async () => {
    const postedData = {
      type: "B"
    }

    const mockUser = {
      email: "test@example.com",
      credits: {},
      queue: []
    };

    await postUser(mockUser);

    const user = await findUserByEmail("test@example.com");

    const action = new Action({
      type: postedData.type,
      credits: 0,
      owner: user,
    });

    await action.save();

    user.queue.push(action._id);
    await user.save();

    expect(action.owner).toEqual(user);
  });
});
