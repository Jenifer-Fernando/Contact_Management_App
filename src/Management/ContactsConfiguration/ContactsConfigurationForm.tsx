import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Contact, contactSchema, initContactSchema } from './schema';
import { Button, TextField, Box } from '@mui/material';

interface ContactFormProps {
  contact?: Contact;
  onSubmit: (data: Contact) => void;
  onCancel: () => void;
}

export default function ContactConfigurationForm({
  contact,
  onSubmit,
  onCancel,
}: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Contact>({
    resolver: zodResolver(contactSchema),
    defaultValues: contact || initContactSchema,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {contact?.intId && (
        <input type="hidden" {...register('intId')} />
      )}

      <Box>
        <TextField
          id="strName"
          label="Name"
          variant="outlined"
          fullWidth
          {...register('strName')}
          error={!!errors.strName}
          helperText={errors.strName?.message}
        />
      </Box>

      <Box>
        <TextField
          id="strEmail"
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          {...register('strEmail')}
          error={!!errors.strEmail}
          helperText={errors.strEmail?.message}
        />
      </Box>

      <Box>
        <TextField
          id="strPhoneNo"
          label="Phone"
          variant="outlined"
          fullWidth
          {...register('strPhoneNo')}
          error={!!errors.strPhoneNo}
          helperText={errors.strPhoneNo?.message}
        />
      </Box>

      <Box>
        <Button
          type="button"
          onClick={onCancel}
          variant="outlined"
          color="secondary"
          sx={{ marginRight: 1 }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          {contact?.intId ? 'Update' : 'Add'} 
        </Button>
      </Box>
    </form>
  );
}
