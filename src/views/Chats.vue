<template>
  <div>
    <!-- <NewChat @eventchatcreated="eventChatCreated" class="ms-10 pa-1" /> -->

    <div v-for="chat in chats" :key="chat._id" class="pagination">
      <v-card
        class="page-link"
        role="link"
        @click="navigate('/chats/' + chat._id)"
      >
        <v-card-text>
          <p class="text-h4 text--primary">{{ chat.name }}</p>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
import { apiGetChats } from "@/api/chats";
import ChatSettings from "@/components/ChatSettings.vue";
import NewChat from "@/components/NewChat.vue";
export default {
  components: {
    NewChat,
    ChatSettings,
  },
  data() {
    return {
      chats: [],
      currentChat: {},
      chatSettingsDialog: false,
      page: 1,
      limit: 10,
    };
  },
  created() {
    this.getChats();
  },

  methods: {
    navigate(path) {
      this.$router.push(path);
    },
    eventChatCreated() {
      console.log("eventChatCreated");
      this.getChats();
    },
    eventChatUpdated() {
      console.log("eventChatUpdated");
      this.getChats();
    },
    async getChats() {
      this.chats = await apiGetChats();
    },
  },
};
</script>
<style>
.card-with-padding {
  padding-left: 20px; /* Adjust the padding value as needed */
}
</style>
