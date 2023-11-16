<template>
  <div class="messagesBox">
    <div class="header" v-if="isLoaded">
      <div class="chatName">{{ chat.name }}</div>
      <div class="msgCount">всего сообщений: {{ chat.msgCount }}</div>
    </div>
    <div class="bubbles">
      <div class="bubbles-list" id="bubbles-list">
        <MessageBubble
          :message="message"
          v-for="message in messages"
          :key="message.cId"
        />
        <div class="scrollElement" ref="scrollElement"></div>
      </div>
    </div>
    <div class="inputBox">
      <v-textarea
        label="Новое сообщение..."
        auto-grow
        rows="2"
        max-rows="10"
        v-model="msg"
        hide-details="auto"
        v-on:keyup.enter="sendMessage()"
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
import { socketIo } from "@/socketio/socket";
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
    // this.$nextTick(() => {
    //   this.scrollToBottom();
    // });
    socketIo.subscribeToChat(
      this.chatId,
      this.pushMessages,
      this.joinErrorHandler
    );
  },

  beforeUnmount() {
    socketIo.unsubscribeToChat(this.chatId);
  },
  watch: {
    isLoaded: {
      //add when component is mounted
      immediate: true,
      handler(newIsLoaded, oldIsLoaded) {
        if (newIsLoaded) {
          //this.scrollToBottom();
        }
      },
    },

    // messages(newMessages, oldMessages) {
    //   // Выполните действия при изменении свойства messages
    //   console.log("messages изменилось", newMessages, oldMessages);
    // },

    messages: {
      immediate: true, // Trigger the watcher immediately on component mount
      handler(newMessages, oldMessages) {
        console.log("watch messages: state changed", newMessages, oldMessages);
        if (oldMessages?.length === 0) {
          this.$nextTick(() => {
            console.log("watch newMessages: state changed> scrollToBottom");
            this.scrollToBottom();
          });
          return;
        }

        if (newMessages.length !== oldMessages?.length) {
          console.log("newMessages: state changed");
          this.$nextTick(() => {
            console.log(
              "watch newMessages: state changed> scrollToBottomSmooth"
            );
            this.scrollToBottomSmooth();
          });
        }
      },
    },
  },
  methods: {
    scrollToBottom() {
      this.$refs.scrollElement?.scrollIntoView();
    },
    scrollToBottomSmooth() {
      this.$refs.scrollElement?.scrollIntoView({ behavior: "smooth" });
    },

    async pushMessages(messages) {
      let msgs = [];
      if (Array.isArray(messages)) {
        msgs = messages;
      } else {
        msgs.push(messages);
      }
      this.messages = [...this.messages, ...msgs];
    },
    async joinErrorHandler(error) {
      console.log(error);
    },
    async chatInfo() {
      const res = await apiGetChat(this.chatId);
      //   console.log("res:", res);
      this.chat = res.chat;
    },
    async getMessages() {
      const res = await apiGetMessages(this.chatId, this.limit, this.offset);
      // console.log("res:", res);
      this.pushMessages(res.messages);
      this.isLoaded = true;
      //   const container = this.$el.querySelector("#bubbles-list");
      //   container.scrollTop = container.scrollHeight;
    },
    async sendMessage() {
      // this.scrollToBottom();
      //    console.log("send message:", this.msg);
      if (this.msg == "") {
        return;
      }
      //   this.pushMessages({
      //     userId: this.userId,
      //     chatId: this.chatId,
      //     text: this.msg,
      //     cId: Date.now(),
      //   });
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
  display: flex;
  height: 100%;
  overflow-y: auto;
}
.bubbles > div:last-child {
  scroll-snap-align: start;
}
.bubbles-list {
  display: grid;
  grid-template-columns: auto;
}
.messagesBox {
  display: grid;
  grid-template-rows: auto auto 1fr; /* первая строка займет место по содержимому, вторая - 10rem, третья - остальное пространство */
  height: 95vh; /* чтобы контейнер занимал всю высоту видимой области */
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
