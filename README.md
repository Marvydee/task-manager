# Task Manager

**The point of this project wasn't the UI. It was useReducer.**

Every state change in this app — adding a task, completing it, deleting 
it, reordering it — goes through one function. One place to look when 
something breaks. That's the idea behind useReducer and this project is 
where it clicked for me.

Other things worth noting:
- Drag and drop is the native HTML5 API. No library.
- Overdue detection appends T00:00:00 to date strings before parsing  
  them. Without that, JavaScript reads the date in UTC and your 11pm  
  looks like the next day.
- Filtered views (active, done, overdue) are derived from state,  
  not stored separately.

    npm install && npm start

Stack: React · useReducer · CSS  
Live: [#](#)
