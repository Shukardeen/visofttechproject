const Contact = require("../models/contact.model");
const sendEmail = require("../config/mail.config");

const handleGetContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ messages: "All contact fetched", contacts });
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleGetSpecificContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact fetched successfully", contact });
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleCreateContact = async (req, res) => {
  try {
    const { name, email, message, phone } = req.body;
    const subject = `Hey i am ${email}`;
    await sendEmail(subject, message);
    const newContact = new Contact({
      name,
      email,
      message,
      phone,
    });
    await newContact.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error creating contact message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleMarkContactAsRead = async (req, res) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { isRead: true },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res
      .status(200)
      .json({ message: "Contact marked as read", contact: updatedContact });
  } catch (error) {
    console.error("Error marking contact as read:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleAllMarkAsRead = async (req, res) => {
  try {
    await Contact.updateMany({}, { isRead: true });
    res.status(200).json({ message: "All contacts marked as read" });
  } catch (error) {
    console.error("Error marking all contacts as read:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleDeleteContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  handleCreateContact,
  handleDeleteContact,
  handleGetContacts,
  handleMarkContactAsRead,
  handleAllMarkAsRead,
  handleGetSpecificContact
};
