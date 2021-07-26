<template>
  <div class="mb-3">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
    </label>
    <div class="flex w-full items-stretch mb-3">
      <input
        :id="id"
        ref="input"
        type="text"
        :placeholder="placeholder"
        class="rounded w-full"
        :class="{ 'border-red-600': error }"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      >
      <Popover
        v-slot="{ open }"
        class="relative"
      >
        <PopoverButton
          class="ml-1 rounded px-3 py-2 bg-gray-300 border-2 border-transparent focus:outline-none focus:border-blue-900"
        >
          <i class="fas fa-calendar" />
        </PopoverButton>
        <PopoverOverlay
          class="bg-black"
          :class="open ? 'opacity-30 fixed inset-0' : 'opacity-0'"
        />
        <PopoverPanel class="absolute right-0 z-10 bg-white px-3 py-2 mt-1 rounded-md">
          <div class="flex flex-col">
            <div class="flex items-center justify-center">
              <div class="px-3 py-2 inline-flex items-center justify-center block h-8 w-8">
                <i
                  class="fas fa-angle-double-left hover:cursor-pointer"
                  @click="prevYear"
                />
              </div>
              <div class="px-3 py-2 inline-flex items-center justify-center block h-8 w-8">
                <i
                  class="fas fa-angle-left hover:cursor-pointer"
                  @click="prevMonth"
                />
              </div>
              <div class="text-center font-bold">
                {{ currentMonthName }} {{ currentYear }}
              </div>
              <div class="px-3 py-2 inline-flex items-center justify-center block h-8 w-8">
                <i
                  class="fas fa-angle-right hover:cursor-pointer"
                  @click="nextMonth"
                />
              </div>
              <div class="px-3 py-2 inline-flex items-center justify-center block h-8 w-8">
                <i
                  class="fas fa-angle-double-right hover:cursor-pointer"
                  @click="nextYear"
                />
              </div>
            </div>
            <table class="w-full">
              <tr>
                <th
                  v-for="(day, index) in weekDays"
                  :key="index"
                  class="text-xs font-normal text-center"
                >
                  {{ day }}
                </th>
              </tr>
              <tr
                v-for="(week, index) in weeks"
                :key="index"
              >
                <td
                  v-for="day in week"
                  :key="day"
                  class="text-center text-sm"
                  :class="{
                    'text-gray-400': day.outsideCurrentMonth,
                    'bg-blue-400': day.date.isSame(date, 'day')
                  }"
                >
                  <a
                    v-if="!day.outsideCurrentMonth"
                    class="hover:cursor-pointer"
                    @click="clickDate(day.date)"
                  >
                    {{ day.format }}
                  </a>
                  <span v-else>
                    {{ day.format }}
                  </span>
                </td>
              </tr>
            </table>
            <div class="text-center">
              <a
                class="text-xs text-blue-500 hover:cursor-pointer"
                @click="setToday"
              >
                Vandaag
              </a>
            </div>
          </div>
          <div
            v-if="time"
            class="mb-3"
          >
            <label
              v-if="label"
              :for="id"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Tijdstip
            </label>
            <div class="flex flex-row space-x-2">
              <div class="relative">
                <span
                  class="h-full leading-snug font-normal absolute text-center bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
                >
                  <i
                    class="fa fa-minus hover:cursor-pointer"
                    @click="subHour"
                  />
                </span>
                <input
                  :id="id"
                  v-model="currentHour"
                  type="number"
                  placeholder="HH"
                  class="px-10 rounded text-center w-32"
                  :class="{ 'border-red-600': error }"
                  min="0"
                  max="23"
                >
                <span
                  class="h-full leading-snug font-normal absolute text-center bg-transparent rounded text-base items-center justify-center w-8 pr-3 py-3 right-0"
                >
                  <i
                    class="fa fa-plus hover:cursor-pointer"
                    @click="addHour"
                  />
                </span>
              </div>
              <div class="relative">
                <span
                  class="h-full leading-snug font-normal absolute text-center bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
                >
                  <i
                    class="fa fa-minus hover:cursor-pointer"
                    @click="subMinute"
                  />
                </span>
                <input
                  :id="id"
                  v-model="currentMinute"
                  type="number"
                  placeholder="MM"
                  class="px-10 rounded text-center"
                  :class="{ 'border-red-600': error }"
                  min="0"
                  max="59"
                >
                <span
                  class="h-full leading-snug font-normal absolute text-center bg-transparent rounded text-base items-center justify-center w-8 pr-3 py-3 right-0"
                >
                  <i
                    class="fa fa-plus hover:cursor-pointer"
                    @click="addMinute"
                  />
                </span>
              </div>
            </div>
          </div>
          <div
            v-if="time"
            class="mb-3 flex flex-row justify-center"
          >
            <SubmitButton
              class="bg-red-600 text-white"
              @click="select"
            >
              Select
            </SubmitButton>
          </div>
        </PopoverPanel>
      </Popover>
    </div>
  </div>
