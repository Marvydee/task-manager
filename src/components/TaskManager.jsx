import { useReducer, useState, useRef, useEffect } from "react";
import {
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  GripVertical,
  Flag,
  Calendar,
  LayoutList,
  CheckCheck,
  Clock3,
  ChevronDown,
  BarChart3,
  Flame,
  AlertCircle,
  ArrowDownCircle,
  Tag,
} from "lucide-react";
import styles from "../style";
import INITIAL_TASKS from "../utils/data";
import { todayStr, formatDate, isOverdue } from "../utils/helpers";
import taskReducer from "../utils/reducer";

// ─── PRIORITY CONFIG ──────────────────────────────────────────────────────────
const PRIORITIES = {
  high: { label: "High", icon: <Flame size={12} />, color: "#c0392b" },
  medium: {
    label: "Medium",
    icon: <AlertCircle size={12} />,
    color: "#d35400",
  },
  low: { label: "Low", icon: <ArrowDownCircle size={12} />, color: "#1a4a7a" },
};

export default function TaskManager() {
  // useReducer takes (reducerFn, initialState) and returns [state, dispatch]
  // dispatch({ type: "ACTION", ...payload }) triggers the reducer
  const [tasks, dispatch] = useReducer(taskReducer, INITIAL_TASKS);

  // Local state for the form fields only — form state is simple, no need for reducer
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [tag, setTag] = useState("work");
  const [filter, setFilter] = useState("all");

  // Drag state — tracks which card is being dragged and which it's hovering over
  const dragFrom = useRef(null);
  const dragTo = useRef(null);

  const inputRef = useRef(null);

  console.log(tasks);
  // Focus the input on mount — quality of life
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // ── ADD TASK ─────────────────────────────────────────────────────────────
  function handleAdd() {
    if (!text.trim()) return;
    dispatch({
      type: "ADD",
      task: {
        id: Date.now(), // simple unique id using timestamp
        text: text.trim(),
        done: false,
        priority,
        dueDate,
        tag,
      },
    });
    // Reset form fields after adding
    setText("");
    setDueDate("");
    setPriority("medium");
    inputRef.current?.focus();
  }

  function handleKey(e) {
    if (e.key === "Enter") handleAdd();
  }

  // ── DRAG AND DROP ─────────────────────────────────────────────────────────
  // HTML5 drag API — no library needed
  function onDragStart(index) {
    dragFrom.current = index; // store which card we grabbed
  }
  function onDragEnter(index) {
    dragTo.current = index; // update as we hover over different cards
  }
  function onDragEnd() {
    // Only reorder if we actually moved to a different position
    if (
      dragFrom.current !== null &&
      dragTo.current !== null &&
      dragFrom.current !== dragTo.current
    ) {
      dispatch({ type: "REORDER", from: dragFrom.current, to: dragTo.current });
    }
    dragFrom.current = null;
    dragTo.current = null;
  }

  // ── FILTER LOGIC ─────────────────────────────────────────────────────────
  // Derived values — computed from tasks array, no extra state needed
  const filtered = tasks.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    if (filter === "overdue") return isOverdue(t);
    return true; // "all"
  });

  const totalDone = tasks.filter((t) => t.done).length;
  const totalActive = tasks.filter((t) => !t.done).length;
  const totalOverdue = tasks.filter((t) => isOverdue(t)).length;
  const pct = tasks.length ? Math.round((totalDone / tasks.length) * 100) : 0;

  // Today's date formatted for the header
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{styles}</style>
      <div className="app">
        {/* ── Header ── */}
        <div className="header">
          <div className="header-left">
            <h1>
              <em>manage your</em>
              Tasks
            </h1>
          </div>
          <div className="header-date">
            <div>{today}</div>
            <div style={{ color: "var(--faint)", fontSize: "0.7rem" }}>
              {totalActive} remaining · {totalDone} done
            </div>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className="stats-strip">
          {[
            {
              label: "Total",
              val: tasks.length,
              icon: <LayoutList size={11} />,
              cls: "",
            },
            {
              label: "Active",
              val: totalActive,
              icon: <Clock3 size={11} />,
              cls: "active",
            },
            {
              label: "Done",
              val: totalDone,
              icon: <CheckCheck size={11} />,
              cls: "done",
            },
            {
              label: "Overdue",
              val: totalOverdue,
              icon: <Flag size={11} />,
              cls: "overdue",
            },
          ].map((s) => (
            <div className="stat-cell" key={s.label}>
              <div className="stat-cell-label">
                {s.icon} {s.label}
              </div>
              <div className={`stat-cell-num ${s.cls}`}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* ── Progress bar ── */}
        {tasks.length > 0 && (
          <div className="progress-wrap">
            <div className="progress-label">
              <span>
                <BarChart3 size={11} style={{ verticalAlign: "middle" }} />{" "}
                Progress
              </span>
              <span>{pct}% complete</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}

        {/* ── Add task form ── */}
        <div className="add-form">
          <div className="add-form-header">
            <Plus size={13} /> New Task
          </div>
          <div className="add-form-body">
            <input
              ref={inputRef}
              className="task-input"
              type="text"
              placeholder="What needs to be done..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKey}
              maxLength={120}
            />

            <div className="form-controls">
              {/* Priority selector */}
              <div className="select-wrap">
                <Flag size={13} />
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <ChevronDown size={13} className="chevron" />
              </div>

              {/* Tag selector */}
              <div className="select-wrap">
                <Tag size={13} />
                <select value={tag} onChange={(e) => setTag(e.target.value)}>
                  <option value="work">Work</option>
                  <option value="learning">Learning</option>
                  <option value="social">Social</option>
                  <option value="personal">Personal</option>
                </select>
                <ChevronDown size={13} className="chevron" />
              </div>

              {/* Due date — wraps the native date input with an icon */}
              <div className="select-wrap">
                <Calendar size={13} />
                <input
                  className="date-input"
                  type="date"
                  value={dueDate}
                  min={todayStr()} // can't set a due date in the past
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              <button
                className="add-btn"
                onClick={handleAdd}
                disabled={!text.trim()}
              >
                <Plus size={14} /> Add
              </button>
            </div>
          </div>
        </div>

        {/* ── Filter tabs ── */}
        <div className="filter-tabs">
          {[
            {
              key: "all",
              label: "All",
              count: tasks.length,
              icon: <LayoutList size={12} />,
            },
            {
              key: "active",
              label: "Active",
              count: totalActive,
              icon: <Clock3 size={12} />,
            },
            {
              key: "done",
              label: "Done",
              count: totalDone,
              icon: <CheckCheck size={12} />,
            },
            {
              key: "overdue",
              label: "Overdue",
              count: totalOverdue,
              icon: <Flag size={12} />,
            },
          ].map((t) => (
            <button
              key={t.key}
              className={`tab ${filter === t.key ? "active" : ""}`}
              onClick={() => setFilter(t.key)}
            >
              {t.icon} {t.label}
              <span className="tab-count">{t.count}</span>
            </button>
          ))}
        </div>

        {/* ── Task list ── */}
        <div className="task-list">
          {filtered.length === 0 ? (
            <div className="empty">
              <CheckCircle2 size={44} />
              <h3>
                {filter === "done"
                  ? "Nothing Done Yet"
                  : filter === "overdue"
                    ? "No Overdue Tasks"
                    : "All Clear"}
              </h3>
              <p>
                {filter === "all"
                  ? "Add a task above to get started."
                  : filter === "active"
                    ? "No active tasks — great work!"
                    : filter === "overdue"
                      ? "You're on top of everything."
                      : "Complete some tasks to see them here."}
              </p>
            </div>
          ) : (
            filtered.map((task, index) => {
              const overdue = isOverdue(task);
              return (
                <div
                  key={task.id}
                  className={`task-card ${task.priority} ${task.done ? "done" : ""}`}
                  /* HTML5 Drag events — fired on the draggable element */
                  draggable
                  onDragStart={() => onDragStart(index)}
                  onDragEnter={() => onDragEnter(index)}
                  onDragEnd={onDragEnd}
                  onDragOver={(e) => e.preventDefault()} // required to allow drop
                >
                  {/* Grip handle */}
                  <div className="grip">
                    <GripVertical size={14} />
                  </div>

                  {/* Check / uncheck button */}
                  <button
                    className={`check-btn ${task.done ? "checked" : ""}`}
                    onClick={() => dispatch({ type: "TOGGLE", id: task.id })}
                    title={task.done ? "Mark incomplete" : "Mark complete"}
                  >
                    {task.done ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <Circle size={18} />
                    )}
                  </button>

                  {/* Task text + meta row */}
                  <div className="task-content">
                    <div className="task-text">{task.text}</div>
                    <div className="task-meta">
                      {/* Tag */}
                      <span className="task-meta-item">
                        <Tag size={10} /> {task.tag}
                      </span>
                      {/* Due date — red + "Overdue" label if past */}
                      {task.dueDate && (
                        <span
                          className={`task-meta-item ${overdue ? "overdue" : ""}`}
                        >
                          <Calendar size={10} />
                          {overdue ? "Overdue · " : ""}
                          {formatDate(task.dueDate)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Priority badge — pulls icon and label from PRIORITIES config */}
                  <div className="priority-badge">
                    <span className={`badge ${task.priority}`}>
                      {PRIORITIES[task.priority].icon}
                      {PRIORITIES[task.priority].label}
                    </span>
                  </div>

                  {/* Delete button */}
                  <button
                    className="del-btn"
                    onClick={() => dispatch({ type: "DELETE", id: task.id })}
                    title="Delete task"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* ── Footer ── */}
        {tasks.length > 0 && (
          <div className="footer-bar">
            <span>
              {tasks.length} task{tasks.length !== 1 ? "s" : ""} total
            </span>
            {totalDone > 0 && (
              <button
                className="clear-btn"
                onClick={() => dispatch({ type: "CLEAR_DONE" })}
              >
                <Trash2
                  size={11}
                  style={{ verticalAlign: "middle", marginRight: 4 }}
                />
                Clear {totalDone} completed
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
