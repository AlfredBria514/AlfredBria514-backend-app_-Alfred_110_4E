# Backend App Microservices

This project contains the backend services for the application, built with Next.js and containerized using Docker.

## Services

*   **`user-service`**: Handles user-related operations.
*   **`siswa-service`**: Handles student (siswa) related operations.

## Getting Started

To run this project locally, you can use Docker Compose.

```bash
docker-compose up -d --build
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

This will start both services and the associated databases.
Open http://localhost:3001 and  http://localhost:3003 with your browser to see the result.
## Learn More

*   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
*   [Docker Documentation](https://docs.docker.com/) - learn about containerization.
