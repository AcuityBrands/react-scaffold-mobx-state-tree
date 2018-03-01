import { types, onPatch, IJsonPatch, applyPatch } from 'mobx-state-tree';

interface IPatchHeap {
  patch: IJsonPatch,
  inversePatch: IJsonPatch
}

// This is a simple middleware created to track patch history
// Can be composed with other models to add history capabilities to stores

// A bit primitive, but function expects array of patch paths
// that should not be logged in the heap.  For example when using a
// loading boolean for UI side effects.
export function createHistory(excludes?: string[]) {

  return types.model({}).actions(self => {

    // Patch based time travelling
    // This is experimental
    const patches: IPatchHeap[] = [];
    const redoPatches: IPatchHeap[] = [];
    let isTimeTravel: boolean = false;

    const ax = {
      undo() {
        if (patches.length == 0) return;
        isTimeTravel = true;
        const p = patches[patches.length - 1]; // Get the last patch in the heap
        redoPatches.push(p); // Save the patch to the redo heap
        applyPatch(self, p.inversePatch); // Apply the patch inverse
        patches.splice(patches.length - 2, 2); // Remove the reversed actions from heap
      },
      redo() {
        if (redoPatches.length == 0) return;
        isTimeTravel = true;
        const p = redoPatches[redoPatches.length - 1]; // Get the last patch in the heap
        applyPatch(self, p.patch); // Apply the patch inverse
        redoPatches.splice(redoPatches.length - 1, 1); // Remove the reversed actions from heap

      },
      // Listen for patches to the model.  Save the patches to the heap for undo/redo
      afterCreate() {
        onPatch(self, (patch, inversePatch) => {
          if (excludes && excludes.indexOf(patch.path) > -1) return;
          patches.push({ patch, inversePatch });
          if (!isTimeTravel) redoPatches.splice(0, redoPatches.length);
          isTimeTravel = false;
        })
      }
    }
    return ax;
  })
}
