import { todayStr } from "./helpers";

const INITIAL_TASKS = [
  {
    id: 1,
    text: "Deploy portfolio to Vercel",
    done: false,
    priority: "high",
    dueDate: todayStr(),
    tag: "work",
  },
  {
    id: 2,
    text: "Push GitHub Finder project to repo",
    done: false,
    priority: "high",
    dueDate: todayStr(),
    tag: "work",
  },
  {
    id: 3,
    text: "Write LinkedIn post for Weather Dashboard",
    done: true,
    priority: "medium",
    dueDate: "",
    tag: "social",
  },
  {
    id: 4,
    text: "Review React useReducer docs",
    done: false,
    priority: "medium",
    dueDate: "",
    tag: "learning",
  },
  {
    id: 5,
    text: "Add dark mode to portfolio",
    done: false,
    priority: "low",
    dueDate: "",
    tag: "work",
  },
];

export default INITIAL_TASKS;
