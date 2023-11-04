<template>
  <v-app>
    <Bar @setloginstate="setloginstate" />
    <div class="padding-top"></div>

    <div v-if="isLogin" class="working-container">
      <div class="pagination">
        <div class="page-link" role="link" @click="navigate('/my')">
          Моя страница
        </div>
        <div class="page-link" role="link" @click="navigate('/messages')">
          Мои сообщения
        </div>

        <div class="page-link" role="link" @click="navigate('/bots')">
          Мои боты
        </div>
      </div>
      <div class="working">
        <router-view />
      </div>
      <div class="right"></div>
    </div>
  </v-app>
</template>

<script>
import Bar from "./components/Bar.vue";
export default {
  name: "App",
  data: () => ({
    isLogin: false,
  }),
  components: { Bar },
  methods: {
    navigate(path) {
      this.$router.push(path);
    },
    setloginstate(state) {
      console.log("setloginstate", state);
      this.isLogin = state;
    },
  },
};
</script>
<style>
[role="link"]:hover {
  cursor: pointer;
  background-color: rgb(169, 185, 253);
}

.working-container {
  display: grid;
  grid-template-columns: 20% 60% 20%;

  height: 90%;
}
.page-link {
  border: 1px solid rgb(75, 75, 75);
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
}
a {
  text-decoration: none;
}
.pagination {
  background-color: white;
  border: 2px solid rgb(44, 20, 100);
}

.working {
  background-color: lightgray;
}

.padding-top {
  padding-top: 80px;
}
.my-app-bar {
  z-index: 0; /* Установите подходящее значение Z-индекса */
}
.padding-right {
  padding-right: 20px;
}
.bar-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border: 1px solid #ccc;

  border-radius: 5px;
  background-color: #fff;
}
.bar {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
}
</style>
