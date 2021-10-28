import { defineStore } from 'pinia';
import dayjs from '/src/common/useDayJS.js';
import { useTrainingStore } from '/src/apps/coach/stores/trainingStore.js';

export const useTrainingGenerator = defineStore('trainingGenerator', {
  state: () => ({
    trainings: null
  }),
  getters: {
    isGenerated: (state) => state.trainings !== null,
    hasTrainings: (state) => state.trainings !== null && state.trainings.length > 0
  },
  actions: {
    generate({ start, end, moment, coaches }) {
      this.trainings = [];

      const startTime = dayjs(moment.start_time, 'HH:mm');
      const endTime = dayjs(moment.end_time, 'HH:mm');

      let next = start.day(moment.weekday);
      while (next.isBefore(end)) {
        const training = {
          title: moment.name,
          summary: moment.description,
          location: moment.location,
          start_date: next.hour(startTime.hour()).minute(startTime.minute()),
          end_date: next.hour(endTime.hour()).minute(endTime.minute()),
          cancelled: false,
          coaches: [],
          moment: moment,
          teams: [moment.team]
        };
        training.coaches = [...coaches];
        this.trainings.push(training);
        next = next.add(7, 'd');
      }
    },
    remove(index) {
      this.trainings.splice(index, 1);
      if (this.trainings.length === 0) {
        this.trainings = null;
      }
    },
    async save() {
      const trainingStore = useTrainingStore();
      for (const index in this.trainings) {
        if (!this.trainings[index].id) {
          this.trainings[index] = await trainingStore.save(this.trainings[index]);
        }
      }
    }
  }
});
