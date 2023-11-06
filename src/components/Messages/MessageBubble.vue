<template>
  <div
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
</template>
<script>
export default {
  name: "MessageBubble",
  props: {
    /**
     * The message object.
     * @type {Object}
     * @property {string} dialogId - The ID of the dialog.
     * @property {string} userId - The ID of the user.
     * @property {string} type - The type of the message.
     * @property {string} text - The text content of the message.
     * @property {Array} media - The media content of the message.
     * @property {string} atCreated - The creation timestamp of the message.
     * @property {string} atEdited - The timestamp when the message was last edited.
     * @property {string} originalText - The original text of the message.
     * @property {string} userFullName - The full name of the user.
     * @property {number} cId - The ID of the message.
     * @property {boolean} isMyMessage - Indicates if the message is sent by the current user.
     */
    message: Object,

    // {

    //   Message{
    //     dialogId: String,
    //     userId: String,
    //     type: String,
    //     text: String,
    //     media: [],
    //     atCreated: String,
    //     atEdited: String,
    //     originalText: String,
    //     userFullName: String,
    //     cId: Number,
    //     isMyMessage: Boolean,
    //   },
    //  },
  },
};
</script>
<style>
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
