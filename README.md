# FrontForge

I made FrontForge to keep frontend examples, notes, and links in one place. I can save examples, search them, and preview some of them in different screen sizes.

## What it can do

- Save and search components and animations
- Keep notes, links, and favorite items
- Preview HTML and CSS examples
- Show examples in desktop, tablet, and mobile sizes
- Save data in MongoDB

Some previews use saved HTML and CSS in a separate frame. React examples use previews that are part of the app.

## Tools used

React, Vite, React Router, Tailwind CSS, Motion, GSAP, Node.js, Express, MongoDB

## Run it on your computer

The project was checked with Node.js 24.

In one terminal:

```bash
cd backend
npm ci
copy src\.env.example .env
npm run dev
```

Add your MongoDB address to `backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
```

In a second terminal:

```bash
cd frontend
npm ci
copy .env.example .env
npm run dev
```

The website usually runs at `http://localhost:5173`. The API usually runs at `http://localhost:5000`.

Keep your database connection details private.
