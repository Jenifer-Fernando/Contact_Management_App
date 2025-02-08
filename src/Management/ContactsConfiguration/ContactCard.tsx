import { Contact } from './schema';
import { format } from 'date-fns';

interface ContactTableProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
}

export default function ContactTable({ contacts, onEdit, onDelete }: ContactTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Phone</th>
            <th className="border px-4 py-2 text-left">Date</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.intId} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{contact.strName}</td>
              <td className="border px-4 py-2">{contact.strEmail}</td>
              <td className="border px-4 py-2">{contact.strPhoneNo || 'N/A'}</td>
              <td className="border px-4 py-2">
                {contact.strDate ? format(new Date(contact.strDate), 'yyyy/MM/dd') : 'N/A'}
              </td>
              <td className="border px-4 py-2 flex space-x-2">
                <button
                  onClick={() => onEdit(contact)}
                  className="px-3 py-1 text-sm border rounded hover:bg-gray-100 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => contact.intId && onDelete(contact.intId)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
