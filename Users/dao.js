import model from "./model.js";
export const createUser = (user) => {
  delete user._id
  return model.create(user);
};
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) => model.findOne({ username: username });
export const findUserByCredentials = (username, password) => model.findOne({ username, password });
export const updateUser = (username, profile) => model.updateOne({ username },
  {
    $set: {
      password: profile.password,
      firstName: profile.firstName,
      lastName: profile.lastName,
      dob: profile.dob,
      email: profile.email,
      role: profile.role,
    },
  },
  { new: true }
);
export const deleteUser = (username) => model.deleteOne({ username });

// Data Access Object!