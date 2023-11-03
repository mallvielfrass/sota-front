<template>
  <div>Bot</div>
</template>
<script>
//import NewBot from "@/components/NewBot.vue";
export default {
  components: {
    //   NewBot,
  },
  data() {
    return {
      posts: [],
      page: 1,
      limit: 10,
    };
  },
  //   created() {
  //     this.getPosts();
  //   },
  methods: {
    // async getPosts() {
    //   const response = await fetch(
    //     `https://jsonplaceholder.typicode.com/posts?_page=${this.page}&_limit=${this.limit}`
    //   );
    //   const data = await response.json();
    //   this.posts = data;
    // },
  },
};
</script>
