const signIn = require("./signIn");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

describe("test signIn function", () => {
  test("User should successfully login with valid creds", async () => {
    const req = {
      body: {
        email: "test@mail.com",
        password: "qwerty123",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    };
    const user = {
      _id: "test-id",
      email: "test@mail.com",
      password: "qwerty123",
      subscription: "starter",
    };
    const updatedUser = {
      _id: "test-id",
      email: "test@mail.com",
      password: "qwerty123",
      subscription: "starter",
      token: "test-jwt-token",
    };

    jest.spyOn(User, "findOne").mockImplementationOnce(() => user);
    jest.spyOn(bcrypt, "compareSync").mockImplementationOnce(() => true);
    jest.spyOn(jwt, "sign").mockImplementationOnce(() => "test-jwt-token");
    jest
      .spyOn(User, "findByIdAndUpdate")
      .mockImplementationOnce(() => updatedUser);
    const result = await signIn(req, res);

    expect(result.code).toBe(200);
    expect(result.data.token).toBe("test-jwt-token");
    expect(result.data.user).toEqual({
      email: "test@mail.com",
      subscription: "starter",
    });
    expect(result.data.user.email).toMatch("test@mail.com");
    expect(result.data.user.subscription).toMatch("starter");
  });

  test("Unregistered user should not be able to login", async () => {
    const req = {
      body: {
        email: "test@mail.com",
        password: "qwerty123",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn((data) => data),
    };
    const user = {
      _id: "test-id",
      email: "test@mail.com",
      password: "qwerty123",
      subscription: "starter",
    };

    jest.spyOn(User, "findOne").mockImplementationOnce(() => user);
    jest.spyOn(bcrypt, "compareSync").mockImplementationOnce(() => false);

    await expect(() => signIn(req, res)).rejects.toThrow();
  });
});
