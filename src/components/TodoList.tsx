import React from 'react';
import { TodoItem } from '@/types';
import { Card, Button } from './ui';

interface TodoListProps {
  items: TodoItem[];
  onToggleComplete?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function TodoList({ items, onToggleComplete, onDelete }: TodoListProps) {
  if (items.length === 0) {
    return (
      <Card title="To-Do Items">
        <p className="text-gray-500 text-center py-4">No action items found.</p>
      </Card>
    );
  }

  const getPriorityColor = (priority: TodoItem['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card title="Action Items" description={`${items.length} items to complete`}>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-start gap-3 p-3 rounded-lg border ${
              item.completed ? 'bg-gray-50 opacity-75' : 'bg-white'
            }`}
          >
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => onToggleComplete?.(item.id)}
              className="mt-1 rounded"
            />
            <div className="flex-1 min-w-0">
              <p className={`text-sm ${item.completed ? 'line-through text-gray-500' : ''}`}>
                {item.text}
              </p>
              <div className="flex items-center gap-2 mt-1">
                {item.assignee && (
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                    {item.assignee}
                  </span>
                )}
                <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(item.priority)}`}>
                  {item.priority}
                </span>
                {item.dueDate && (
                  <span className="text-xs text-gray-500">
                    Due: {item.dueDate.toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </Button>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}