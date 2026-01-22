# Employee Management System V2 🚀

**Employee Management System V2** is a full-stack web application designed to efficiently manage employee records. It features a **Django REST Framework backend** and a **React (Vite) frontend** for a modern, responsive user interface.

---

## Features

- **CRUD Operations:** Create, Read, Update, and Delete employee profiles.
- **RESTful API:** Clean and documented endpoints.
- **Responsive UI:** Optimized for desktop and mobile devices.
- **Secure Backend:** Production-ready configuration on PythonAnywhere.

---

## Tech Stack

| Component  | Technology |
|------------|------------|
| Frontend   | React.js, Vite, Axios, Tailwind CSS |
| Backend    | Python, Django, Django REST Framework |
| Database   | SQLite (Development & Production) |
| Hosting    | PythonAnywhere (Backend), Vercel (Frontend) |

---

## Project Structure

```
Employee-Management-v2/
├── backend/                 # Django Project
│   ├── EmployeeManagement/  # Settings & WSGI
│   ├── employees/           # Employee App (Models, Views, Serializers)
│   ├── manage.py
│   └── requirements.txt
└── frontend/                # React Project
    └── frontend/            # React App (Vite)
        ├── src/
        ├── public/
        └── package.json
```

> **Note:** The React frontend is located at `frontend/frontend`.

---

## Setup & Installation

### 1. Backend Setup (Django)

```bash
cd backend
python -m venv env
source env/bin/activate        # Windows: .\env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

- The API will run at: `http://127.0.0.1:8000/`

---

### 2. Frontend Setup (React + Vite)

```bash
cd frontend/frontend
npm install
npm run dev
```

- The app will run at: `http://localhost:5173/`

> **Important:** Make sure to update your `.env` file to point to the backend API when testing locally:

```
VITE_API_URL=http://127.0.0.1:8000/api
```

---

## Deployment

### Backend (PythonAnywhere)

- Hosted at: `https://employeemanagement.pythonanywhere.com/`
- WSGI Path: `/home/employeemanagement/Employee-Management-v2/backend`
- Static files served via `/static/` mapping in the Web tab.

### Frontend (Vercel)

- Hosted on Vercel and connected to the production API via environment variables.  
- Example `.env` for production:

```
VITE_API_URL=https://employeemanagement.pythonanywhere.com/api
```

> Make sure the frontend is redeployed after updating environment variables on Vercel.

---

## Environment Variables

### Frontend (`.env`)

```
VITE_API_URL
```


---

## License

This project is licensed under the MIT License.
