# TaskFlow

A minimalist daily task tracker with drag-and-drop prioritization and progress visualization.

![TaskFlow Preview](https://via.placeholder.com/800x400?text=TaskFlow+Preview)

## ✨ Features

- **Drag-and-Drop Prioritization**: Easily move tasks between Urgent, Important, and Later columns
- **Redux-Powered State**: Robust task management with add, edit, delete, and complete actions
- **Progress Visualization**: Daily progress bar with smooth Tailwind CSS animations
- **Persistent Storage**: Tasks are saved to localStorage automatically
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Project Structure

```
taskflow/
├── src/
│   ├── components/
│   │   ├── TaskCard.jsx      # Individual task component
│   │   ├── TaskColumn.jsx    # Priority column container
│   │   └── ProgressBar.jsx   # Daily progress visualization
│   ├── context/
│   │   └── DragDropContext.jsx # Drag and drop state management
│   ├── store/
│   │   └── taskSlice.js      # Redux slice for tasks
│   ├── App.jsx               # Main application component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles with Tailwind
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 📖 Usage

### Adding a Task

1. Type your task in the input field at the top
2. Select the priority level (Urgent, Important, or Later)
3. Press Enter or click the Add button

### Managing Tasks

- **Complete**: Click the checkbox to mark a task as done
- **Edit**: Click the edit icon to modify task text
- **Delete**: Click the trash icon to remove a task
- **Reprioritize**: Drag and drop tasks between columns

### Progress Tracking

The progress bar at the top shows your daily completion percentage. It updates in real-time as you complete tasks.

## 🛠️ Tech Stack

- **React 18** - UI library
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **HTML5 Drag and Drop API** - Native drag and drop

## 🎨 Customization

### Tailwind Configuration

Modify `tailwind.config.js` to customize colors, animations, and other design tokens.

### Adding New Priority Levels

1. Update the `PRIORITIES` array in `src/store/taskSlice.js`
2. Add corresponding column styling in `TaskColumn.jsx`

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the Eisenhower Matrix for task prioritization
- Built with modern React best practices
- Designed for simplicity and ease of use

---

Made with ❤️ by the TaskFlow Team