import { Contact } from "../Models/contact.js"

// get all contacts
export const getAllContacts = async (req, res) => {
    const userContacts = await Contact.find()
    if (!userContacts) return res.status(404).json({ message: "no contact find", userContacts })
    res.json({ message: "contact fetched", userContacts })
}

// get specific contacts
export const getContactById = async (req, res) => {
    const id = req.params.id

    const userContact = await Contact.findById(id)
    if (!userContact) return res.status(404).json({ message: "no contact find", userContact })
    res.json({ message: "contact fetched", userContact })
}

// add New Contact
export const addNewContact = async (req, res) => {
    const { name, email, phone, type } = req.body

    if (name == '' || email == '' || phone == '' || type == '') return res.status(400).json("all feilds are required")

    const saveContact = await Contact.create({
        name,
        email,
        phone,
        type,
        user: req.user
    });

    res.json({ message: "contact saved successfully", saveContact })
}

// update contact
export const update_Contact = async (req, res) => {
    const id = req.params.id
    const { name, email, phone, type } = req.body
    const updateContact = await Contact.findByIdAndUpdate(id, {
        name,
        email,
        phone,
        type
    }, { new: true })

    if (!updateContact) return res.status(404).json({ message: "no contact found", })
    res.json({ message: "Contact updated successfully", updateContact })
}

// delete contact
export const delete_Contact = async (req, res) => {
    const id = req.params.id;
    const deleteContact = await Contact.findByIdAndDelete(id);
    if (!deleteContact) return res.status(404).json({ message: "contact not found" });
    res.json({ message: "Contact deleted successfully" });
}

// get contacts by userId
export const getContactByUserId = async (req, res) => {
    const id = req.params.id
    let contact = await Contact.find({ user: id })
    if (!contact) return res.status(404).json({ message: "Contact not found" })
        res.json({message: "user specific contect", contact})
}