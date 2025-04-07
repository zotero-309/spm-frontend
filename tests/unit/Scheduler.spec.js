import { describe, it, expect } from 'vitest'
import {filterSchedulerData, exist_check} from '../../src/views/Scheduler.vue'
// import { shallowMount } from '@vue/test-utils';
// import Scheduler from '../../src/views/Scheduler.vue';  // Adjust the path to your component


describe('Filter Function', () => {
  it('should filter data correctly based on selected types', () => {
    const mockData = [
        {
            "label": "AM",
            "dateStart": "2024-10-08T09:00:00",
            "dateEnd": "2024-10-08T13:00:00",
            "class": "Approved",
            "description": "Working from home"
          },
          {
            "label": "PM",
            "dateStart": "2024-10-09T14:00:00",
            "dateEnd": "2024-10-09T18:00:00",
            "class": "Pending_Approval",
            "description": "Doctor appointment"
          },
          {
            "label": "FULL",
            "dateStart": "2024-10-10T09:00:00",
            "dateEnd": "2024-10-10T18:00:00",
            "class": "Pending_Withdrawal",
            "description": "Full day leave"
          },
          {
            "label": "PM",
            "dateStart": "2024-10-12T14:00:00",
            "dateEnd": "2024-10-12T18:00:00",
            "class": "Approved",
            "description": "Working from home - afternoon"
          }
          
    ];
    const selectedTypes = ['Approved'];

    const result = filterSchedulerData(mockData, selectedTypes);

    
    expect(result).toEqual([
        {
            "label": "AM",
            "dateStart": "2024-10-08T09:00:00",
            "dateEnd": "2024-10-08T13:00:00",
            "class": "Approved",
            "description": "Working from home"
          },
          {
            "label": "PM",
            "dateStart": "2024-10-12T14:00:00",
            "dateEnd": "2024-10-12T18:00:00",
            "class": "Approved",
            "description": "Working from home - afternoon"
          }
    ]);
  });
});


describe('existingApplication function', () => {
  // Define the global variable (data.value in scheduler vue)
  let existing_application;

  // Like setup in unittest
  beforeEach(() => {
    // Reset the global data before each test to ensure a clean state
    existing_application = {
      value: [
        {
          dateEnd: new Date('2024-10-10T13:00:00.000Z'),
          label: 'AM',
          description: 'Medical Appointment',
        },
        {
          dateEnd: new Date('2024-10-09T18:00:00.000Z'),
          label: 'PM',
          description: 'Family Reasons',
        },
      ]
    };
  });

  // Teardown after each test
  afterEach(() => {
    // Clear the data or any side effects to ensure clean state for next test
    existing_application = null;
  });

  it('should return [400, formatted_event] when a matching event is found', () => {
    const selectedEvent = {
      detail: {
        item: {
          dateEnd: new Date('2024-10-10T11:00:00.000Z'),
          label: 'AM',
        }
      }
    };

    const result = exist_check(selectedEvent, existing_application);
    // Checks if it flags out same slot between selected event and existing application
    // matches time_slot (AM) and returned/selected date with existing date
    expect(result[0]).toBe(400);
    expect(result[1].label).toBe('AM');
    expect(result[1].date).toBe(existing_application.value[0].dateEnd.toLocaleDateString('en-CA'))
  });

  it('should return [200] when no matching event is found', () => {
    const selectedEvent = {
      detail: {
        item: {
          dateEnd: new Date('2024-10-15T16:00:00.000Z'),
          label: 'PM',
        }
      }
    };

    const result = exist_check(selectedEvent, existing_application);
    expect(result[0]).toBe(200);
  });
});

