# ProjectFlow - Frontend

A modern, responsive project management application built with React, TypeScript, Redux Toolkit, and Tailwind CSS.

## 🚀 Features

- **Dashboard**: Comprehensive overview of projects, tasks, and team metrics
- **Project Management**: Create, edit, and track projects with progress visualization
- **Task Management**: 
  - Multiple views (Table, Kanban, List)
  - Drag-and-drop task status updates
  - Priority and status tracking
  - Tag management
- **Team Management**: Organize teams and manage team members
- **Calendar View**: Timeline and chronological event management
- **Dark Mode Support**: Beautiful UI in both light and dark themes
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Updates**: Redux state management for instant UI updates

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Aceternity UI
- **Icons**: Lucide React & Tabler Icons
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Type Safety**: Full TypeScript support

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Backend API running (see [Backend Repository](https://github.com/PathumRathnayaka/ProjectFlow-Express.js-back-end))

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/PathumRathnayaka/ProjectFlow-Frontend.git
cd ProjectFlow-Frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://project-flow-express-js-back-end.vercel.app/api/v1/projectflow
```

Or for local development:
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1/projectflow
```

4. **Run the development server**
```bash
npm run dev
```

The application will start at `http://localhost:5173`

## 📁 Project Structure

```
ProjectFlow-Frontend/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx         # Dashboard overview
│   │   ├── Projects.tsx          # Projects management
│   │   ├── Tasks.tsx             # Tasks management
│   │   ├── Teams.tsx             # Teams management
│   │   ├── Calendar.tsx          # Calendar view
│   │   ├── KanbanBoard.tsx       # Kanban board view
│   │   ├── Sidebar.tsx           # Navigation sidebar
│   │   ├── modals/
│   │   │   ├── ProjectModal.tsx  # Project create/edit modal
│   │   │   ├── TaskModal.tsx     # Task create/edit modal
│   │   │   ├── TeamModal.tsx     # Team create/edit modal
│   │   │   └── UserModal.tsx     # User create/edit modal
│   │   └── ui/
│   │       └── sidebar.tsx       # Sidebar UI components
│   ├── store/
│   │   ├── index.ts              # Redux store configuration
│   │   ├── api/
│   │   │   └── apiService.ts     # API service functions
│   │   └── slices/
│   │       ├── projectsSlice.ts  # Projects state
│   │       ├── tasksSlice.ts     # Tasks state
│   │       ├── teamsSlice.ts     # Teams state
│   │       ├── uiSlice.ts        # UI state
│   │       └── calendarSlice.ts  # Calendar state
│   ├── lib/
│   │   └── utils.ts              # Utility functions
│   ├── App.tsx                   # Main app component
│   ├── main.tsx                  # App entry point
│   └── index.css                 # Global styles
├── .env                          # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## 🎨 Key Features Breakdown

### Dashboard
- Project statistics and metrics
- Recent task activity
- Upcoming deadlines
- Project progress visualization
- Team overview

### Projects
- Grid view of all projects
- Filter by status (Active, On-Hold, Completed, Archived)
- Search functionality
- Progress tracking
- Team and owner assignment

### Tasks
- **Table View**: Detailed task list with sorting
- **Kanban View**: Drag-and-drop board with 5 columns (New, Scheduled, In Progress, Completed, Blocked)
- **List View**: Compact task overview
- Priority levels (Low, Medium, High, Urgent)
- Tag management
- Time tracking (estimated vs actual hours)

### Teams
- Team creation and management
- Member assignment with roles (Admin, Manager, Member, Viewer)
- Department organization
- Active/Inactive status tracking
- Email invitation system

### Calendar
- Monthly calendar view
- Event chronology timeline
- Event filtering by date
- Multiple event types (Instagram Post, Website, Pricing Page, Presentation, Platform, Design)
- Status tracking (Completed, In Progress, Upcoming)

## 🌐 API Integration

The frontend communicates with the backend through Axios HTTP client. All API calls are centralized in `src/store/api/apiService.ts`.

### API Service Functions

**Teams**
```typescript
getAllTeams()
createTeam(data)
updateTeam(id, data)
deleteTeam(id)
```

**Members**
```typescript
getAllMembers()
createMember(data)
updateMember(id, data)
deleteMember(id)
```

**Projects**
```typescript
getAllProjects()
createProject(data)
updateProject(id, data)
deleteProject(id)
```

**Tasks**
```typescript
getAllTasks()
createTask(data)
updateTask(id, data)
deleteTask(id)
```

## 🎨 Styling

The application uses Tailwind CSS for styling with custom configurations:

- **Colors**: Custom color palette with dark mode support
- **Responsive**: Mobile-first design approach
- **Animations**: Smooth transitions using Framer Motion
- **Components**: Reusable UI components with consistent styling

## 🚀 Deployment

### Deploy to Vercel

1. **Push your code to GitHub**

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository

3. **Configure Environment Variables**
   - Add `VITE_API_BASE_URL` in Vercel project settings

4. **Deploy**
   - Vercel will automatically build and deploy

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## 🧪 Available Scripts

```bash
npm run dev        # Run development server
npm run build      # Build for production
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
```

## 🎯 Usage Examples

### Creating a New Task

1. Navigate to the Tasks page
2. Click "Create Task" button
3. Fill in the task details:
   - Title and description
   - Select project
   - Assign to team member
   - Set priority and due date
   - Add tags
4. Click "Create Task"

### Managing Projects

1. Go to Projects page
2. Click on a project card to view details
3. Use "Edit" to modify project information
4. Track progress with the visual progress bar
5. Filter projects by status

### Kanban Board

1. Switch to Kanban view in Tasks
2. Drag tasks between columns to update status
3. Click on a task to edit details
4. Use the "+" button in each column to create tasks

## 🔒 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `https://your-backend.vercel.app/api/v1/projectflow` |

## 🐛 Troubleshooting

### CORS Errors
- Ensure your backend allows requests from your frontend domain
- Check backend CORS configuration

### API Connection Issues
- Verify `VITE_API_BASE_URL` is correct in `.env`
- Check if backend server is running
- Inspect network requests in browser DevTools

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`
- Check for TypeScript errors: `npm run build`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Pathum Rathnayaka**
- GitHub: [@PathumRathnayaka](https://github.com/PathumRathnayaka)

## 🔗 Related Projects

- [ProjectFlow Backend](https://github.com/PathumRathnayaka/ProjectFlow-Express.js-back-end) - Express.js + MongoDB backend

## 🙏 Acknowledgments

- [Aceternity UI](https://ui.aceternity.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [Lucide Icons](https://lucide.dev/) for beautiful icons

## 📞 Support

For support, email thilinapathumrathnayaka@gmail.com or open an issue in the repository.

---

Made with ❤️ by Pathum Rathnayaka
