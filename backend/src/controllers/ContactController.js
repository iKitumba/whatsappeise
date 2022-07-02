import User from "../models/User.js";

export const findContactFromAnUser = async (req, res) => {
  const { user_id } = req;
  const contatcts = await User.findById(user_id).populate("contacts");

  return res.json(contatcts);
};

export const addOrRemoveContact = async (req, res) => {
  const { user_id } = req;
  const loggedUser = await User.findById(user_id);
  const { contact_id } = req.params;
  const targetUser = await User.findById(contact_id);

  if (!targetUser) {
    return res.status(404).json({ message: "Target user not found" });
  }

  if (!loggedUser.contacts.includes(contact_id)) {
    await loggedUser.updateOne({ $push: { contacts: contact_id } });
  } else {
    await loggedUser.updateOne({ $pull: { contacts: contact_id } });
  }

  return res.json();
};
