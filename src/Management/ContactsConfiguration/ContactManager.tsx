import { useState, useEffect, useMemo } from 'react';
import { Contact } from './schema';
import { getContacts, addContact, updateContact, deleteContact } from './api';
import ContactsConfigurationForm from './ContactsConfigurationForm';
import ContactTable from './ContactCard';
import { Button, TextField, Alert, Dialog, DialogContent, DialogTitle } from '@mui/material';

export default function ContactManager() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
      setError(null);
    } catch (error) {
      setError('Failed to load contacts');
      console.error(error);
    }
  };

  const filteredContacts = useMemo(() => {
    if (!searchTerm) return contacts;
    const lowercased = searchTerm.toLowerCase();
    return contacts.filter(contact =>
      contact.strName.toLowerCase().includes(lowercased)
    );
  }, [contacts, searchTerm]);

  const handleSubmit = async (data: Contact) => {
    try {
      if (data.intId) {
        await updateContact(data.intId, data);
      } else {
        const { intId, ...newContact } = data;
        await addContact(newContact);
      }
      await loadContacts();
      setIsFormOpen(false);
      setEditingContact(null);
    } catch (error) {
      setError('Failed to save contact');
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
      try {
        await deleteContact(id);
        await loadContacts();
      } catch (error) {
        setError('Failed to delete contact');
        console.error(error);
      }
    
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setIsFormOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contacts</h1>
        
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setEditingContact(null);
            setIsFormOpen(true);
          }}
        >
          Add Contact
        </Button>
      </div>

      <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <DialogTitle>{editingContact ? 'Edit Contact' : 'Add Contact'}</DialogTitle>
        <DialogContent>
          <ContactsConfigurationForm
            contact={editingContact || undefined}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingContact(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <TextField
        fullWidth
        label="Search contacts"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          width: 200,
          marginBottom: 2,
          alignSelf: 'flex-end',
        }}
        className="mb-4"
      />

      {filteredContacts.length === 0 ? (
        <p className="text-center text-gray-500">No contacts found</p>
      ) : (
        <ContactTable
          contacts={filteredContacts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
