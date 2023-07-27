import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { addContact } from '../redux/contactSlice';
import ContactView from './ContactView';
import { FaPlus } from 'react-icons/fa';

const ContactForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [phonePrefix, setPhonePrefix] = useState('+');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newContact = {
      id: nanoid(),
      firstName,
      lastName,
      email: '',
      phone: phonePrefix + phone,
      status,
    };
    dispatch(addContact(newContact));
    setFirstName('');
    setLastName('');
    setPhone('');
    setStatus('active');
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setFirstName('');
    setLastName('');
    setPhone('');
    setStatus('active');
  };

  return (
    <div className="relative mt-10">
      {showForm && <div className="fixed inset-0 bg-black opacity-40 z-30" onClick={handleCancel}></div>}
      <div className="container grid place-items-center responsive-container" style={{ height: showForm ? '100vh' : 'auto ' }}>
        <div
          className={`w-11/12 sm:w-9/12 rounded-t-2xl md:w-7/12 lg:w-5/12 p-4 bg-green-200 ${
            showForm ? 'rounded-3xl shadow-lg z-40 absolute top-20 create-contact-form' : ''
          }`}
        >
          {!showForm && (
            <div className="flex justify-between font-bold">
              <h1>Create New Contacts</h1>
              <button
                onClick={() => setShowForm(true)}
                className="mr-2 flex items-center rounded-3xl w-50 p-2 mb-4 text-black shadow-lg bg-yellow-200 rounded hover:bg-yellow-400 focus:outline-none focus:bg-green-600"
              >
                <FaPlus className="mr-1" />Create Contact
              </button>
            </div>
          )}
          {showForm && (
            <form onSubmit={handleSubmit} className="mb-4">
              <h1 className="font-bold mb-2">Add Contact</h1>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
              <div className="flex items-center mb-2">
                <select
                  value={phonePrefix}
                  onChange={(e) => setPhonePrefix(e.target.value)}
                  className="w-24 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="+1">+1 (US)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+52">+52 (Mexico)</option>
                  <option value="+86">+86 (China)</option>
                  <option value="+91">+91 (India)</option>
                </select>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="flex-grow px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-2">
                <label className="font-bold mr-2">Status:</label>
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="active"
                    checked={status === 'active'}
                    onChange={() => setStatus('active')}
                  />
                  Active
                </label>
                <label className="ml-2">
                  <input
                    type="radio"
                    name="status"
                    value="inactive"
                    checked={status === 'inactive'}
                    onChange={() => setStatus('inactive')}
                  />
                  Inactive
                </label>
              </div>
              <div className="m-10 flex justify-between">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-3xl font-bold mr-2 w-32 px-4 py-2 text-black shadow-lg bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-3xl font-bold w-40 px-4 py-2 text-black shadow-lg bg-yellow-200 rounded hover:bg-yellow-400 focus:outline-none focus:bg-green-400"
                >
                  Add Contact
                </button>
              </div>
            </form>
          )}
        </div>
        <ContactView />
      </div>
    </div>
  );
};

export default ContactForm;
