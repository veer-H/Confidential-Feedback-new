This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

SecretFeedback
Problem Statement
In professional and personal environments, providing honest feedback can often be hindered by social barriers. People are hesitant to share their true thoughts for fear of offending others or facing repercussions. This lack of genuine feedback can stunt personal and professional growth.

Key Features
Anonymous Feedback: Users can give and receive feedback without revealing their identity, encouraging honesty.

User-Controlled Notifications: Users can control when they want to receive feedback messages.

Accessible and Free: Completely free to use, making it accessible to everyone.

Open Source: Promotes transparency and allows community contributions.

Application Architecture
Frontend: Built with Next.js, providing a modern and responsive user interface.

Backend: Uses Node.js and Express.js for handling API requests and business logic.

Database: MongoDB for storing user data, feedback messages, and configurations.

Authentication: Utilizes next-auth for secure user authentication and session management.

Deployment: Deployed on Azure Web App Services, ensuring scalability and reliability.

Technology Stack
Frontend: Next.js, React, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB

Authentication: next-auth

Deployment: Azure Web App Services

Utilities: Axios for API calls, Zod for schema validation, React Hook Form for form management

Usage
Sign Up/Login: Users sign up or log in using their credentials.

Shareable Link: After logging in, users receive a shareable link to collect feedback.

Provide Feedback: Anyone with the link can provide anonymous feedback.

View Feedback: Users can view feedback messages in their dashboard.

How to Run Locally
Clone the Repository:

sh

Copy
git clone <repository-url>
cd SecretFeedback
Install Dependencies:

sh

Copy
npm install
Set Up Environment Variables: Create a .env.local file and add necessary environment variables.

Run the Development Server:

sh

Copy
npm run dev
Build for Production:

sh

Copy
npm run build
npm start
Contributing
We welcome contributions from the community. Please fork the repository and submit a pull request with your changes.

License
SecretFeedback is open-source and available under the MIT License.

Feel free to expand or adjust any sections to better fit your project specifics! 🚀
