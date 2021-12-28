<template>
  <div>
    <PageSectionTitle>
      Beheersomgeving van de website
    </PageSectionTitle>
    <PageSection>
      <Card title="Gebruikers">
        <p>
          Beheer de gebruikers van de website.
        </p>
        <template #footer>
          <div class="flex justify-between w-full">
            <ButtonLink
              class="bg-gray-900 text-white"
              :route="{ name: 'admin.users' }"
            >
              <i class="fas fa-list" /> Overzicht
            </ButtonLink>
            <ButtonLink
              class="bg-gray-900 text-white"
              :route="{ name: 'admin.invite' }"
            >
              <i class="far fa-envelope" /> Nieuw
            </ButtonLink>
          </div>
        </template>
      </Card>
    </PageSection>
  </div>
</template>

<script>
import PageSection from '/@theme/components/PageSection.vue';
import ButtonLink from '/src/components/ButtonLink.vue';
import Card from '/src/components/Card.vue';
import PageSectionTitle from '/@theme/components/PageSectionTitle.vue';

export default {
  components: { PageSectionTitle, Card, PageSection, ButtonLink }
};
</script>
