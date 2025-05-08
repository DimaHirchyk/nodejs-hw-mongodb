import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import { getAllContacts, getContactById } from './servis/contacts.js';

const PORT = Number(getEnvVar('PORT', '8080'));

export const setupServer = async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.send("It's work");
  });

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.status(200).send.JSON.stringify(
        {
          status: 200,
          message: 'Successfully found contacts!',
          data: contacts,
        },
        undefined,
        2,
      );
    } catch (error) {
      console.error(error);
    }
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contact = await getContactById(contactId);

      if (!contact) {
        res.status(404).json({ message: 'Contact not found' });
        return;
      }

      res.status(200).send.JSON.stringify(
        {
          status: 200,
          message: `Successfully found contact with id ${contactId}!`,
          data: contact,
        },
        undefined,
        2,
      );
    } catch (error) {
      console.error(error);
    }
  });

  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Not found this contact',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
