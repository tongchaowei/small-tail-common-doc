<script setup lang="ts">
import {StTimeline1, StTimelineItem1, St3DTiltContainer, St3DText} from "st-common-ui-vue3"
import {homeData} from "@/components/layout/home/data.ts"
import {ref} from "vue"
import {useRouter} from 'vitepress'

// 主页数据
const homeDataRef = ref(homeData)
// 路由
const router = useRouter()
</script>

<template>
  <div class="home-page">
    <div class="home-page__logo">
      <St3DTiltContainer full-page-listening>
        <St3DText
          content="Small Tail Common Doc"
          font-size="5rem"
          color="#fefefe"
          base-color="#59B6EC"
        />
      </St3DTiltContainer>
    </div>
    <StTimeline1 :timeline-data="homeDataRef.map(item => item.title)">
      <StTimelineItem1
        v-for="(item, idx) in homeDataRef"
        :key="idx"
        :idx="idx"
        :bgImgSrc="item.bgImgSrc"
        :title="item.title"
        :desc="item.desc"
      >
        <template v-slot:suffix="{isInitial, enterIdx, leaveIdx}">
          <div
            class="btn"
            :class="[
              isInitial? 'initial' : '',
              idx === leaveIdx ? 'leave' : '',
              idx === enterIdx? 'enter' : ''
            ]"
          >
            <button @click="router.go(item?.url)">
              <div class="svg-wrapper-1">
                <div class="svg-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path fill="currentColor"
                          d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                  </svg>
                </div>
              </div>
              <span>开始使用</span>
            </button>
          </div>
        </template>
      </StTimelineItem1>
    </StTimeline1>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  position: relative;

  .home-page__logo {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    max-width: 600px;
    padding: 2rem;
  }
}

@keyframes leave {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

@keyframes enter {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.leave {
  animation: leave 0.5s ease-in-out forwards;
}

.enter {
  animation: enter 0.5s ease-in-out forwards;
  animation-delay: 2s;
}

.btn {
  transform: translateX(100%);
  padding: 0 2rem 1rem;
}

.initial {
  transform: translateX(0);
  animation-duration: 0s;
}

/* From Uiverse.io by eirikvold */
button {
  font-family: inherit;
  font-size: 18px;
  background: linear-gradient(to bottom, #4dc7d9 0%, #66a6ff 100%);
  color: white;
  padding: 0.8em 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 99999px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
}

button:hover {
  transform: translateY(-3px);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
}

button:active {
  transform: scale(0.95);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

button span {
  display: block;
  margin-left: 0.4em;
  transition: all 0.3s;
}

button svg {
  width: 18px;
  height: 18px;
  fill: white;
  transition: all 0.3s;
}

button .svg-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  margin-right: 0.5em;
  transition: all 0.3s;
}

button:hover .svg-wrapper {
  background-color: rgba(255, 255, 255, 0.5);
}

button:hover svg {
  transform: rotate(45deg);
}
</style>
