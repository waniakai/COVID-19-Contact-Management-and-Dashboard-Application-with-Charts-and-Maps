import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { deleteContact, editContact } from '../redux/contactSlice';
import { FaEdit, FaTrash, FaTimes, FaUser } from 'react-icons/fa';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  status: 'active' | 'inactive';
}

const ContactView: React.FC = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  const [editedStatus, setEditedStatus] = useState<'active' | 'inactive'>('active');
  const [showNoContactMessage, setShowNoContactMessage] = useState(true);

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
    setEditMode(false);
  };

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setEditMode(true);
    setEditedFirstName(contact.firstName);
    setEditedLastName(contact.lastName);
    setEditedPhone(contact.phone);
    setEditedStatus(contact.status);
  };

  const handleDeleteContact = (id: string) => {
    dispatch(deleteContact(id));
  };

  const handleEditFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedContact) {
      const editedContact = {
        ...selectedContact,
        firstName: editedFirstName,
        lastName: editedLastName,
        phone: editedPhone,
        status: editedStatus,
      };
      dispatch(editContact(editedContact));
      setEditMode(false);
    }
  };

  return (
<div className="container mx-auto sm:w-11/12  sm:w-9/12 md:w-7/12 lg:w-5/12 px-4">
      <h2 className="text-lg font-bold ml-2 mb-2">Contact List</h2>
      {contacts.length === 0 && showNoContactMessage ? (
        <div className="mb-4 bg-red-100 border border-red-300 p-4 rounded-lg flex justify-between items-center">
          <p className="text-red-500 font-bold">
            No Contact Found. Please add a contact from the Create Contact Button
          </p>
          <button
            className="ml-4 text-red-500 focus:outline-none"
            onClick={() => setShowNoContactMessage(false)}
          >
            <FaTimes />
          </button>
        </div>
      ) : (
        <ul>
          {contacts.map((contact: Contact) => (
            <li
              key={contact.id}
              className={`p-4 flex flex-col mb-2 border-b hover:bg-blue-100 rounded-lg ${
                selectedContact && selectedContact.id === contact.id ? 'bg-blue-100' : ''
              }`}
            >
              <div className="flex justify-between items-center">
                <span
                  onClick={() => handleContactClick(contact)}
                  className={`cursor-pointer mr-20 flex items-center ${
                    selectedContact && selectedContact.id === contact.id ? 'font-bold' : ''
                  }`}
                >
                  <FaUser className="mr-2" />
                  {contact.firstName} {contact.lastName}
                </span>
                <div>
                  <button
                    onClick={() => handleEditContact(contact)}
                    className="px-2 py-1 text-green-500 rounded focus:outline-none"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
                    className="px-2 py-1 text-red-500 rounded bg-red-300 focus:outline-none"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              {selectedContact && selectedContact.id === contact.id && editMode && (
                <form onSubmit={handleEditFormSubmit} className="mt-2">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={editedFirstName}
                    onChange={(e) => setEditedFirstName(e.target.value)}
                    required
                    className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={editedLastName}
                    onChange={(e) => setEditedLastName(e.target.value)}
                    required
                    className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={editedPhone}
                    onChange={(e) => setEditedPhone(e.target.value)}
                    required
                    className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                  <div className="mb-2">
                    <label className="mr-2">Status:</label>
                    <label>
                      <input
                        type="radio"
                        value="active"
                        checked={editedStatus === 'active'}
                        onChange={() => setEditedStatus('active')}
                      />
                      Active
                    </label>
                    <label className="ml-4">
                      <input
                        type="radio"
                        value="inactive"
                        checked={editedStatus === 'inactive'}
                        onChange={() => setEditedStatus('inactive')}
                      />
                      Inactive
                    </label>
                  </div>
                  <div className="flex justify-between items-center">
                    <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded">
                      Save
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="px-2 py-1 rounded hover:bg-red-200"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </form>
              )}
              {selectedContact && selectedContact.id === contact.id && !editMode && (
                <div className="mt-2">
                  <p>
                    <strong>Status:</strong> {contact.status}
                  </p>
                  <p>
                    <strong>Phone:</strong> {contact.phone}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactView;
