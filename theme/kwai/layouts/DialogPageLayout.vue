<template>
  <div>
    <slot name="navigation">
      <Navigation
          :title="title"
          :url="url"
      >
      </Navigation>
    </slot>
    <main>
      <section class="absolute w-full h-full">
        <div
            class="absolute top-0 w-full h-full bg-gray-900 bg-cover bg-center"
            :style="{ 'background-image': 'url(' + image + ')' }"
        >
          <div class="w-full h-full absolute opacity-60 bg-black"></div>
          <div class="container mx-auto px-4 h-full">
            <div class="flex flex-col content-center items-center justify-center h-full">
              <div class="w-full md:w-2/3 xl:w-1/2 px-4">
                <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <slot></slot>
                  <div
                      class="w-full p-4 pt-0"
                      v-if="error"
                  >
                    <Alert
                        type="danger"
                        title="Error"
                        @close="error = null"
                        closeable
                    >
                      Er is een fout opgetreden tijdens de verwerking van de gegevens!
                      Probeer opnieuw, of neem contact op met de webmaster.
                    </Alert>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import config from '/src/config/config.yaml';
import { ref, onErrorCaptured } from 'vue';
import Alert from '../../../src/components/Alert.vue';
import Navigation from '../components/Navigation.vue';

export default {
  components: { Alert, Navigation },
  props: {
    image: {
      type: String,
      required: true,
      default: '/@theme/index/assets/hero.jpg'
    }
  },
  setup() {
    const error = ref(null);
    onErrorCaptured(
        (err) => { error.value = err; return false; }
    );

    return {
      title: config.website.title,
      url: config.contact.website.url + '/#',
      error
    }
  }
}
</script>
