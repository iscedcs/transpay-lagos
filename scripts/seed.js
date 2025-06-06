const { sql } = require('@vercel/postgres');
import { vehicles } from '../src/lib/data.js';

// sonsole.log({
//   POSTGRES_URL: process.env.POSTGRES_URL,
//   POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
//   VEHICLE: vehicles
// });


async function seedVehicles() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "invoices" table if it doesn't exist
    const createTable = await sql`
      CREATE TABLE IF NOT EXISTS interstate (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        plate VARCHAR(255) NOT NULL UNIQUE,
        ownername VARCHAR(255) NOT NULL,
        owneraddress VARCHAR(255) NOT NULL,
        ischeckedin BOOLEAN NOT NULL,
        checkintime TIMESTAMP,
        checkouttime TIMESTAMP
      );
    `;

    // sonsole.log(`Created "vehicles" table`);

    // Insert data into the "users" table
    const insertedVehicles = await Promise.all(
      vehicles.map(async (vehicle) => {
        return sql`
        INSERT INTO interstate (id, plate, ownername, owneraddress, ischeckedin, checkintime, checkouttime)
        VALUES (
          ${vehicle.id},
          ${vehicle.plate},
          ${vehicle.ownername},
          ${vehicle.owneraddress},
          ${vehicle.ischeckedin},
          ${null},
          ${null}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    // sonsole.log(`Seeded ${insertedVehicles.length} vehicles`);

    return {
      createTable,
      vehicles: insertedVehicles,
    };
  } catch (error) {
    // sonsole.error('Error seeding vehicles:', error);
    throw error;
  }
}

(async () => {
  await seedVehicles();
})();
