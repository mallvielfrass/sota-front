<template>
  <div class="messagesBox">
    <div class="header" v-if="isLoaded">
      <div class="chatName">{{ chat.name }}</div>
      <div class="msgCount">всего сообщений: {{ chat.msgCount }}</div>
    </div>
    <div class="bubbles">
      <div
        v-for="message in messages"
        :key="message.dialogId"
        :class="{
          'bubble-position-right': message.isMyMessage,
          'bubble-padding': true,
        }"
      >
        <div
          :class="{
            'bubble-message': true,
            'bubble-message-position-right': message.isMyMessage,
            'bubble-message-position-left': !message.isMyMessage,
          }"
        >
          <div>
            {{ message.text }}
          </div>

          <div :class="{ 'bubble-service-left': !message.isMyMessage }">
            <div class="bubble-data">
              <div v-if="!message.isMyMessage">
                {{ message.userFullName }}
              </div>
            </div>

            <div class="bubble-data">
              {{ message.atCreated }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetChat } from "@/api/chats";
import { apiGetMessages } from "@/api/messages";
export default {
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
.bubble-padding {
  padding: 0.5em;
}
.bubble-position-right {
  display: grid;
  justify-items: end;
}
.bubble-message {
  border: 1px solid rgb(75, 75, 75);
  padding: 1em;
  min-height: 1.5em;
  max-height: max-content;

  min-width: 7em;
  max-width: 50%;

  font: 1em sans-serif;
  padding: 0.5em;
  word-break: break-all;
  background-color: white;
}
.bubble-message-position-right {
  background-color: rgb(210, 226, 240);
  border-radius: 30% 30% 0% 30%;
  padding: 1em;
}
.bubble-message-position-left {
  background-color: rgb(255, 255, 255);
  border-radius: 10% 10% 10% 0%;
  padding: 1em;
}
.bubble-data {
  font: 0.7em sans-serif;
  display: grid;
  /* justify-items: end; */
  padding-top: 1em;
  /* grid-template-columns: 20% 20%; */
}
.bubble-service-left {
  display: grid;
  grid-template-columns: 60% 40%;
}
</style>
