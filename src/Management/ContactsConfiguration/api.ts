import axios from 'axios';
import { Contact } from './schema';


const API_URL= import.meta.env.VITE_API_URL ;

export const getContacts = async (): Promise<Contact[]> => {
  
  try {
    const response = await axios.get(`${API_URL}/contacts`);
    console.log(response);
    const contacts: Contact[] = response.data.map((data: any) => ({
      intId: data.id,
      strName: data.name,
      strEmail: data.email,
      strPhoneNo: data.phone,
      strDate: data.createdAt,
    }));
    return contacts;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

export const addContact = async (contact: Contact): Promise<void> => {
  const newData = {
    name: contact.strName,
    email: contact.strEmail,
    phone: contact.strPhoneNo,
  };

  try {
    await axios.post(`${API_URL}/contacts`, newData);
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error;
  }
};

export const updateContact = async (id: number, contact: Contact): Promise<void> => {
  console.log(contact);
  const updateData = {
    name: contact.strName,
    email: contact.strEmail,
    phone: contact.strPhoneNo,
    
  };

  try {
    
    await axios.patch(`${API_URL}/contacts/${id}`, updateData);
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
};

export const deleteContact = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/contacts/${id}`);
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
};
