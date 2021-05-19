<template>
  <div id="box post-list">
    <div class="card mb-3" v-for="item in posts" :key="item._id">
      <div class="card-body">
        <div class="title-margin">
          <h4 class="card-title fw-bold"><router-link :to="`/posts/${item._id}/`">{{item.title}}</router-link></h4>
          <p class="card-text">
            <small class="text-muted fw-bold">{{ item.createdAt }}</small>
          </p>
        </div>
        <div class="container">
          <div class="row">
            <div v-if="item.image && typeof item.image !== 'string'"  class="col-4">
              <img :src="item.image.fitUrl" :alt="item.title" class="rounded-lg w-100" />
            </div>
            <p class="card-text article text-muted" :class="item.image ? 'col-8' : ''">
              {{ item.excerpt }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { PostProps, ImageProps } from '../store'
import { generateFitUrl } from '../helper'
type PostType = PostProps[]
export default defineComponent({
  name: 'Detail',
  props: {
    postData: {
      type: Array as PropType<PostType>,
      required: true
    }
  },
  setup (props) {
    const posts = computed(() => {
      return props.postData.map((post) => {
        generateFitUrl(post.image as ImageProps, 200, 110, ['m_fill'])
        return post
      })
    })
    return {
      posts
    }
  }
})
</script>

<style scoped>
#box {
  margin-top: 4rem;
}
.card {
  width: 55%;
  margin: 0 auto;
  border: 3px solid rgba(0, 0, 0, 0.125);
  border-radius: 1px;
}
.card-title,
.card-text {
  text-align: start;
}
.card-title {
  margin-bottom: 0;
}
.title-margin {
  margin-left: 0.5rem;
}
.article {
  height: 6.6rem;
  font-size: 1.1rem;
  font-weight: 500;
  overflow: hidden;
}
.post-list h4 a {
  text-decoration: none;
  color:#1a1a1a;
}
.post-list h4 a:hover {
  color:#0d6efd;
}
</style>
