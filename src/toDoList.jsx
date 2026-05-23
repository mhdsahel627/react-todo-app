import { useState } from 'react';

function ToDoList() {
  const [tasks, setTasks] = useState([{ text: 'Eat', completed: false }]);
  const [newTask, setNewTask] = useState('');

  function handleInputChange(event) { setNewTask(event.target.value); }

  function addTask() {
    if (newTask.trim() !== '') {
      setTasks(t => [...t, { text: newTask, completed: false }]);
      setNewTask('');
    }
  }

  function handleKeyDown(e) { if (e.key === 'Enter') addTask(); }

  function deleteTask(index) { setTasks(tasks.filter((_, i) => i !== index)); }

  function moveTaskUp(index) {
    if (index > 0) {
      const u = [...tasks];
      [u[index], u[index - 1]] = [u[index - 1], u[index]];
      setTasks(u);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const u = [...tasks];
      [u[index], u[index + 1]] = [u[index + 1], u[index]];
      setTasks(u);
    }
  }

  function toggleComplete(index) {
    const u = [...tasks];
    u[index].completed = !u[index].completed;
    setTasks(u);
  }

  const completed = tasks.filter(t => t.completed).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: linear-gradient(135deg, rgb(0, 0, 5) 0%, rgb(8, 30, 60) 50%, rgb(24, 84, 144) 100%);
          min-height: 100vh;
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        .app-shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 60px 20px 80px;
        }

        .card {
          width: 100%;
          max-width: 620px;
          background: linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
          border: 1px solid rgba(200, 170, 100, 0.25);
          border-radius: 2px;
          backdrop-filter: blur(12px);
          box-shadow: 0 0 0 1px rgba(200,170,100,0.08), 0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08);
          overflow: hidden;
        }

        .card-header {
          padding: 40px 44px 32px;
          border-bottom: 1px solid rgba(200, 170, 100, 0.18);
          background: linear-gradient(180deg, rgba(200,170,100,0.05) 0%, transparent 100%);
          text-align: center;
        }

        .ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .ornament-line {
          flex: 1;
          max-width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200,170,100,0.5));
        }

        .ornament-line.right {
          background: linear-gradient(90deg, rgba(200,170,100,0.5), transparent);
        }

        .ornament-diamond {
          width: 6px;
          height: 6px;
          background: rgba(200,170,100,0.7);
          transform: rotate(45deg);
        }

        h1 {
          font-family: 'Cinzel', serif;
          font-size: 2rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(220, 190, 120, 0.95);
          text-shadow: 0 0 40px rgba(200,170,100,0.3);
        }

        .subtitle {
          margin-top: 8px;
          font-size: 0.85rem;
          font-style: italic;
          color: rgba(180, 160, 130, 0.6);
          letter-spacing: 0.05em;
        }

        .progress-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 20px;
          justify-content: center;
        }

        .progress-bar-outer {
          width: 160px;
          height: 2px;
          background: rgba(255,255,255,0.08);
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-bar-inner {
          height: 100%;
          background: linear-gradient(90deg, rgba(200,170,100,0.6), rgba(220,190,140,0.9));
          border-radius: 2px;
          transition: width 0.5s ease;
        }

        .progress-text {
          font-family: 'Cinzel', serif;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          color: rgba(200, 170, 100, 0.6);
        }

        .card-body {
          padding: 32px 44px;
        }

        .input-row {
          display: flex;
          gap: 0;
          margin-bottom: 32px;
          border: 1px solid rgba(200, 170, 100, 0.3);
          border-radius: 2px;
          overflow: hidden;
          transition: border-color 0.3s ease;
        }

        .input-row:focus-within {
          border-color: rgba(200, 170, 100, 0.65);
          box-shadow: 0 0 0 3px rgba(200, 170, 100, 0.08);
        }

        .task-input {
          flex: 1;
          background: rgba(255,255,255,0.03);
          border: none;
          outline: none;
          padding: 14px 18px;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.05rem;
          font-weight: 300;
          color: rgba(230, 215, 185, 0.9);
          letter-spacing: 0.03em;
        }

        .task-input::placeholder {
          color: rgba(180, 160, 130, 0.35);
          font-style: italic;
        }

        .add-btn {
          background: linear-gradient(135deg, rgba(200,170,100,0.85), rgba(180,145,75,0.9));
          border: none;
          padding: 14px 24px;
          font-family: 'Cinzel', serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(10, 5, 0, 0.9);
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .add-btn:hover {
          background: linear-gradient(135deg, rgba(220,190,120,0.95), rgba(200,165,95,0.95));
        }

        .add-btn:active { transform: scale(0.98); }

        .section-label {
          font-family: 'Cinzel', serif;
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(200, 170, 100, 0.45);
          margin-bottom: 12px;
          padding-left: 2px;
        }

        .task-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .task-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(200, 170, 100, 0.12);
          border-radius: 2px;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }

        .task-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, rgba(200,170,100,0.5), rgba(200,170,100,0.15));
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .task-item:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(200, 170, 100, 0.25);
        }

        .task-item:hover::before { opacity: 1; }

        .task-item.done {
          background: rgba(200,170,100,0.04);
          border-color: rgba(200,170,100,0.08);
        }

        .task-item.done::before {
          opacity: 0.5;
          background: linear-gradient(180deg, rgba(200,170,100,0.3), transparent);
        }

        .custom-check {
          width: 18px;
          height: 18px;
          min-width: 18px;
          border: 1px solid rgba(200, 170, 100, 0.4);
          border-radius: 1px;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .custom-check:hover { border-color: rgba(200,170,100,0.7); }

        .custom-check.checked {
          background: rgba(200,170,100,0.15);
          border-color: rgba(200,170,100,0.6);
        }

        .check-mark {
          width: 10px;
          height: 10px;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .custom-check.checked .check-mark { opacity: 1; }

        .task-text {
          flex: 1;
          font-size: 1rem;
          font-weight: 300;
          color: rgba(220, 205, 175, 0.9);
          letter-spacing: 0.02em;
          line-height: 1.5;
          transition: all 0.3s ease;
          min-width: 0;
          word-break: break-word;
        }

        .task-text.done {
          text-decoration: line-through;
          color: rgba(180,165,140,0.4);
          font-style: italic;
        }

        .task-actions {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
          opacity: 0.5;
          transition: opacity 0.2s ease;
        }

        .task-item:hover .task-actions { opacity: 1; }

        .icon-btn {
          background: transparent;
          border: 1px solid transparent;
          border-radius: 2px;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: rgba(200, 170, 100, 0.55);
          font-size: 0.75rem;
          font-family: inherit;
        }

        .icon-btn:hover {
          background: rgba(200,170,100,0.08);
          border-color: rgba(200,170,100,0.2);
          color: rgba(200, 170, 100, 0.9);
        }

        .icon-btn.del:hover {
          background: rgba(160, 60, 40, 0.12);
          border-color: rgba(200, 80, 60, 0.25);
          color: rgba(220, 100, 80, 0.9);
        }

        .icon-btn:active { transform: scale(0.9); }

        .card-footer {
          padding: 16px 44px 28px;
          border-top: 1px solid rgba(200, 170, 100, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-note {
          font-size: 0.78rem;
          font-style: italic;
          color: rgba(180, 160, 130, 0.35);
          letter-spacing: 0.03em;
        }

        .empty-state {
          text-align: center;
          padding: 32px 0;
          color: rgba(180, 160, 130, 0.35);
          font-style: italic;
          font-size: 0.95rem;
          letter-spacing: 0.04em;
        }

        svg { display: block; }
      `}</style>

      <div className="app-shell">
        <div className="card">
          <div className="card-header">
            <div className="ornament">
              <div className="ornament-line"></div>
              <div className="ornament-diamond"></div>
              <div className="ornament-line right"></div>
            </div>
            <h1>Agenda</h1>
            <div className="subtitle">Your daily tasks, refined</div>
            {tasks.length > 0 && (
              <div className="progress-row">
                <span className="progress-text">{completed}/{tasks.length} complete</span>
                <div className="progress-bar-outer">
                  <div
                    className="progress-bar-inner"
                    style={{ width: `${tasks.length ? (completed / tasks.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="card-body">
            <div className="input-row">
              <input
                className="task-input"
                type="text"
                placeholder="Add a new task…"
                value={newTask}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <button className="add-btn" onClick={addTask}>Add</button>
            </div>

            {tasks.length > 0 && (
              <div className="section-label">Tasks — {tasks.length}</div>
            )}

            <ol className="task-list">
              {tasks.length === 0 && (
                <div className="empty-state">No tasks yet. Begin your agenda above.</div>
              )}
              {tasks.map((task, index) => (
                <li key={index} className={`task-item${task.completed ? ' done' : ''}`}>
                  <div
                    className={`custom-check${task.completed ? ' checked' : ''}`}
                    onClick={() => toggleComplete(index)}
                    role="checkbox"
                    aria-checked={task.completed}
                    tabIndex={0}
                    onKeyDown={e => e.key === ' ' && toggleComplete(index)}
                  >
                    <svg className="check-mark" viewBox="0 0 10 10" fill="none">
                      <polyline
                        points="1.5,5 4,7.5 8.5,2.5"
                        stroke="rgba(200,170,100,0.9)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <span className={`task-text${task.completed ? ' done' : ''}`}>
                    {task.text}
                  </span>

                  <div className="task-actions">
                    <button
                      className="icon-btn"
                      onClick={() => moveTaskUp(index)}
                      title="Move up"
                      disabled={index === 0}
                      style={{ opacity: index === 0 ? 0.2 : undefined }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="2,8 6,4 10,8" />
                      </svg>
                    </button>
                    <button
                      className="icon-btn"
                      onClick={() => moveTaskDown(index)}
                      title="Move down"
                      disabled={index === tasks.length - 1}
                      style={{ opacity: index === tasks.length - 1 ? 0.2 : undefined }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="2,4 6,8 10,4" />
                      </svg>
                    </button>
                    <button
                      className="icon-btn del"
                      onClick={() => deleteTask(index)}
                      title="Remove task"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <line x1="2" y1="2" x2="10" y2="10" />
                        <line x1="10" y1="2" x2="2" y2="10" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="card-footer">
            <span className="footer-note">
              {completed > 0 ? `${completed} task${completed > 1 ? 's' : ''} accomplished` : 'Nothing completed yet'}
            </span>
            <span className="footer-note" style={{ letterSpacing: '0.1em', fontSize: '0.65rem' }}>◆</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ToDoList;