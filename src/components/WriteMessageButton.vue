<template>
  <v-container>
    <v-row>
      <v-col class="no-padding">
        <v-btn variant="outlined" color="blue" @click="dialog = true">
          Написать сообщение</v-btn
        >
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialog" max-width="500px" max-height="70%">
    <v-card>
      <div>
        <v-form @submit.prevent="" ref="newMessageForm">
          <v-container>
            <v-row justify="center" align="center">
              <v-card-title>Новое сообщение</v-card-title>
            </v-row>
            <v-row justify="center" align="center">
              <div v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                  <li v-for="error in errors">{{ error }}</li>
                </ul>
              </div>
            </v-row>
            <v-textarea label="Label" v-model="textMessage"></v-textarea>
          </v-container>
        </v-form>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="secondary"
          @click="closeDialog"
          justify="right"
          align="right"
          >Close</v-btn
        >
        <v-btn color="secondary" @click="sendForm" justify="right" align="right"
          >Send</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { apiGetOrCreatePrivateDialog } from "@/api/chats";
import { apiSendMessage } from "@/api/messages";
export default {
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      textMessage: "",
      errors: [],
    };
  },
  mounted() {
    console.log("mounted write message userId:", this.userId);
  },
  methods: {
    closeDialog() {
      this.textMessage = "";
      this.errors = [];
      this.dialog = false;
    },
    async sendForm() {
      const chat = await apiGetOrCreatePrivateDialog(this.userId);
      if (chat.error) {
        this.errors.push(chat.error);
        return;
      }
      console.log("chat:", chat.dialogId);
      const response = await apiSendMessage(chat.dialogId, this.textMessage);
      if (response.error) {
        this.errors.push(response.error);
        return;
      }
      if (!response.message) {
        this.errors.push("Message not sent");
        return;
      }
      this.closeDialog();
    },
  },
};
</script>
<style>
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;
}
.no-padding {
  padding: 0%;
}
</style>
