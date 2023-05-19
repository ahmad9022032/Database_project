import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors'
const prisma = new PrismaClient();
const app = express();
app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.post('/blood_donation', async (req, res) => {
    const { name, phone_number, email, address } = req.body;
  
    try {
      const bloodDonor = await prisma.donor.create({
        data: {
          name,
          phone_number,
          email,
          address,
        },
      });
  
      res.json(bloodDonor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating blood donor' });
    }
  });
  app.post('/patients', async (req, res) => {
    console.log(req.body)
    const { name, date_of_birth, blood_group, phone_number, email, hospital_id } = req.body;
  
    try {
      const patient = await prisma.patient.create({
        data: {
          name,
          date_of_birth,
          blood_group,
          phone_number,
          email,
          hospital_id: hospital_id ? parseInt(hospital_id) : undefined,
        },
      });
  
      res.json(patient);
    } catch (error) {
        console.log(error)
      console.error(error);
      console
      res.status(500).json({ error: 'Error creating patient' });
    }
  });
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
