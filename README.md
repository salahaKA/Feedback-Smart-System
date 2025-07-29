# 🧠 FeedSmart – AI-Powered Feedback System

FeedSmart is a full-stack web application that collects user feedback and analyzes sentiment using natural language processing. Built using **React.js (MUI)** on the frontend and **Django + Django REST Framework + TextBlob** on the backend.

---

## 🔧 Tech Stack

### 🖥️ Frontend:
- React.js
- MUI (Material-UI)
- Axios

### ⚙️ Backend:
- Python
- Django
- Django REST Framework
- TextBlob (for Sentiment Analysis)

### 🛢️ Database:
- SQLite (default, can be changed to PostgreSQL/MySQL)

---

## 🚀 Features

- Collect feedback with name and comment
- Analyze sentiment: Positive / Neutral / Negative
- Display submitted feedback with sentiment
- Responsive and modern UI with MUI components

## 📁 Project Structure

``` bash
feedSmart/
│
├── backend/
│ ├── feedsmart/ ← Django project
│ ├── feedback/ ← Django app
│ ├── manage.py
│ └── venv/ ← Python virtual environment
│
└── frontend/
└── feedsmart-frontend/ ← React project
├── src/
├── public/
└── package.json

```


## 🛠️ Setup Instructions


### ⚙️ Backend Setup (Django)

```bash
cd backend
python -m venv venv
source venv/Scripts/activate    # Windows
# or
source venv/bin/activate        # Mac/Linux

pip install django djangorestframework textblob corsheaders
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

```
### ⚙️ 🌐 Frontend Setup (React)
```bash

cd frontend
npx create-react-app feedsmart-frontend
cd feedsmart-frontend
npm install @mui/material @emotion/react @emotion/styled axios
npm start

```


📸 Screenshots
(Add screenshots here if needed – UI + API response preview)

📄 License
This project is licensed under the MIT License.

🙋‍♀️ Author
Kadeejath Salaha |
Full Stack Developer | Tech Enthusiast
