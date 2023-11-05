<template></template>
<script>
import { apiGetMe } from "@/api/users";
export default {
  data() {
    return {
      userId: "",
      isLoaded: false,
    };
  },
  mounted() {
    console.log("mounted account");
    this.getMe();
  },
  methods: {
    async getMe() {
      const res = await apiGetMe();

      if (res.error) {
        this.$router.push("/");
      }
      this.userId = res.user.userId;
      this.$router.push("/users/" + this.userId);
    },
  },
};
</script>
