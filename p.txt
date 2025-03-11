'use client';

import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, X, Edit, Save, Trash, Home } from 'lucide-react';
import Link from 'next/link';

// Types
interface Task {
  id: string;
  content: string;
  column: string;
}

interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

interface KanbanState {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
}

// Initial data
const initialData: KanbanState = {
  tasks: {},
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: [],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default function KanbanPage() {
  const [state, setState] = useState<KanbanState>(initialData);
  const [newTaskInputs, setNewTaskInputs] = useState<{ [key: string]: string }>({});
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskContent, setEditingTaskContent] = useState('');
  const [editingColumnId, setEditingColumnId] = useState<string | null>(null);
  const [editingColumnTitle, setEditingColumnTitle] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('kanbanState');
    if (savedData) {
      setState(JSON.parse(savedData));
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('kanbanState', JSON.stringify(state));
  }, [state]);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result;

    // If there's no destination or if the item was dropped back in the same place
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    // If we're dragging columns
    if (type === 'column') {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setState({
        ...state,
        columnOrder: newColumnOrder,
      });
      return;
    }

    // Handle task drag
    const startColumn = state.columns[source.droppableId];
    const finishColumn = state.columns[destination.droppableId];

    // Moving within the same column
    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      setState({
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      });
    } else {
      // Moving to a different column
      const startTaskIds = Array.from(startColumn.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStartColumn = {
        ...startColumn,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finishColumn.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinishColumn = {
        ...finishColumn,
        taskIds: finishTaskIds,
      };

      // Update the task's column property
      const updatedTask = {
        ...state.tasks[draggableId],
        column: finishColumn.id,
      };

      setState({
        ...state,
        tasks: {
          ...state.tasks,
          [draggableId]: updatedTask,
        },
        columns: {
          ...state.columns,
          [newStartColumn.id]: newStartColumn,
          [newFinishColumn.id]: newFinishColumn,
        },
      });
    }
  };

  const handleNewTaskInputChange = (columnId: string, value: string) => {
    setNewTaskInputs({
      ...newTaskInputs,
      [columnId]: value
    });
  };

  const addTask = (columnId: string) => {
    const taskText = newTaskInputs[columnId] || '';
    if (!taskText.trim()) return;

    const taskId = `task-${Date.now()}`;
    const newTaskItem: Task = {
      id: taskId,
      content: taskText,
      column: columnId,
    };

    const column = state.columns[columnId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.push(taskId);

    setState({
      ...state,
      tasks: {
        ...state.tasks,
        [taskId]: newTaskItem,
      },
      columns: {
        ...state.columns,
        [columnId]: {
          ...column,
          taskIds: newTaskIds,
        },
      },
    });

    // Clear only the input for this column
    setNewTaskInputs({
      ...newTaskInputs,
      [columnId]: ''
    });
  };

  const deleteTask = (taskId: string, columnId: string) => {
    const column = state.columns[columnId];
    const newTaskIds = column.taskIds.filter(id => id !== taskId);
    
    const newTasks = { ...state.tasks };
    delete newTasks[taskId];

    setState({
      ...state,
      tasks: newTasks,
      columns: {
        ...state.columns,
        [columnId]: {
          ...column,
          taskIds: newTaskIds,
        },
      },
    });
  };

  const startEditingTask = (taskId: string) => {
    setEditingTaskId(taskId);
    setEditingTaskContent(state.tasks[taskId].content);
  };

  const saveEditingTask = () => {
    if (!editingTaskId || !editingTaskContent.trim()) return;

    setState({
      ...state,
      tasks: {
        ...state.tasks,
        [editingTaskId]: {
          ...state.tasks[editingTaskId],
          content: editingTaskContent,
        },
      },
    });

    setEditingTaskId(null);
    setEditingTaskContent('');
  };

  const addColumn = () => {
    if (!newColumnTitle.trim()) return;

    const columnId = `column-${Date.now()}`;
    const newColumn: Column = {
      id: columnId,
      title: newColumnTitle,
      taskIds: [],
    };

    setState({
      ...state,
      columns: {
        ...state.columns,
        [columnId]: newColumn,
      },
      columnOrder: [...state.columnOrder, columnId],
    });

    setNewColumnTitle('');
  };

  const deleteColumn = (columnId: string) => {
    // First, get all tasks in this column
    const column = state.columns[columnId];
    const taskIdsToDelete = column.taskIds;
    
    // Create new objects without the deleted items
    const newTasks = { ...state.tasks };
    taskIdsToDelete.forEach(taskId => {
      delete newTasks[taskId];
    });
    
    const newColumns = { ...state.columns };
    delete newColumns[columnId];
    
    const newColumnOrder = state.columnOrder.filter(id => id !== columnId);
    
    setState({
      tasks: newTasks,
      columns: newColumns,
      columnOrder: newColumnOrder,
    });
  };

  const startEditingColumn = (columnId: string) => {
    setEditingColumnId(columnId);
    setEditingColumnTitle(state.columns[columnId].title);
  };

  const saveEditingColumn = () => {
    if (!editingColumnId || !editingColumnTitle.trim()) return;

    setState({
      ...state,
      columns: {
        ...state.columns,
        [editingColumnId]: {
          ...state.columns[editingColumnId],
          title: editingColumnTitle,
        },
      },
    });

    setEditingColumnId(null);
    setEditingColumnTitle('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4 md:p-8">
      <div className="max-w-screen-xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-2">Kanban Board</h1>
            <p className="text-gray-600">Drag and drop tasks to organize your workflow</p>
          </div>
          <Link href="/" className="px-4 py-2 rounded-md bg-white border border-indigo-300 text-indigo-600 flex items-center hover:bg-indigo-50 transition-colors">
            <Home size={18} className="mr-2" />
            Home
          </Link>
        </header>

        {/* Add new column input */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-start space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            placeholder="New column title..."
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-grow max-w-xs"
          />
          <button
            onClick={addColumn}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors flex items-center"
          >
            <Plus size={16} className="mr-2" />
            Add Column
          </button>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex flex-col md:flex-row flex-wrap md:flex-nowrap gap-6 overflow-x-auto pb-4"
              >
                {state.columnOrder.map((columnId, index) => {
                  const column = state.columns[columnId];
                  const tasks = column.taskIds.map(taskId => state.tasks[taskId]);

                  return (
                    <Draggable key={columnId} draggableId={columnId} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="bg-white rounded-lg shadow-md w-full md:w-80 flex-shrink-0 flex flex-col max-h-screen"
                        >
                          {/* Column Header */}
                          <div
                            {...provided.dragHandleProps}
                            className={`p-4 rounded-t-lg font-bold text-white flex justify-between items-center ${
                              columnId === 'column-1' ? 'bg-blue-600' :
                              columnId === 'column-2' ? 'bg-amber-500' : 
                              columnId === 'column-3' ? 'bg-green-600' : 'bg-purple-600'
                            }`}
                          >
                            {editingColumnId === columnId ? (
                              <div className="flex items-center w-full">
                                <input
                                  type="text"
                                  value={editingColumnTitle}
                                  onChange={(e) => setEditingColumnTitle(e.target.value)}
                                  className="px-2 py-1 text-gray-800 rounded-md w-full"
                                  autoFocus
                                />
                                <button onClick={saveEditingColumn} className="ml-2 text-white p-1">
                                  <Save size={16} />
                                </button>
                              </div>
                            ) : (
                              <>
                                <h2>{column.title}</h2>
                                <div className="flex space-x-2">
                                  <button onClick={() => startEditingColumn(column.id)} className="text-white">
                                    <Edit size={16} />
                                  </button>
                                  <button onClick={() => deleteColumn(column.id)} className="text-white">
                                    <Trash size={16} />
                                  </button>
                                </div>
                              </>
                            )}
                          </div>

                          {/* Column tasks */}
                          <Droppable droppableId={column.id} type="task">
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`p-2 flex-grow overflow-y-auto ${
                                  snapshot.isDraggingOver ? 'bg-blue-50' : ''
                                }`}
                              >
                                {tasks.map((task, index) => (
                                  <Draggable key={task.id} draggableId={task.id} index={index}>
                                    {(provided, snapshot) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={`p-3 mb-2 rounded-lg shadow ${
                                          snapshot.isDragging ? 'bg-blue-100 shadow-lg' : 'bg-white'
                                        }`}
                                      >
                                        {editingTaskId === task.id ? (
                                          <div className="flex items-center">
                                            <input
                                              type="text"
                                              value={editingTaskContent}
                                              onChange={(e) => setEditingTaskContent(e.target.value)}
                                              className="flex-grow px-2 py-1 border rounded-md"
                                              autoFocus
                                            />
                                            <button 
                                              onClick={saveEditingTask} 
                                              className="ml-2 text-green-600 p-1"
                                            >
                                              <Save size={16} />
                                            </button>
                                          </div>
                                        ) : (
                                          <div className="flex justify-between items-start">
                                            <p className="text-gray-800">{task.content}</p>
                                            <div className="flex space-x-1 ml-2">
                                              <button 
                                                onClick={() => startEditingTask(task.id)} 
                                                className="text-blue-500 p-1 hover:text-blue-700"
                                              >
                                                <Edit size={14} />
                                              </button>
                                              <button 
                                                onClick={() => deleteTask(task.id, column.id)} 
                                                className="text-red-500 p-1 hover:text-red-700"
                                              >
                                                <X size={14} />
                                              </button>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>

                          {/* Add task form */}
                          <div className="p-3 border-t">
                            <div className="flex rounded-md shadow-sm">
                              <input
                                type="text"
                                placeholder="Add a task..."
                                value={newTaskInputs[column.id] || ''}
                                onChange={(e) => handleNewTaskInputChange(column.id, e.target.value)}
                                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    addTask(column.id);
                                  }
                                }}
                              />
                              <button
                                onClick={() => addTask(column.id)}
                                className={`px-3 py-2 rounded-r-md text-white ${
                                  columnId === 'column-1' ? 'bg-blue-600 hover:bg-blue-700' :
                                  columnId === 'column-2' ? 'bg-amber-500 hover:bg-amber-600' : 
                                  columnId === 'column-3' ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'
                                }`}
                              >
                                <Plus size={20} />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}