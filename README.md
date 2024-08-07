# BlogSite
Welcome to BlogSite, a full-featured blog platform built with modern web technologies. This project includes both frontend and backend components, designed for creating, managing, and exploring blog posts.

## 🛠️ Technologies Used
### Frontend
- React.js: A JavaScript library for building user interfaces.
- Tailwind CSS: A utility-first CSS framework for rapidly building custom designs.
- Tailwind Components: Pre-built components used for faster development.
- Material-UI: React components for faster and easier web development. Includes a wide range of icons and components.
- Flaticon: Icons used for various actions like read, update, delete, and explore.
### Backend
- Node.js: JavaScript runtime built on Chrome's V8 JavaScript engine.
- Express.js: Web framework for Node.js, used to build the backend API.
### Deployment
- Vercel: Platform used for deploying the frontend of the application.
- Render: Used for deploying the backend of the application.
## 💻 Features
### Frontend
- Blog Cards: Display blog posts in an organized card format with options to read more, update, or delete.
- User Authentication: Secure user authentication for creating and managing blog posts.
- Dynamic Content: Blog content is dynamically loaded and updated.
### Backend
- CRUD Operations: Create, Read, Update, Delete operations for managing blog posts.
- User Authentication: Secure routes for managing blog posts with password hashing.
## 🚀 Getting Started
### Prerequisites
1. Node.js (v14.x or higher)
'''
npm or yarn
Installation'''

2. Clone the repository


'''
git clone https://github.com/Aman-bhai/BlogDaily/
cd blogsite
'''
3. Install dependencies

- For the frontend:

'''
bash
Copy code
cd frontend
npm install'''

- For the backend:


```
cd backend
npm install
Set up environment variables```

Create a .env file in the backend directory with the following variables:

bash
Copy code
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
Run the development server

For the frontend:

bash
Copy code
npm start
For the backend:

bash
Copy code
npm run dev
Open the application

Visit http://localhost:3000 to view the frontend and http://localhost:5000 for the backend API.

🚢 Deployment
Frontend
The frontend of this project is deployed on Vercel. To deploy your own version:

Push your repository to GitHub.
Connect your GitHub account to Vercel.
Select your repository and deploy.
Backend
The backend is deployed on Render. To deploy:

Push your backend code to GitHub.
Connect your GitHub account to Render.
Select your repository, and follow the instructions to deploy.
📦 Folder Structure
bash
Copy code
blogsite/
│
├── frontend/          # Frontend code
│   ├── public/        # Public assets
│   ├── src/           # Source files
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── ...            # Other configuration files
│
├── backend/           # Backend code
│   ├── models/        # Mongoose models
│   ├── routes/        # Express routes
    ├── config/        # Configuration files (e.g., database)
│   └── ...            # Other backend files
│   
│   
│  
│
├── .gitignore         # Files to be ignored by Git
├── README.md          # This README file
└── package.json       # Project metadata and dependencies
