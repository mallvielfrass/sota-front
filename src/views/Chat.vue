<template>
  <div class="messagesBox">
    <div class="header" v-if="isLoaded">
      <div class="chatName">{{ chat.name }}</div>
      <div class="msgCount">всего сообщений: {{ chat.msgCount }}</div>
    </div>
    <div class="bubbles">
      <MessageBubble
        :message="message"
        v-for="message in messages"
        :key="message.dialogId"
      />
    </div>
  </div>
</template>

<script>
import { apiGetChat } from "@/api/chats";
import { apiGetMessages } from "@/api/messages";
import MessageBubble from "@/components/Messages/MessageBubble.vue";
export default {
  name: "Chat",
  components: {
    MessageBubble: MessageBubble,
  },
  data() {
    return {
      chatId: "",
      userId: "",
      chat: {},
      isLoaded: false,
      offset: 0,
      limit: 50,
      messages: [],
    };
  },
  async mounted() {
    this.chatId = this.$route.params.id;
    await this.chatInfo();
    this.isLoaded = true;
    this.getMessages();
  },
  methods: {
    async chatInfo() {
      const res = await apiGetChat(this.chatId);
      console.log("res:", res);
      this.chat = res.chat;
    },
    async getMessages() {
      const res = await apiGetMessages(this.chatId, this.limit, this.offset);
      console.log("res:", res);
      this.messages = res.messages;
      this.isLoaded = true;
    },
  },
};
</script>
<style scoped>
.header {
  background-color: white;
  display: grid;
  justify-items: center;
  border: 1px solid rgb(75, 75, 75);
}
.chatName {
  align-self: center;
  font: 1.5em sans-serif;
}
.msgCount {
  align-self: center;
  font: 0.7em sans-serif;
}
.bubbles {
}
</style>
