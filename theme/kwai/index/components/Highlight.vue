<template>
    <div class="px-4 mr-auto ml-auto">
        <div
            class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg"
            :class="bgColor"
        >
            <img
                v-if="image"
                :src="image"
                alt="highlight image"
                class="w-full align-middle rounded-t-lg"
            />
            <blockquote class="relative p-8 mb-4">
                <svg
                    v-if="image"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    class="absolute left-0 w-full block"
                    style="height: 95px; top: -94px;"
                >
                    <polygon
                        points="-30,95 583,95 583,65"
                        class="fill-current"
                        :class="polygonColor"
                    ></polygon>
                </svg>
                <h4
                    class="text-xl font-bold"
                    :class="textColor"
                >
                    {{ title }}
                </h4>
                <slot></slot>
            </blockquote>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';

export default {
    props: {
        image: {
            type: String
        },
        title: {
            type: String,
            required: true
        },
        textColor: {
            type: String,
            default: 'text-white'
        },
        bgColor: {
            type: String,
            default: 'bg-red-700'
        }
    },
    setup(props) {
        const polygonColor = computed(
            () => props.bgColor.replace('bg-', 'text-')
        );
        return {
            polygonColor
        }
    }
};
</script>
