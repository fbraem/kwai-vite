<template>
  <div>
    <PageSectionTitle>
      <PageSectionHeader>
        Beheersomgeving van de website
      </PageSectionHeader>
    </PageSectionTitle>
    <PageSection>
      <div class="mx-auto max-w-xl space-y-8">
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
        <Card title="Gebruiker Uitnodigingen">
          <p>
            Beheer de uitnodigingen voor nieuwe gebruikers.
          </p>
          <template #footer>
            <div class="flex justify-between w-full">
              <ButtonLink
                class="bg-gray-900 text-white"
                :route="{ name: 'admin.user_invitations' }"
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
      </div>
    </PageSection>
  </div>
</template>

<script setup>
import PageSection from '/@theme/components/PageSection.vue';
import PageSectionTitle from '/@theme/components/PageSectionTitle.vue';
import PageSectionHeader from '/@theme/components/PageSectionHeader.vue';
import ButtonLink from '/src/components/ButtonLink.vue';
import Card from '/src/components/Card.vue';
</script>
