#!/bin/bash
docker run -d -p 27017:27017 --name test-mongo -v mongo-data:/data/db -e MONGODB_INITDB_ROOT_USERNAME=root -e MONGODB_INITDB_ROOT_PASSWORD=1234 mongo:latest

kill -9 $(lsof -ti:3000)
cd server && npm run start &
kill -9 $(lsof -ti:8000)
cd ../client && npm run start &
