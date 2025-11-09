# Automation Monitor Exercise

A web application for monitoring scheduled automations with both frontend (React) and backend (Django) implementations.

## Project Structure

```
cargoful_exercise/
├── backend/          # Django REST API
├── frontend/         # React application
└── README.md
```

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create migrations:
```bash
python manage.py makemigrations
```

5. Run migrations:
```bash
python manage.py migrate
```

6. Populate the database with sample data:
```bash
python populate_db.py
```

7. Start the development server:
```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000`

## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

- `GET /api/automations/` - List all automations
- `POST /api/automations/` - Create a new automation
- `GET /api/automations/stats/` - Get statistics (total, active, success rate)
- `GET /api/automations/today_schedule/` - Get today's scheduled automations
- `GET /api/automations/yesterday_runs/` - Get yesterday's automation runs

## Features

### Frontend
- Dashboard with welcome message and create button
- KPI cards: Total Automations, Active Schedules, Success Rate
- Today's Schedule list
- Yesterday's Runs list
- Searchable automation table
- Filter by active status (click Active Schedules card)
- Filter by success (click Success Rate card)
- Create automation modal with form
- Update automation model with form
- Delete automation

### Backend
- RESTful API with Django REST Framework
- SQLite database
- CRUD operations for automations
- Custom endpoints for statistics and filtered views

## Database

The SQLite database file (`db.sqlite3`) is created in the backend directory after running migrations. Sample data is populated using `populate_db.py`.

