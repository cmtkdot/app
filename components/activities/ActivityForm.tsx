import React from 'react';
import { useForm } from 'react-hook-form';
import { Activity } from '../../lib/database.types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface ActivityFormProps {
  initialData: Activity;
  onSubmit: (data: Activity) => void;
  onCancel: () => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Activity>({
    defaultValues: initialData,
  });

  const handleFormSubmit = (data: Partial<Activity>) => {
    // Merge the form data with the initial data to ensure all fields are present
    const completeData: Activity = {
      ...initialData,
      ...data,
      updated_at: new Date().toISOString(),
    };
    onSubmit(completeData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <Input
          {...register('title', { required: 'Title is required' })}
          placeholder="Title"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>
      <div>
        <Textarea
          {...register('description')}
          placeholder="Description"
        />
      </div>
      <div>
        <Input
          {...register('date', { required: 'Date is required' })}
          type="date"
        />
        {errors.date && <p className="text-red-500">{errors.date.message}</p>}
      </div>
      <div>
        <Input
          {...register('start_time')}
          type="time"
          placeholder="Start Time"
        />
      </div>
      <div>
        <Input
          {...register('end_time')}
          type="time"
          placeholder="End Time"
        />
      </div>
      <div>
        <Input
          {...register('location')}
          placeholder="Location"
        />
      </div>
      <div>
        <Input
          {...register('price', { valueAsNumber: true })}
          type="number"
          step="0.01"
          placeholder="Price"
        />
      </div>
      {/* Hidden fields for properties that shouldn't be directly edited by the user */}
      <input type="hidden" {...register('id')} />
      <input type="hidden" {...register('trip_id')} />
      <input type="hidden" {...register('itinerary_id')} />
      <input type="hidden" {...register('order')} />
      <input type="hidden" {...register('created_at')} />
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default ActivityForm;
