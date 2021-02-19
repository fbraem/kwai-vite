<template>
  <footer>
    <AngledSection
        bg-color="bg-gray-300"
        text-color="text-gray-300"
    >
      <div class="container grid grid-rows-3 lg:grid-cols-3 lg:grid-rows-1 justify-items-center py-8">
        <div class="w-full p-4 text-center lg:text-left">
          <div>
            <strong>{{ config.contact.title }}</strong><br />
            <i class="fas fa-home"></i> {{ config.contact.address.street }}<br />
            {{ config.contact.address.city }}<br />
          </div>
        </div>
        <div class="p-4 w-full">
          <div class="w-20 h-20 mx-auto bg-red-700 transform rotate-45">
            <div class="flex justify-center items-center absolute left-0 top-0 w-10 h-10 hover:-ml-1 hover:-mt-1 bg-gray-900 cursor-pointer"
            >
              <a :href="config.contact.facebook">
                <i class="fab fa-facebook-f fa-lg transform -rotate-45 text-gray-500"></i>
              </a>
            </div>
            <div class="flex justify-center items-center absolute top-0 right-0 w-10 h-10 hover:-mt-1 hover:-mr-1 bg-gray-900 cursor-pointer">
              <a :href="config.contact.website.url">
                <i class="fas fa-globe fa-lg transform -rotate-45 text-gray-500"></i>
              </a>
            </div>
            <div class="flex justify-center items-center absolute right-0 bottom-0 w-10 h-10 hover:-mr-1 hover:-mb-1 bg-gray-900 cursor-pointer">
              <a :href="'mailto:' + config.contact.mail">
                <i class="fas fa-envelope fa-lg transform -rotate-45 text-gray-500"></i>
              </a>
            </div>
            <div class="flex justify-center items-center absolute bottom-0 left-0 w-10 h-10 hover:-mb-1 hover:-ml-1 bg-gray-900 cursor-pointer">
              <a :href="config.contact.location">
                <i class="fas fa-map-marker-alt fa-lg transform -rotate-45 text-gray-500"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="p-4 w-full text-center lg:text-right">
          <h2 class="uppercase text-gray-600 text-sm font-semibold mb-2">Links</h2>
          <ul>
            <li v-for="link in config.website.links">
              <a
                  :href="link.url"
                  class="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm"
              >
                {{ link.title }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr class="border-gray-400 my-6" />
      <div
          class="flex flex-wrap items-center md:justify-between justify-center"
      >
        <div class="w-full md:w-4/12 px-4 mx-auto text-center">
          <div class="text-sm text-gray-600 font-semibold py-1">
            Copyright &copy; {{year}}<br />
            {{ config.contact.title}}<br />
            Webmaster
            <a class="text-gray-600 hover:text-gray-900" :href="'mailto:' + config.contact.website.mail">
              {{ config.contact.website.webmaster }}
            </a>
          </div>
        </div>
      </div>
    </AngledSection>
  </footer>
</template>

<script>
import config from '/src/config/config.yaml';
import AngledSection from '/src/components/AngledSection.vue';

export default {
  components: { AngledSection },
  setup() {
    return {
      config,
      year: new Date().getFullYear()
    }
  }
}
</script>
