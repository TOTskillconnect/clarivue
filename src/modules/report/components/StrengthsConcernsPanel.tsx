import React, { useState, useRef, useEffect } from 'react';
import { GripVertical, X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { Button } from '@/components/ui/button';

interface Item {
  id: string;
  text: string;
}

interface StrengthsConcernsPanelProps {
  strengths: Item[];
  concerns: Item[];
  onReorderStrengths: (items: Item[]) => void;
  onReorderConcerns: (items: Item[]) => void;
  onRemoveStrength: (id: string) => void;
  onRemoveConcern: (id: string) => void;
  onUpdateStrength?: (id: string, text: string) => void;
  onUpdateConcern?: (id: string, text: string) => void;
  onAddStrength?: (text: string) => void;
  onAddConcern?: (text: string) => void;
}

const reorder = (list: Item[], startIndex: number, endIndex: number): Item[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

interface EditableItemProps {
  item: Item;
  onUpdate: (id: string, text: string) => void;
  provided: any;
  snapshot: any;
  onRemove: (id: string) => void;
  index: number;
  itemsLength: number;
}

const EditableItem: React.FC<EditableItemProps> = ({
  item,
  onUpdate,
  provided,
  snapshot,
  onRemove,
  index,
  itemsLength,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(item.text);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (text.trim() !== item.text) {
      onUpdate(item.id, text.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === 'Escape') {
      setText(item.text);
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      ref={provided.innerRef}
      {...provided.draggableProps}
      initial={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className={`
        group relative rounded
        ${snapshot.isDragging ? 'bg-gray-50 shadow-sm' : ''}
        hover:bg-gray-50 transition-colors
      `}
    >
      <div className="flex items-start py-3 px-2">
        <div
          {...provided.dragHandleProps}
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity hover:text-[#04ADA4]"
        >
          <GripVertical className="w-4 h-4" />
        </div>
        <div className="flex-grow px-3" onDoubleClick={handleDoubleClick}>
          {isEditing ? (
            <textarea
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="w-full min-h-[24px] text-sm text-gray-600 leading-relaxed bg-white border border-[#04ADA4] rounded px-2 py-1 focus:outline-none resize-none"
              rows={Math.max(1, Math.ceil(text.length / 40))}
            />
          ) : (
            <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
          )}
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      {index < itemsLength - 1 && (
        <div className="absolute bottom-0 left-8 right-2 h-px bg-gray-100" />
      )}
    </motion.div>
  );
};

interface AddItemProps {
  onAdd: (text: string) => void;
  placeholder?: string;
}

const AddItem: React.FC<AddItemProps> = ({ onAdd, placeholder }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
    setIsAdding(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
    if (e.key === 'Escape') {
      setText('');
      setIsAdding(false);
    }
  };

  return (
    <div className="mt-2">
      {isAdding ? (
        <div className="flex items-start gap-2">
          <textarea
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleAdd}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-grow min-h-[24px] text-sm text-gray-600 leading-relaxed bg-white border border-[#04ADA4] rounded px-3 py-2 focus:outline-none resize-none"
            rows={Math.max(1, Math.ceil(text.length / 40))}
          />
        </div>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsAdding(true)}
          className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-[#04ADA4]"
        >
          <Plus className="w-4 h-4" />
          Add item
        </Button>
      )}
    </div>
  );
};

export const StrengthsConcernsPanel: React.FC<StrengthsConcernsPanelProps> = ({
  strengths,
  concerns,
  onReorderStrengths,
  onReorderConcerns,
  onRemoveStrength,
  onRemoveConcern,
  onUpdateStrength = () => {},
  onUpdateConcern = () => {},
  onAddStrength = () => {},
  onAddConcern = () => {},
}) => {
  const handleDragEnd = (result: DropResult, listType: 'strengths' | 'concerns') => {
    if (!result.destination) return;

    const items = listType === 'strengths' ? strengths : concerns;
    const reordered = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    if (listType === 'strengths') {
      onReorderStrengths(reordered);
    } else {
      onReorderConcerns(reordered);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {/* Strengths Column */}
      <div className="relative">
        <div className="absolute left-0 top-0 w-1 h-full bg-[#04ADA4] rounded-l-lg" />
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-base font-medium text-gray-900">
              Potential Strengths
            </h3>
          </div>
          <div className="p-6 max-h-[400px] overflow-y-auto custom-scrollbar">
            <DragDropContext onDragEnd={(result) => handleDragEnd(result, 'strengths')}>
              <Droppable droppableId="strengths">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-1"
                  >
                    <AnimatePresence>
                      {strengths.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <EditableItem
                              item={item}
                              onUpdate={onUpdateStrength}
                              provided={provided}
                              snapshot={snapshot}
                              onRemove={onRemoveStrength}
                              index={index}
                              itemsLength={strengths.length}
                            />
                          )}
                        </Draggable>
                      ))}
                    </AnimatePresence>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <AddItem
              onAdd={onAddStrength}
              placeholder="Add a new strength..."
            />
          </div>
        </div>
      </div>

      {/* Concerns Column */}
      <div className="relative">
        <div className="absolute left-0 top-0 w-1 h-full bg-[#CBA3EB] rounded-l-lg" />
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-base font-medium text-gray-900">
              Potential Concerns
            </h3>
          </div>
          <div className="p-6 max-h-[400px] overflow-y-auto custom-scrollbar">
            <DragDropContext onDragEnd={(result) => handleDragEnd(result, 'concerns')}>
              <Droppable droppableId="concerns">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-1"
                  >
                    <AnimatePresence>
                      {concerns.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <EditableItem
                              item={item}
                              onUpdate={onUpdateConcern}
                              provided={provided}
                              snapshot={snapshot}
                              onRemove={onRemoveConcern}
                              index={index}
                              itemsLength={concerns.length}
                            />
                          )}
                        </Draggable>
                      ))}
                    </AnimatePresence>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <AddItem
              onAdd={onAddConcern}
              placeholder="Add a new concern..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 