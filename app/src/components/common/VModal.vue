<template>
  <teleport to="body">
    <transition name="fade">
      <div class="vue-modal" v-show="open">
        <transition name="slide">
          <div class="vue-modal-inner">
            <div class="vue-modal-header">
              <v-icon icon="mdi-close" @click="$emit('close')"></v-icon>
            </div>
            <div class="vue-modal-content">
              <slot />
            </div>
            <div class="vue-modal-footer"></div>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/variables.scss";

*,
::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.vue-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.vue-modal-inner::before {
  content: "";
  position: absolute;
  width: 200px;
  height: 150px;
  top: -20px;
  left: -30px;
  background: $primary;
  z-index: -1;
  filter: blur(8rem);
  border-radius: 100%;
}

.vue-modal-inner::after {
  content: "";
  position: absolute;
  width: 150px;
  height: 200px;
  bottom: -20px;
  right: -30px;
  background: $light-secondary;
  filter: blur(4rem);
  z-index: -1;
  border-radius: 100%;
}

.vue-modal-inner {
  overflow: hidden;
  position: relative;
  max-width: 500px;
  margin: 6rem auto;
  background-color: #fff;
  @include border-3d;
  background-clip: padding-box;
  border-radius: 0.5rem;
  z-index: 999;
  padding: 1rem;
}

.vue-modal-header {
  border-bottom: 1px solid gainsboro;
  padding-bottom: 1rem;
  @include flex-end;
}

.vue-modal-content {
  position: relative;
  padding: 1rem 0;
}

.vue-modal-footer {
  border-top: 1px solid gainsboro;
  padding-top: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
