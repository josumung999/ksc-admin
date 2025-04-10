import { JournalOperationFormValues } from "@/components/Forms/JournalOperations/CreateJournalOperationForm";
import { Store } from "pullstate";

// Initial state: an empty array of journal operations
const initialState: JournalOperationFormValues[] = [];

export const JournalOperationStore = new Store<JournalOperationFormValues[]>(
  initialState,
);

// Add a new journal operation
export const addJournalOperation = (operation: JournalOperationFormValues) => {
  JournalOperationStore.update((s) => {
    s.push(operation);
  });
};

// Update a specific journal operation at a given index
export const updateJournalOperationAt = (
  index: number,
  updatedData: Partial<JournalOperationFormValues>,
) => {
  JournalOperationStore.update((s) => {
    if (s[index]) {
      s[index] = { ...s[index], ...updatedData };
    }
  });
};

// Replace a journal operation entirely at a given index
export const replaceJournalOperationAt = (
  index: number,
  newData: JournalOperationFormValues,
) => {
  JournalOperationStore.update((s) => {
    if (s[index]) {
      s[index] = newData;
    }
  });
};

// Remove a journal operation by index
export const removeJournalOperationAt = (index: number) => {
  JournalOperationStore.update((s) => {
    s.splice(index, 1);
  });
};

// Reset all journal operations
export const resetJournalOperations = () => {
  JournalOperationStore.update(() => [...initialState]);
};
