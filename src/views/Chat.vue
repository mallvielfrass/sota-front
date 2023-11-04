<template>Chat {{ chatId }}</template>

<script>
export default {
  data() {
    return {
      chatId: "",
    };
  },
  mounted() {
    this.chatId = this.$route.params.id;
  },
  methods: {},
};
</script>
