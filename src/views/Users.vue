<template>
  <div>
    <div v-for="user in users" :key="user._id" class="pagination">
      <v-card
        class="page-link"
        role="link"
        @click="navigate('/users/' + user._id)"
      >
        <v-card-text>
          <p class="text-h4 text--primary">
            {{ user.firstName + " " + user.lastName }}
          </p>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import { apiGetUsers } from "@/api/users";

export default {
  data() {
    return {
      users: [],
      limit: 10,
      offset: 0,
    };
  },
  async created() {
    await this.getUsers();
  },
  methods: {
    async getUsers() {
      const users = await apiGetUsers(this.limit, this.offset);
      this.users = users;
    },
    navigate(path) {
      this.$router.push(path);
    },
  },
};
</script>
