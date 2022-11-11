const { messages } = require("../../utils/messages");
const User = require("../../models/user");

exports.create = async ({ body }) => {
  try {
    const { address, username } = body;
    const user = new User({
      userName: username,
      walletAddress: address,
    });

    await user.save();
    console.log({ user });

    return {
      success: true,
      status: 201,
      message: "User created successfully.",
    };
  } catch (error) {
    console.log(error.message);
    return {
      success: false,
      status: 500,
      message: "Something went wrong.",
    };
  }
};

exports.login = async ({ body }) => {
  try {
    const { address } = body;

    let user = await User.findOne({ walletAddress: address });
    if (!user) {
      user = new User({
        walletAddress: address,
      });

      await user.save();
    }

    return {
      success: true,
      status: 200,
      data: { user },
      message: "User created successfully.",
    };
  } catch (error) {
    console.log(error.message);
    return {
      success: false,
      status: 500,
      message: "Something went wrong.",
    };
  }
};

// exports.register = async (res) => {
//   try {
//     const { body } = req;
//     const user = await User.findOne({ email: body.email });
//     if (user) {
//       return {
//         status: 400,
//         success: false,
//         message: messages.auth.reigister.failed,
//       };
//     }

//     const { userName, email, password } = body;
//     const hash_password = await bcrypt.hash(password, 10);
//     user = new User({
//       userName,
//       email,
//       hash_password,
//     });
//     user = await user.save();
//     if (!user)
//       return res.status(400).json({ message: "Something went wrong." });

//     const token = generateJWTToken(_id, user.role);
//     return {
//       status: 201,
//       success: true,
//       message: messages.auth.reigister.success,
//       data: {
//         user,
//         token,
//       },
//     };
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// exports.check = async (res) => {
//   const { body, query, headers, params } = res;

//   console.log({ body });

//   return {
//     status: 200,
//     success: true,
//     message: messages.custom.success,
//   };
// };
