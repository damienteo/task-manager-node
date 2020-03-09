const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOneId, userOne, userTwo, setupDatabase } = require("./fixtures/db");

const userThree = {
  name: "testuser3",
  email: "testemail3@test.com",
  password: "12345678"
};

const userFour = {
  name: "testuser4",
  email: "testemail4@test.com",
  password: "12345678"
};

beforeEach(setupDatabase);

test("Should sign up new user", async () => {
  const response = await request(app)
    .post("/users")
    .send(userThree)
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  const { password: userThreePassword, ...userThreeDetails } = userThree;
  expect(response.body).toMatchObject({
    user: { ...userThreeDetails },
    token: user.tokens[0].token
  });
  expect(user.password).not.toBe(userThreePassword);
});

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send(userOne)
    .expect(200);

  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[0].token);
});

test("Should not login non-existing user", async () => {
  await request(app)
    .post("/users/login")
    .send(userFour)
    .expect(400);
});

test("Should get user profile", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send(userOne)
    .expect(200);
});

test("Should not get user profile", async () => {
  await request(app)
    .get("/users/me")
    .send(userTwo)
    .expect(401);
});

test("Should delete account", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send(userOne)
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("Should delete account", async () => {
  await request(app)
    .delete("/users/me")
    .send(userTwo)
    .expect(401);
});

test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user fields", async () => {
  await request(app)
    .patch("/users/me/")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ name: "NewName" })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.name).toBe("NewName");
});

test("Should not update invalid user fields", async () => {
  await request(app)
    .patch("/users/me/")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ location: "location" })
    .expect(400);
});
