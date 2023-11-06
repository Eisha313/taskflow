# TaskFlow

A minimalist daily task tracker with drag-and-drop prioritization and progress visualization.

![TaskFlow Preview](https://via.placeholder.com/800x400/1a1a2e/eee?text=TaskFlow+Preview)

## ✨ Features

### 🎯 Priority-Based Organization
Organize your tasks into three priority columns:
- **Urgent** - Tasks that need immediate attention
- **Important** - Tasks that matter but aren't time-critical
- **Later** - Tasks to tackle when you have time

### 🖱️ Drag and Drop
Easily reprioritize tasks by dragging them between columns. The intuitive interface makes task management effortless.

### 📊 Progress Visualization
Track your daily productivity with a real-time progress bar that shows your completion percentage with smooth Tailwind CSS animations.

### 💾 Persistent Storage
Your tasks are automatically saved to localStorage, so you never lose your progress.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
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

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Tech Stack

- **React 18** - UI library
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Vite** - Build tool and dev server
- **localStorage** - Data persistence

## 📁 Project Structure

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
│   ├── main.jsx              # Application entry point
│   └── index.css             # Global styles and Tailwind
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎮 Usage

### Adding a Task
1. Type your task in the input field at the top of any column
2. Press Enter or click the Add button
3. The task will appear in the selected priority column

### Moving Tasks
- Click and drag a task card
- Drop it in any priority column to reprioritize
- Tasks can be reordered within the same column

### Completing Tasks
- Click the checkbox on any task to mark it complete
- Completed tasks contribute to your daily progress percentage

### Editing Tasks
- Double-click on a task to edit its text
- Press Enter or click outside to save changes

### Deleting Tasks
- Click the delete (×) button on any task card

## 🎨 Customization

### Tailwind Configuration
Modify `tailwind.config.js` to customize colors, animations, and other design tokens.

### Adding New Priority Levels
1. Add the new priority to the `priorities` array in `taskSlice.js`
2. Create styling for the new column in `index.css`

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the Eisenhower Matrix for task prioritization
- Built with modern React patterns and best practices
- Styled with the amazing Tailwind CSS framework

---

Made with ❤️ for productivity enthusiasts