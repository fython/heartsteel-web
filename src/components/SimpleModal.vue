<script setup lang="ts">
import { watch, onMounted, onUnmounted } from "vue";

const visible = defineModel<boolean>({ default: false });

const props = defineProps<{
  escToClose?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const close = () => {
  emit("update:modelValue", false);
};

const handleKeydown = (e: KeyboardEvent) => {
  if (props.escToClose && e.key === "Escape" && visible.value) {
    close();
  }
};

const handleBackdropClick = (e: MouseEvent) => {
  if ((e.target as HTMLElement).classList.contains("modal-backdrop")) {
    close();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});

watch(visible, (val) => {
  if (val) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="visible"
        class="modal-backdrop"
        @click="handleBackdropClick"
      >
        <div class="modal-content" role="dialog" aria-modal="true">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  max-width: calc(100vw - 32px);
  max-height: calc(100vh - 64px);
  border-radius: 0.25rem;
  background: white;
  color: #1a1a1a;
  text-transform: none;
  font-family: "Kanit", "Noto Sans SC", sans-serif;
  overflow-y: auto;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
