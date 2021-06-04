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
      <Popover v-slot="{ open }">
        <PopoverButton
          class="ml-1 rounded px-3 py-2 bg-gray-300 border-2 border-transparent focus:outline-none focus:border-blue-900"
        >
          <i class="fas fa-calendar" />
        </PopoverButton>
        <PopoverOverlay
          class="bg-black"
          :class="open ? 'opacity-30 fixed inset-0' : 'opacity-0'"
        />
        <PopoverPanel class="absolute right-0 z-50">
          <div class="flex flex-col px-3 py-2 bg-white mt-1">
            <div class="flex items-center">
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
                  :class="{ 'text-gray-400': day.outsideCurrentMonth }"
                >
                  <a
                    v-if="!day.outsideCurrentMonth"
                    class="hover:cursor-pointer"
                    @click="select(day.date)"
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
        </PopoverPanel>
      </Popover>
    </div>
  </div>
</template>

<script>
import { Popover, PopoverButton, PopoverPanel, PopoverOverlay } from '@headlessui/vue';
import { now, formatDate } from '/src/common/useDayJS.js';
import dayjs from 'dayjs';
import { computed, ref } from 'vue';

export default {
  components: {
    Popover, PopoverButton, PopoverPanel, PopoverOverlay
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
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const input = ref(null);
    const currentYear = ref(now().year());
    const currentMonth = ref(now().month());

    const currentMonthName = computed(() => dayjs.monthsShort()[currentMonth.value]);
    const weekDays = ref(dayjs.weekdaysShort(true));

    const weeks = computed(() => {
      const weeks = [];
      const start = now().year(currentYear.value).month(currentMonth.value).startOf('M');
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

    const select = (date) => {
      emit('update:modelValue', formatDate(date, 'L'));
      input.value.focus();
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
      const currentDate = now();
      currentYear.value = currentDate.year();
      currentMonth.value = currentDate.month();
    };

    return {
      input,
      currentYear,
      currentMonth,
      currentMonthName,
      weeks,
      weekDays,
      select,
      nextYear,
      nextMonth,
      prevYear,
      prevMonth,
      setToday
    };
  }
};
</script>
