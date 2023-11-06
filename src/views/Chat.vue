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
    <div class="inputBox">
      <v-textarea
        label="Новое сообщение..."
        auto-grow
        rows="4"
        max-rows="10"
        v-model="msg"
        hide-details="auto"
      ></v-textarea>
      <div class="sendButton">
        <img
          @click="sendMessage()"
          src="../assets/send-message.png"
          class="circleButton"
          role="link"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetChat } from "@/api/chats";
import { apiGetMessages, apiSendMessage } from "@/api/messages";
import MessageBubble from "@/components/Messages/MessageBubble.vue";
export default {
  name: "Chat",
  components: {
    MessageBubble: MessageBubble,
  },
  data() {
    return {
      chatId: "",
      msg: "",
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
    async sendMessage() {
      //    console.log("send message:", this.msg);
      const res = await apiSendMessage(this.chatId, this.msg);
      if (res.error) {
        console.log(res.error);
        return;
      }
      this.msg = "";
    },
  },
};
</script>
<style scoped>
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

.messagesBox {
  display: grid;
  grid-template-rows: auto 10rem 1fr; /* первая строка займет место по содержимому, вторая - 10rem, третья - остальное пространство */
  height: 90vh; /* чтобы контейнер занимал всю высоту видимой области */
}

.header {
  align-self: start; /* чтобы header занимал место сверху */
  background-color: white;
  display: grid;
  justify-items: center;
  border: 1px solid rgb(75, 75, 75);
}

.inputBox {
  align-self: end; /* чтобы inputBox был прижат к низу */
  background-color: white;
  border: 1px solid rgb(75, 75, 75);
  display: grid;
  grid-template-columns: 90% auto;
}
.sendButton {
  display: grid;
  align-self: center;
  max-height: min-content;
  justify-items: center;
}
.circleButton {
  border: 0.1rem solid rgb(0, 68, 255);
  border-radius: 50%;
  padding: 0.5rem;
  height: 4rem;
  width: 4rem;
}
[role="link"]:hover {
  cursor: pointer;
  background-color: rgb(169, 185, 253);
}
</style>
