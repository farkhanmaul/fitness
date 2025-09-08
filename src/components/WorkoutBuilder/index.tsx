'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Icons } from '@/components/icons';
import { useWorkoutBuilder } from '@/hooks/useWorkoutBuilder';
import { exerciseCategories, muscleGroups, equipment } from '@/data/exerciseLibrary';
import { ExerciseLibraryItem, WorkoutExercise, WorkoutTemplate } from '@/types/workoutBuilder';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

interface WorkoutBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  initialTemplate?: WorkoutTemplate;
}

export default function WorkoutBuilder({ isOpen, onClose, initialTemplate }: WorkoutBuilderProps) {
  const {
    state,
    templates,
    createNewTemplate,
    setCurrentTemplate,
    addExercise,
    removeExercise,
    reorderExercises,
    updateExercise,
    updateTemplate,
    saveTemplate,
    deleteTemplate,
    duplicateTemplate,
    setFilters,
    getFilteredExercises,
    getWorkoutStats
  } = useWorkoutBuilder();

  const [activeTab, setActiveTab] = useState<'builder' | 'library' | 'templates'>('builder');
  const [searchTerm, setSearchTerm] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      if (initialTemplate) {
        setCurrentTemplate(initialTemplate);
      } else if (!state.currentTemplate) {
        setCurrentTemplate(createNewTemplate());
      }
    }
  }, [isOpen, initialTemplate]);

  if (!isOpen || !state.currentTemplate) return null;

  const filteredExercises = getFilteredExercises().filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.muscleGroups.some(mg => mg.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const workoutStats = getWorkoutStats();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    if (source.droppableId === 'exercise-library' && destination.droppableId === 'workout-exercises') {
      const exercise = filteredExercises[source.index];
      addExercise(exercise, destination.index);
    } else if (source.droppableId === 'workout-exercises' && destination.droppableId === 'workout-exercises') {
      reorderExercises(source.index, destination.index);
    }
  };

  const handleSave = () => {
    saveTemplate();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-7xl max-h-[95vh] overflow-hidden flex flex-col w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-4">
            <Icons.dumbbell className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold">Workout Builder</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleSave} className="bg-blue-600 text-white">
              <Icons.save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              <Icons.x className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-80 border-r flex flex-col">
            {/* Tabs */}
            <div className="flex border-b">
              <button
                className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 ${
                  activeTab === 'builder' ? 'border-blue-600 text-blue-600' : 'border-transparent'
                }`}
                onClick={() => setActiveTab('builder')}
              >
                Builder
              </button>
              <button
                className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 ${
                  activeTab === 'library' ? 'border-blue-600 text-blue-600' : 'border-transparent'
                }`}
                onClick={() => setActiveTab('library')}
              >
                Library
              </button>
              <button
                className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 ${
                  activeTab === 'templates' ? 'border-blue-600 text-blue-600' : 'border-transparent'
                }`}
                onClick={() => setActiveTab('templates')}
              >
                Templates
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === 'builder' && (
                <div className="space-y-4">
                  <div>
                    <Label>Workout Name</Label>
                    <Input
                      value={state.currentTemplate.name}
                      onChange={(e) => updateTemplate({ name: e.target.value })}
                      placeholder="Enter workout name"
                    />
                  </div>
                  
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={state.currentTemplate.description || ''}
                      onChange={(e) => updateTemplate({ description: e.target.value })}
                      placeholder="Describe this workout..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Difficulty</Label>
                    <Select
                      value={state.currentTemplate.difficulty}
                      onValueChange={(value: string) => updateTemplate({ difficulty: value as 'beginner' | 'intermediate' | 'advanced' | 'expert' })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <h3 className="font-semibold text-sm">Workout Stats</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Exercises: {workoutStats.totalExercises}</div>
                      <div>Sets: {workoutStats.totalSets}</div>
                      <div>Reps: {workoutStats.totalReps}</div>
                      <div>Duration: {workoutStats.estimatedDuration}min</div>
                    </div>
                    {workoutStats.muscleGroups.length > 0 && (
                      <div>
                        <div className="text-sm font-medium mb-1">Target Muscles:</div>
                        <div className="flex flex-wrap gap-1">
                          {workoutStats.muscleGroups.map(mg => (
                            <Badge key={mg} variant="secondary" className="text-xs">
                              {mg}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'library' && (
                <div className="space-y-4">
                  <Input
                    placeholder="Search exercises..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                  
                  <div className="space-y-2">
                    <Select
                      value={state.filters.category}
                      onValueChange={(value) => setFilters({ category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {exerciseCategories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={state.filters.muscleGroup}
                      onValueChange={(value) => setFilters({ muscleGroup: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Muscle Group" />
                      </SelectTrigger>
                      <SelectContent>
                        {muscleGroups.map(mg => (
                          <SelectItem key={mg} value={mg}>{mg}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={state.filters.equipment}
                      onValueChange={(value) => setFilters({ equipment: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Equipment" />
                      </SelectTrigger>
                      <SelectContent>
                        {equipment.map(eq => (
                          <SelectItem key={eq} value={eq}>{eq}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="exercise-library">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="space-y-2"
                        >
                          {filteredExercises.map((exercise, index) => (
                            <Draggable key={exercise.id} draggableId={exercise.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`p-3 border rounded-lg cursor-grab ${
                                    snapshot.isDragging ? 'bg-blue-50 border-blue-200' : 'bg-white hover:bg-gray-50'
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-sm">{exercise.name}</h4>
                                    <Badge variant={exercise.difficulty === 'beginner' ? 'secondary' : 
                                                  exercise.difficulty === 'intermediate' ? 'default' : 'destructive'}
                                           className="text-xs">
                                      {exercise.difficulty}
                                    </Badge>
                                  </div>
                                  <div className="flex flex-wrap gap-1 mb-2">
                                    {exercise.muscleGroups.map(mg => (
                                      <Badge key={mg} variant="outline" className="text-xs">
                                        {mg}
                                      </Badge>
                                    ))}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    {exercise.equipment.length > 0 ? exercise.equipment.join(', ') : 'Bodyweight'}
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              )}

              {activeTab === 'templates' && (
                <div className="space-y-2">
                  {templates.map(template => (
                    <Card key={template.id} className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{template.name}</h4>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setCurrentTemplate(template)}
                          >
                            <Icons.edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => duplicateTemplate(template)}
                          >
                            <Icons.copy className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteTemplate(template.id)}
                          >
                            <Icons.trash className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>{template.exercises.length} exercises</div>
                        <div>{template.estimatedDuration}min</div>
                        <Badge variant="secondary" className="text-xs">
                          {template.difficulty}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Workout Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Workout Exercises</h3>
                <p className="text-gray-600 text-sm">
                  Drag exercises from the library or reorder them here
                </p>
              </div>

              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="workout-exercises">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`min-h-96 space-y-4 p-4 border-2 border-dashed rounded-lg ${
                        snapshot.isDraggingOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
                      }`}
                    >
                      {state.selectedExercises.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                          <Icons.plus className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                          <p>No exercises added yet</p>
                          <p className="text-sm">Drag exercises from the library to build your workout</p>
                        </div>
                      ) : (
                        state.selectedExercises.map((exercise, index) => (
                          <Draggable key={exercise.id} draggableId={exercise.id} index={index}>
                            {(provided, snapshot) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`${snapshot.isDragging ? 'shadow-lg' : ''}`}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-start gap-4">
                                    <div
                                      {...provided.dragHandleProps}
                                      className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded cursor-grab mt-1"
                                    >
                                      <Icons.gripVertical className="w-4 h-4 text-gray-600" />
                                    </div>
                                    
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-medium">{exercise.exerciseName}</h4>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          onClick={() => removeExercise(exercise.id)}
                                        >
                                          <Icons.trash className="w-4 h-4 text-red-600" />
                                        </Button>
                                      </div>
                                      
                                      <div className="grid grid-cols-3 gap-4 mb-3">
                                        <div>
                                          <Label className="text-xs">Sets</Label>
                                          <Input
                                            type="number"
                                            value={exercise.sets}
                                            onChange={(e) => updateExercise(exercise.id, { sets: parseInt(e.target.value) || 1 })}
                                            min="1"
                                            className="h-8"
                                          />
                                        </div>
                                        <div>
                                          <Label className="text-xs">Reps</Label>
                                          <Input
                                            type="number"
                                            value={exercise.reps}
                                            onChange={(e) => updateExercise(exercise.id, { reps: parseInt(e.target.value) || 1 })}
                                            min="1"
                                            className="h-8"
                                          />
                                        </div>
                                        <div>
                                          <Label className="text-xs">Rest (sec)</Label>
                                          <Input
                                            type="number"
                                            value={exercise.restTime}
                                            onChange={(e) => updateExercise(exercise.id, { restTime: parseInt(e.target.value) || 30 })}
                                            min="0"
                                            className="h-8"
                                          />
                                        </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-2 gap-4 mb-3">
                                        <div>
                                          <Label className="text-xs">Weight (optional)</Label>
                                          <Input
                                            type="number"
                                            value={exercise.weight || ''}
                                            onChange={(e) => updateExercise(exercise.id, { weight: parseFloat(e.target.value) || undefined })}
                                            placeholder="0"
                                            className="h-8"
                                          />
                                        </div>
                                        <div>
                                          <Label className="text-xs">Target RPE</Label>
                                          <Input
                                            type="number"
                                            value={exercise.targetRPE || ''}
                                            onChange={(e) => updateExercise(exercise.id, { targetRPE: parseInt(e.target.value) || undefined })}
                                            placeholder="1-10"
                                            min="1"
                                            max="10"
                                            className="h-8"
                                          />
                                        </div>
                                      </div>

                                      <div className="flex gap-2 mb-3">
                                        <button
                                          onClick={() => updateExercise(exercise.id, { superset: !exercise.superset })}
                                          className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                                            exercise.superset ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                                          }`}
                                        >
                                          <Icons.zap className="w-3 h-3" />
                                          Superset
                                        </button>
                                        <button
                                          onClick={() => updateExercise(exercise.id, { dropset: !exercise.dropset })}
                                          className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                                            exercise.dropset ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'
                                          }`}
                                        >
                                          <Icons.trendingDown className="w-3 h-3" />
                                          Dropset
                                        </button>
                                      </div>

                                      <div>
                                        <Label className="text-xs">Notes</Label>
                                        <Textarea
                                          value={exercise.notes || ''}
                                          onChange={(e) => updateExercise(exercise.id, { notes: e.target.value })}
                                          placeholder="Add notes for this exercise..."
                                          rows={2}
                                          className="mt-1"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}