<template>
  <DialogPageLayout>
    <OriginalLoginPage></OriginalLoginPage>
  </DialogPageLayout>
</template>

<script>
import DialogPageLayout from '/@theme/layouts/DialogPageLayout.vue';
import OriginalLoginPage from '/src/apps/portal/pages/LoginPage.vue';

export default {
  components: {
    OriginalLoginPage,
    DialogPageLayout
  }
};
</script>
