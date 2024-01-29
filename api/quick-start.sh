# Install dependencies (I didnt fix dependency issues yet)
npm install --legacy-peer-deps

# Run docker containers to build MongoDB
docker-compose up -d

# Run seed script to populate MongoDB
ts-node ./src/fixtures/seed

# Open GraphQL client
open http://localhost:3005/graphql

# Run the server
npm run start:dev