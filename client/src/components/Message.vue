<template>
  <transition name="msg-fade">
    <div class="message" :class="type" v-show="visible">
      <span :class="['icon','iconfont',showIcon()]"></span>
      <p class="content">{{ content }}</p>
      <!-- <span class="delete-icon" @click="onCancle">x</span> -->
    </div>
  </transition>
</template>

<script>
const Msg = {
  name: "message",
  data() {
    return {
      visible: false,
      type: "",
      content: "",
    };
  },
  install(Vue) {
    Vue.prototype.$msg = (config) => {
      //通过原型注册一个方法
      const MessageConstructor = Vue.extend(Msg); //生成一个Vue子类，子类就是这个组件
      const instance = new MessageConstructor({ data: config }); //生成该子类的实例
      instance.vm = instance.$mount(); //将该实例手动挂载
      document.body.appendChild(instance.vm.$el); //将实例挂载到body上
      instance.vm.visible = true;
    };
  },
  watch: {
    visible(v) {
      if (v) {
        setTimeout(() => {
          this.onClose();
        }, 1000);
      }
    },
  },
  methods: {
    onClose() {
      this.visible = false;
      this.$el.parentNode.removeChild(this.$el);
    },
    show() {
      this.visible = true;
    },
    // onCancle() {
    //   if (this.cancelBtn) {
    //     this.cancelBtn.apply(this.content);
    //   }
    //   this.onClose();
    // },
    showIcon() {
      switch(this.type){
        case("default"):
          return "icon-wenhao"
        case("success"):
          return "icon-chenggong1"
        case("error"):
          return "icon-shibai"
        case("warnning"):
          return "icon-jinggao"
      }
    }
  },
};
export default Msg;
</script>

<style scoped lang="less">
.message {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  min-width: 288px;
  height: 120px;
  // height: 32px;
  box-sizing: border-box;
  .icon {
    font-size: 18px;
    color: red;
    // display: inline-block;
    // width: 12px;
    // height: 12px;
    margin-left: 16px;
    // background: url(../assets/default.svg) no-repeat;
    // background-size: 12px 12px;
    vertical-align: middle;
  }
  &.success {
    background: #ebf8f2;
    border: 1px solid #a7e1c4;
    border-radius: 4px;
    .icon {
      font-size: 18px;
      color: green;
      // background: url(../assets/success.svg) no-repeat;
      // background-size: 12px 12px;
    }
  }
  &.warn {
    background: #fffaeb;
    border: 1px solid #fccca7;
    border-radius: 4px;
    .icon {
      font-size: 18px;
      color: blue;
      // background: url(../assets/remind.svg) no-repeat;
      // background-size: 12px 12px;
    }
  }
  &.error {
    background: #fef3eb;
    border: 1px solid #ffe9a7;
    border-radius: 4px;
    .icon {
      font-size: 18px;
      color: red;
      // background: url(../assets/error.svg) no-repeat;
      // background-size: 12px 12px;
    }
  }
  .content {
    display: inline-block;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.65);
    letter-spacing: 0;
    line-height: 30px;
    margin-left: 8px;
  }
  .delete-icon {
    display: block;
    width: 10px;
    height: 10px;
    position: absolute;
    top: 9px;
    right: 12px;
    font-size: 18px;
    line-height: 10px;
    cursor: pointer;
    color: #000;
    opacity: 0.43;
  }
}

.msg-fade-enter-active {
  animation: alert-fade-in 0.3s;
}

.msg-fade-leave-active {
  animation: alert-fade-out 0.3s;
}

@keyframes alert-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes alert-fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>