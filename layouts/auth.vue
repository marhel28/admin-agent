<template>
  <div class="auth-layout">
    <slot />
  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100dvh;
  background: transparent;
  /* Let each auth page control its own background */
}
</style>
