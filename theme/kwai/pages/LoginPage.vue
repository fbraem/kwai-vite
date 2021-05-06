<template>
  <DialogPageLayout>
    <OriginalLoginPage></OriginalLoginPage>
  </DialogPageLayout>
</template>

<script>
import DialogPageLayout from '/@theme/layouts/EmptyLayout.vue';
import OriginalLoginPage from '/src/pages/LoginPage.vue';

export default {
  components: {
    OriginalLoginPage,
    DialogPageLayout
  }
};
</script>
