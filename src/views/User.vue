<template>
  <div class="userBox">
    <div>
      <v-img
        v-if="isLoaded"
        height="200px"
        :src="avatar"
        class="nestedBox center"
      ></v-img>
      <WriteMessageButton v-if="!user.isMe" :userId="userId" />
    </div>

    <div class="nestedBox pa-3">
      UserName: {{ user.username }}
      <br />
      Name: {{ user.firstName }} {{ user.lastName }}
      <br />
      Email: {{ user.email }}
    </div>
  </div>
</template>

<script>
import { apiGetUser } from "@/api/users";
import WriteMessageButton from "@/components/WriteMessageButton.vue";
export default {
  components: {
    WriteMessageButton: WriteMessageButton,
  },
  data() {
    return {
      userId: "",
      user: {},
      isLoaded: false,
      avatar: "/api/static/default.png",
    };
  },
  mounted() {
    this.userId = this.$route.params.id;
    this.getUser();
  },
  methods: {
    async getUser() {
      const res = await apiGetUser(this.userId);
      console.log("res:", res);
      this.user = res.user;
      this.isLoaded = true;
    },
  },
};
</script>
<style>
.userBox {
  display: grid;
  grid-template-columns: 20% 80%;
  background-color: white;
  height: 100%;
  border: 1px solid rgb(75, 75, 75);
}
.nestedBox {
  border: 1px solid rgb(75, 75, 75);

  display: flex;
}
.center {
  justify-content: center;
  align-items: center;
}
</style>