</template>

<script>
import { Popover, PopoverButton, PopoverPanel, PopoverOverlay } from '@headlessui/vue';
import dayjs from '/src/common/useDayJS.js';
import { computed, ref, watch } from 'vue';
import SubmitButton from '/src/components/form/SubmitButton.vue';

export default {
  components: {
    SubmitButton, Popover, PopoverButton, PopoverPanel, PopoverOverlay
  },
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    },
    // eslint-disable-next-line vue/require-prop-types
    modelValue: {
      required: true
    },
    error: {
      type: String,
      default: null
    },
    time: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const input = ref(null);

    const date = ref(dayjs());

    watch(() => props.modelValue, (nv) => {
      if (nv) {
        const format = dayjs().localeData().longDateFormat('L');
        date.value = dayjs(props.modelValue, `${format} HH:mm`);
      }
    });

    const currentYear = computed( {
      get: () => date.value.year(),
      set: (value) => { date.value = date.value.year(value); }
    });

    const currentMonth = computed({
      get: () => date.value.month(),
      set: (value) => { date.value = date.value.month(value); }
    });

    const currentHour = computed({
      get: () => date.value.hour(),
      set: (value) => { date.value = date.value.hour(value); }
    });

    const currentMinute = computed({
      get: () => date.value.minute(),
      set: (value) => { date.value = date.value.minute(value); }
    });

    const currentDay = computed({
      get: () => date.value.date(),
      set: (value) => { date.value = date.value.day(value); }
    });

    const currentMonthName = computed(() => dayjs.monthsShort()[currentMonth.value]);
    const weekDays = ref(dayjs.weekdaysShort(true));

    const weeks = computed(() => {
      const weeks = [];
      const start = date.value.startOf('M');
      const dayInMonth = start.daysInMonth();
      const previousMonthDays = start.date(1).day() - 1;
      const offset = 0 - previousMonthDays;
      const nextMonthDays = offset + (7 - start.date(dayInMonth).day());
      const total = dayInMonth + previousMonthDays + nextMonthDays;

      let week = [];
      weeks.push(week);
      for (let i = offset; i < total; i++) {
        if (week.length === 7) {
          week = [];
          weeks.push(week);
        }
        const current = start.add(i, 'd');
        week.push({
          outsideCurrentMonth: (i < 0 || i > dayInMonth - 1),
          date: current,
          format: current.format('D')
        });
      }
      return weeks;
    });

    const select = () => {
      let newDate = dayjs()
        .year(currentYear.value)
        .month(currentMonth.value)
        .date(currentDay.value)
      ;
      if (props.time) {
        newDate = newDate
          .hour(currentHour.value)
          .minute(currentMinute.value)
        ;
      }
      emit('update:modelValue', newDate.format(props.time ? 'L HH:mm' : 'L'));
      input.value.focus();
    };

    const clickDate = (d) => {
      if (props.time) {
        date.value = d;
      } else {
        emit('update:modelValue', d.format(d, 'L'));
        // Without time inputs, close the popover when a date is clicked
        input.value.focus();
      }
    };

    const nextYear = () => {
      currentYear.value++;
    };
    const nextMonth = () => {
      if (currentMonth.value < 11) {
        currentMonth.value++;
      } else {
        currentYear.value++;
        currentMonth.value = 1;
      }
    };
    const prevYear = () => {
      currentYear.value--;
    };
    const prevMonth = () => {
      if (currentMonth.value > 0) {
        currentMonth.value--;
      } else {
        currentYear.value--;
        currentMonth.value = 11;
      }
    };
    const setToday = () => {
      const currentDate = dayjs();
      currentYear.value = currentDate.year();
      currentMonth.value = currentDate.month();
      currentDay.value = currentDate.day();
    };

    const subHour = () => {
      if (currentHour.value > 0) {
        currentHour.value -= 1;
      } else {
        currentHour.value = 23;
      }
    };

    const addHour = () => {
      if (currentHour.value === 23) {
        currentHour.value = 0;
      } else {
        currentHour.value += 1;
      }
    };

    const subMinute = () => {
      if (currentMinute.value > 0) {
        currentMinute.value -= 1;
      } else {
        currentMinute.value = 59;
      }
    };

    const addMinute = () => {
      if (currentMinute.value === 59) {
        currentMinute.value = 0;
      } else {
        currentMinute.value += 1;
      }
    };

    return {
      input,
      date,
      currentYear,
      currentMonth,
      currentDay,
      currentMonthName,
      currentHour,
      currentMinute,
      weeks,
      weekDays,
      select,
      clickDate,
      nextYear,
      nextMonth,
      prevYear,
      prevMonth,
      setToday,
      subHour,
      addHour,
      subMinute,
      addMinute
    };
  }
};
</script>

<style scoped>
input::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
